import type { Dispatch, SetStateAction } from 'react';

import type { Chat } from './ChatManager';

export interface Step {
  key: string;
  text: string;
}

export const solutionStepsRef: { current: Step[] } = { current: [] };

// 서버 데이터 → Step 배열로 변환
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

  return steps;
};

// 단일 단계 출력
export const showStep = (
  index: number,
  setChatList: Dispatch<SetStateAction<Chat[]>>,
) => {
  const steps = solutionStepsRef.current;
  if (index < 0 || index >= steps.length) {
    return;
  }

  const buttons =
    index < steps.length - 1
      ? [
          {
            label: '다음 풀이',
            onClick: () => showStep(index + 1, setChatList),
          },
        ]
      : [];

  setChatList((prev) => [
    ...prev,
    { from: 'server', text: steps[index].text, buttons },
  ]);
};

// next_step부터 시작
export const showStepsFromNext = (
  nextStepKey: string,
  setChatList: Dispatch<SetStateAction<Chat[]>>,
) => {
  const steps = solutionStepsRef.current;
  if (!steps.length) {
    return;
  }

  const stepIndex = steps.findIndex(
    (s) =>
      s.key.replace(/\s/g, '').toLowerCase() ===
      nextStepKey.replace(/\s/g, '').toLowerCase(),
  );

  const startIndex = stepIndex >= 0 ? stepIndex : 0;

  // startIndex 단계만 보여주고 다음 버튼으로 이어짐
  showStep(startIndex, setChatList);
};
