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

const preloadImages = (urls: string[]): Promise<void> => {
  const promises = urls.map((url) => {
    return new Promise<void>((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve();
      img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
    });
  });

  return Promise.all(promises).then(() => undefined);
};

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
  const [isUploading, setIsUploading] = useState(false);
  const [uploadingSlots, setUploadingSlots] = useState<number[]>([]);

  const bottomRef = useRef<HTMLDivElement>(null);
  const { mutateAsync: requestSolutionMutate } = usePostAiChat();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [expectedCount, setExpectedCount] = useState<1 | 2>(1);

  // 채팅 스크롤 항상 맨 아래로
  useEffect(() => {
    requestAnimationFrame(() =>
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' }),
    );
  }, [chatList, isPending, isUploading]);

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
  const handleTextSelect = (text: string) => {
    if (isPending || isUploading) {
      return;
    }
    addChat({ from: 'me', text });

    if (
      text !== '해결했어요!' &&
      (!imageUploaded || !s3Key || !downloadUrls.length)
    ) {
      return setTimeout(() => {
        addChat({
          from: 'server',
          text: '문제 이미지를 먼저 업로드 해주세요!',
        });
      }, 300);
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
    // 단계 진행 중 잠시 pending 상태
    setIsPending(true);

    const timeoutId = setTimeout(() => {
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

      // pending 종료
      setIsPending(false);
    }, 500);
    return () => clearTimeout(timeoutId);
  };

  const handleSolved = () => {
    setTimeout(() => {
      addChat({
        from: 'server',
        text: '문제 해결을 축하합니다!',
      });
    }, 300);
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

      setTimeout(() => {
        addChat({
          from: 'server',
          text: '새로운 문제를 질문하려면 카메라를 눌러주세요.',
        });
      }, 1000);

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

  // 파일 선택 핸들러
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // 1. 파일 선택 즉시 모달 닫기
    setIsOpen(false);

    const files = e.target.files;

    // 2. 파일 개수 검증 로직 수정
    // 필요한 개수와 다르다면 에러 메시지 표시
    if (!files || files.length !== expectedCount) {
      addServerMessage(
        expectedCount === 1
          ? '정확한 풀이를 위해 문제 이미지 1장을 선택해주세요.'
          : '정확한 풀이를 위해 문제 이미지 1장, 풀이 이미지 1장을 선택해주세요.',
      );
      e.target.value = '';
      return;
    }

    // 3. 'me' 로딩 UI 시작 및 초기화
    setUploadingSlots(Array.from({ length: expectedCount }, (_, i) => i));
    setIsUploading(true);
    const uploadedUrls: string[] = [];

    try {
      const {
        uploadUrls,
        downloadUrls: presignedUrls,
        s3Key: presignedKey,
      } = await getPresignedUrl(expectedCount);

      const filesArray = Array.from(files);

      // S3 업로드 루프: filesArray의 순서를 그대로 사용
      // filesArray의 순서가 곧 사용자가 선택한 순서
      for (let i = 0; i < expectedCount; i++) {
        const response = await uploadToPresignedUrl(
          uploadUrls[i],
          filesArray[i]!,
        );
        if (!response.ok) {
          throw new Error('S3 업로드 실패');
        }
        uploadedUrls.push(presignedUrls[i]);
      }

      // 4. S3 업로드 완료 후, 로딩을 끄지 않고 프리로딩 시작
      await preloadImages(uploadedUrls);

      // 5. 프리로딩 완료 후, 로딩 제거하고 동시에 이미지 추가
      setUploadingSlots([]);
      setIsUploading(false);

      uploadedUrls.forEach((url) => {
        handleImageSelect(url);
      });

      setS3Key(presignedKey);
      setDownloadUrls(presignedUrls);
      setImageUploaded(true);
    } catch {
      // 6. 실패 시
      addServerMessage(
        '이미지 업로드 중 오류가 발생했습니다. 다시 시도해 주세요.',
      );
      // 실패해도 로딩 상태는 초기화
      setUploadingSlots([]);
      setIsUploading(false);
    } finally {
      // 7. 모든 작업이 끝나면 input 초기화
      e.target.value = '';
    }
  };

  // 모달에서 옵션 선택 시 input 트리거
  const handleModalSelect = (option: 'one' | 'two') => {
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
    setExpectedCount(count);

    // input 설정 후 클릭 트리거
    if (fileInputRef.current) {
      fileInputRef.current.multiple = count > 1;
      fileInputRef.current.click();
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

        {isUploading &&
          uploadingSlots.map((_, index) => (
            <div key={index} className={styles.chatBubbleRight}>
              <div className={styles.chatMyText}>
                <div className={styles.dots}>
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                  <span className={styles.dot} />
                </div>
              </div>
            </div>
          ))}

        <div ref={bottomRef} />
      </div>

      <Toggle
        items={toggleItems}
        onTextSelect={handleTextSelect}
        onCameraClick={() => setIsOpen(true)}
        disabled={isPending || isUploading}
      />
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSelect={handleModalSelect}
      />
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default Solve;
