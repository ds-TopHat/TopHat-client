import type { Dispatch, SetStateAction } from 'react';

import type { Chat } from './ChatManager';

export interface Step {
  key: string;
  text: string;
}

// 단계 배열 + 현재 진행 인덱스 저장
export const solutionStepsRef: { current: Step[]; index: number } = {
  current: [],
  index: 0,
};

// 서버 데이터를 Step 배열로 변환
export const processSolutionData = (data: Record<string, string>[]) => {
  const stepEntries = data
    .flatMap((item) => Object.entries(item))
    .filter(([k]) => k.startsWith('step')) as [string, string][];

  stepEntries.sort((a, b) => {
    const num = (k: string) => parseInt(k.replace(/\D/g, ''), 10) || 0;
    return num(a[0]) - num(b[0]);
  });

  const steps: Step[] = stepEntries.map(([k, v]) => ({ key: k, text: v }));

  const answer = data
    .flatMap((item) => Object.entries(item))
    .find(([k]) => k === 'answer')?.[1];

  if (answer) {
    steps.push({ key: 'answer', text: `답: ${answer}` });
  }

  // 새 데이터 들어오면 인덱스 초기화
  solutionStepsRef.index = 0;
  return steps;
};

// 다음 단계만 출력
export const showNextStep = (
  setChatList: Dispatch<SetStateAction<Chat[]>>,
): boolean => {
  const steps = solutionStepsRef.current;
  const idx = solutionStepsRef.index;

  if (!steps.length || idx >= steps.length) {
    return true;
  }

  setChatList((prev) => [...prev, { from: 'server', text: steps[idx].text }]);
  solutionStepsRef.index += 1;

  // 마지막 단계 도달 시 true
  return solutionStepsRef.index >= steps.length;
};
