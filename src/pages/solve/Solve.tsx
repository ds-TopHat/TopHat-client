import { useState, useRef, useEffect } from 'react';
import { uploadToPresignedUrl } from '@apis/upload';

import * as styles from './solve.css';
import ChatManager, { type Chat } from './ChatManager';
import Toggle from './components/toggle/Toggle';
import Modal from './components/modal/Modal';
import { getPresignedUrl } from './apis/axios';
import { usePostAiChat } from './apis/queries';
import {
  processSolutionData,
  showNextStep,
  solutionStepsRef,
} from './ChatLogic';

// 타입
type StepItem = Record<`step ${number}`, string>;
type AnswerItem = { answer: string };
type NextStepItem = { next_step: string };
export type AIResponse = Array<StepItem | AnswerItem | NextStepItem>;

const Solve = () => {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [downloadUrls, setDownloadUrls] = useState<string[]>([]);
  const [s3Key, setS3Key] = useState('');
  const [isPending, setIsPending] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const { mutateAsync: requestSolutionMutate } = usePostAiChat();

  // 채팅 스크롤 항상 맨 아래로
  useEffect(() => {
    requestAnimationFrame(() =>
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' }),
    );
  }, [chatList, isPending]);

  const addChat = (chat: Chat) => setChatList((prev) => [...prev, chat]);
  const addServerMessage = (text: string) => addChat({ from: 'server', text });
  const handleImageSelect = (url: string) =>
    addChat({ from: 'me', imageUrl: url });

  // 토글 상태
  const [toggleItems, setToggleItems] = useState([
    '단계별 풀이를 알려줘',
    '전체 풀이를 알려줘',
    '해결했어요!',
  ]);

  // 토글 클릭 핸들러
  // 토글 클릭 핸들러
  const handleTextSelect = (text: string) => {
    addChat({ from: 'me', text });

    if (
      text !== '해결했어요!' &&
      (!imageUploaded || !s3Key || !downloadUrls.length)
    ) {
      return addServerMessage('문제 이미지를 먼저 업로드 해주세요!');
    }

    switch (text) {
      case '단계별 풀이를 알려줘':
        fetchSolutionThenStepByStep();
        setToggleItems([
          '다음 풀이를 알려줘',
          '전체 풀이를 알려줘',
          '해결했어요!',
        ]);
        return;
      case '다음 풀이를 알려줘':
        handleStepByStep();
        return;
      case '전체 풀이를 알려줘':
        handleFullSolution();
        return;
      case '해결했어요!':
        handleSolved();
        return;
    }
  };

  // API 호출 후 첫 단계 보여주기
  const fetchSolutionThenStepByStep = async () => {
    if (isPending) {
      return;
    }
    setIsPending(true);

    try {
      const solutionData: AIResponse = await requestSolutionMutate({
        downloadUrls,
        s3Key,
      });
      solutionStepsRef.current = processSolutionData(solutionData);

      // 첫 단계 보여주기
      showNextStep(setChatList);
    } catch {
      addServerMessage(
        '풀이 요청 중 오류가 발생했습니다.\n잠시 후 다시 시도해 주세요.',
      );
      // 토글 초기화
      setToggleItems([
        '단계별 풀이를 알려줘',
        '전체 풀이를 알려줘',
        '해결했어요!',
      ]);
    } finally {
      setIsPending(false);
    }
  };

  // 다음 단계 보여주기 (API 호출 없이)
  const handleStepByStep = () => {
    const finished = showNextStep(setChatList);

    if (finished) {
      addChat({ from: 'server', text: '풀이를 모두 확인했습니다!' });
      setTimeout(() => {
        addChat({
          from: 'server',
          text: '새로운 문제를 질문하려면 카메라를 눌러주세요.',
        });
      }, 1000);

      // 마지막 단계 후 토글 초기화
      setToggleItems([
        '단계별 풀이를 알려줘',
        '전체 풀이를 알려줘',
        '해결했어요!',
      ]);
    }
  };
  const handleSolved = () => {
    addChat({ from: 'server', text: '문제 해결을 축하합니다!' });
    setTimeout(() => {
      addChat({
        from: 'server',
        text: '새로운 문제를 질문하려면 카메라를 눌러주세요.',
      });
    }, 1000);
  };

  // 전체 풀이
  const handleFullSolution = async () => {
    if (isPending) {
      return;
    }
    setIsPending(true);

    try {
      const solutionData: AIResponse = await requestSolutionMutate({
        downloadUrls,
        s3Key,
      });
      solutionStepsRef.current = processSolutionData(solutionData);

      addChat({
        from: 'server',
        text: solutionStepsRef.current.map((s) => s.text).join('\n\n'),
      });

      // 토글 그대로 유지
      setToggleItems([
        '단계별 풀이를 알려줘',
        '전체 풀이를 알려줘',
        '해결했어요!',
      ]);
    } catch {
      addServerMessage(
        '풀이 요청 중 오류가 발생했습니다.\n잠시 후 다시 시도해 주세요.',
      );
    } finally {
      setIsPending(false);
    }
  };

  // 카메라 모달 선택
  const handleModalSelect = async (option: 'one' | 'two') => {
    setIsOpen(false);
    setChatList([]);
    solutionStepsRef.current = [];
    setImageUploaded(false);
    setS3Key('');
    setDownloadUrls([]);
    setToggleItems([
      '단계별 풀이를 알려줘',
      '전체 풀이를 알려줘',
      '해결했어요!',
    ]);

    const count = option === 'one' ? 1 : 2;
    try {
      const {
        uploadUrls,
        downloadUrls: presignedUrls,
        s3Key: presignedKey,
      } = await getPresignedUrl(count);

      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.setAttribute('capture', 'environment');
      input.multiple = count > 1;

      const files = await new Promise<FileList | null>((resolve) => {
        input.onchange = () => resolve(input.files);
        input.click();
      });

      if (!files || files.length < count) {
        return addServerMessage(
          count > 1
            ? '문제 이미지 1장, 풀이 이미지 1장을 선택해주세요.'
            : '문제 이미지 1장을 선택해주세요.',
        );
      }

      for (let i = 0; i < count; i++) {
        const response: Response = await uploadToPresignedUrl(
          uploadUrls[i],
          files[i]!,
        );
        if (!response.ok) {
          throw new Error('S3 업로드 실패');
        }
        handleImageSelect(presignedUrls[i]);
      }

      setS3Key(presignedKey);
      setDownloadUrls(presignedUrls);
      setImageUploaded(true);
    } catch {
      addServerMessage(
        '이미지 업로드 중 오류가 발생했습니다. 다시 시도해 주세요.',
      );
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.chatContainer}>
        {chatList.map((chat, idx) => (
          <ChatManager key={idx} chat={chat} />
        ))}

        {isPending && (
          <div className={styles.chatBubbleLeft}>
            <div className={styles.chatServerText}>
              <div className={styles.dots}>
                <span className={styles.dot} />
                <span className={styles.dot} />
                <span className={styles.dot} />
              </div>
            </div>
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      <Toggle
        items={toggleItems}
        onTextSelect={handleTextSelect}
        onCameraClick={() => setIsOpen(true)}
        disabled={isPending}
      />
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelect={handleModalSelect}
      />
    </div>
  );
};

export default Solve;
