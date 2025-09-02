import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { routePath } from '@routes/routePath';
import { uploadToPresignedUrl } from '@apis/upload';

import * as styles from './solve.css';
import ChatManager, { type Chat } from './ChatManager';
import Toggle from './components/toggle/Toggle';
import Modal from './components/modal/Modal';
import { getPresignedUrl } from './apis/axios';
import { usePostAiChat } from './apis/queries';
import {
  processSolutionData,
  showStepsFromNext,
  solutionStepsRef,
} from './ChatLogic';

// 타입 정의
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
  const [isLoading, setIsLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { mutateAsync: requestSolutionMutate } = usePostAiChat();

  // 채팅 스크롤 항상 맨 아래로
  useEffect(() => {
    requestAnimationFrame(() =>
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' }),
    );
  }, [chatList, isLoading]);

  // 공용 헬퍼
  const addChat = (chat: Chat) => setChatList((prev) => [...prev, chat]);

  const addServerMessage = (text: string) => addChat({ from: 'server', text });

  const handleImageSelect = (url: string) =>
    addChat({ from: 'me', imageUrl: url });

  // 분기 처리 로직
  const handleSolved = () => {
    addChat({
      from: 'server',
      text: '🎉 문제 해결을 축하합니다!',
      buttons: [
        { label: '메인', onClick: () => navigate(routePath.HOME) },
        { label: '마이페이지', onClick: () => navigate(routePath.MY) },
      ],
    });
  };

  const handleFullSolution = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);

    try {
      if (!solutionStepsRef.current.length) {
        const solutionData: AIResponse = await requestSolutionMutate({
          downloadUrls,
          s3Key,
        });
        solutionStepsRef.current = processSolutionData(solutionData);
      }

      addChat({
        from: 'server',
        text: solutionStepsRef.current.map((s) => s.text).join('\n\n'),
      });
    } catch {
      addServerMessage(
        '풀이 요청 중 오류가 발생했습니다.\n잠시 후 다시 시도해 주세요.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleStepByStep = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);

    try {
      let nextStepKey = 'step 1';

      if (!solutionStepsRef.current.length) {
        const solutionData: AIResponse = await requestSolutionMutate({
          downloadUrls,
          s3Key,
        });

        solutionStepsRef.current = processSolutionData(solutionData);

        // next_step 가져오기
        const nextStepObj = solutionData.find(
          (item): item is NextStepItem => 'next_step' in item,
        );
        nextStepKey = nextStepObj?.next_step || 'step 1';
      }

      showStepsFromNext(nextStepKey, setChatList);
    } catch {
      addServerMessage(
        '풀이 요청 중 오류가 발생했습니다.\n잠시 후 다시 시도해 주세요.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  // 토글 선택
  const handleTextSelect = (text: string) => {
    addChat({ from: 'me', text });

    if (
      text !== '해결했어요!' &&
      (!imageUploaded || !s3Key || !downloadUrls.length)
    ) {
      return addServerMessage('문제 이미지를 업로드 해주세요!');
    }

    switch (text) {
      case '해결했어요!':
        return handleSolved();
      case '전체 풀이를 알려줘':
        return handleFullSolution();
      case '단계별 풀이를 알려줘':
        return handleStepByStep();
      default:
        return addServerMessage('요청을 이해하지 못했습니다.');
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
            ? '이미지 2장을 선택해주세요.'
            : '이미지 1장을 선택해주세요.',
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

        {isLoading && (
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
        onTextSelect={handleTextSelect}
        onCameraClick={() => setIsOpen(true)}
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
