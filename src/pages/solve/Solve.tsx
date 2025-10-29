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

  // 순차 업로드를 위한 상태 복구
  const [presignedUploadUrls, setPresignedUploadUrls] = useState<string[]>([]);
  const [presignedDownloadUrls, setPresignedDownloadUrls] = useState<string[]>(
    [],
  );
  const [currentUploadStep, setCurrentUploadStep] = useState<0 | 1 | 2>(0); // 0:초기, 1:문제완료/풀이대기, 2:최종완료

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
          text: '질문을 시작하려면 카메라 버튼을 눌러 이미지를 업로드해 주세요!',
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
    // 1. 파일 선택 직후, 모달 상태를 닫음 (브라우저 동작 실패 대비 강제)
    setIsOpen(false);

    const files = e.target.files;

    // 2. 파일 개수 검증 (순차 모드이므로 항상 1개만 받아야 함)
    if (!files || files.length !== 1) {
      const stepName =
        expectedCount === 1 || currentUploadStep === 0
          ? '문제 이미지'
          : '풀이 이미지';
      addServerMessage(`${stepName} 1장만 선택해주세요.`);
      e.target.value = '';
      return;
    }

    const file = files[0];
    let downloadUrlToUse: string;
    let uploadUrlToUse: string;
    let receivedS3Key: string | undefined;
    let finalDownloadUrls: string[] = [];

    // 3. 'me' 로딩 UI 시작
    setUploadingSlots([0]);
    setIsUploading(true);

    try {
      if (expectedCount === 2) {
        // 2장 모드 (미리 받아둔 URL 사용)
        const stepIndex = currentUploadStep === 0 ? 0 : 1;

        if (
          presignedUploadUrls.length < 2 ||
          presignedDownloadUrls.length < 2
        ) {
          throw new Error(
            'Presigned URLs not initialized correctly for 2 images.',
          );
        }

        uploadUrlToUse = presignedUploadUrls[stepIndex];
        downloadUrlToUse = presignedDownloadUrls[stepIndex];
      } else {
        // 1장 모드: Presigned URL을 지금 요청 (기존 로직 유지)
        const res = await getPresignedUrl(1);
        uploadUrlToUse = res.uploadUrls[0];
        downloadUrlToUse = res.downloadUrls[0];
        receivedS3Key = res.s3Key;
      }

      // S3 업로드
      await uploadToPresignedUrl(uploadUrlToUse, file);

      // 4. S3 업로드 완료 후, 프리로딩 시작
      await preloadImages([downloadUrlToUse]);

      // 5. 프리로딩 완료 후, 로딩 제거하고 이미지 추가
      setUploadingSlots([]);
      setIsUploading(false);
      handleImageSelect(downloadUrlToUse);

      // 후속 처리 로직 (핵심 분기)
      if (expectedCount === 2) {
        // --- 2장 모드 처리 ---
        if (currentUploadStep === 0) {
          // 1단계(문제) 완료: 2단계 업로드를 위해 다음 파일 선택 창 자동 호출
          finalDownloadUrls = [downloadUrlToUse];
          setDownloadUrls(finalDownloadUrls); // 문제 이미지 URL만 임시 저장
          setCurrentUploadStep(1); // 2단계(풀이) 대기 상태

          // 쉼없이 다음 단계 파일 선택 창 자동 호출
          setTimeout(() => {
            // setTimeout이 User Activation 오류의 원인이지만, UX를 위해 일단 유지
            if (fileInputRef.current) {
              fileInputRef.current.multiple = false;
              fileInputRef.current.click();
            }
          }, 300);
        } else if (currentUploadStep === 1) {
          // 2단계(풀이) 완료: 최종 URL 결합 및 완료
          finalDownloadUrls = [...downloadUrls, downloadUrlToUse]; // 문제 + 풀이 URL 결합
          setDownloadUrls(finalDownloadUrls); // 최종 URL 저장
          setImageUploaded(true);
          setCurrentUploadStep(2);
        }
      } else {
        // --- 1장 모드 처리 (expectedCount === 1) ---
        finalDownloadUrls = [downloadUrlToUse];
        setDownloadUrls(finalDownloadUrls);
        setS3Key(receivedS3Key!);
        setImageUploaded(true);
        setCurrentUploadStep(2);
      }
    } catch {
      addServerMessage(
        '이미지 업로드 중 오류가 발생했습니다. 다시 시도해주세요.',
      );
      setUploadingSlots([]);
      setIsUploading(false);
      // 실패 시 단계 초기화
      if (expectedCount === 1 || currentUploadStep === 0) {
        setCurrentUploadStep(0);
      } else {
        setCurrentUploadStep(1);
      }
    } finally {
      e.target.value = '';
    }
  };

  // 모달에서 옵션 선택 시 input 트리거
  const handleModalSelect = async (option: 'one' | 'two') => {
    // async 유지

    // 무조건 모든 상태 초기화
    setChatList([]);
    solutionStepsRef.current = [];
    setImageUploaded(false);
    setS3Key('');
    setDownloadUrls([]);
    setPresignedUploadUrls([]);
    setPresignedDownloadUrls([]);
    setCurrentUploadStep(0); // 단계 상태도 초기화

    setToggleItems([
      '단계별 풀이를 알려줘',
      '전체 풀이를 알려줘',
      '해결했어요!',
    ]);

    const count = option === 'one' ? 1 : 2;
    setExpectedCount(count);

    if (count === 2) {
      // 2장 모드: S3 URL 2개와 Key를 미리 요청하여 저장
      try {
        const {
          uploadUrls,
          downloadUrls,
          s3Key: receivedS3Key,
        } = await getPresignedUrl(2);
        setPresignedUploadUrls(uploadUrls);
        setPresignedDownloadUrls(downloadUrls);
        setS3Key(receivedS3Key);
      } catch {
        setIsOpen(false);
        addServerMessage('URL 발급 중 오류가 발생했습니다. 다시 시도해주세요.');
        return;
      }
    }

    // input 설정 후 클릭 트리거
    if (fileInputRef.current) {
      fileInputRef.current.multiple = false; // 항상 1개씩만 선택하게 함
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
