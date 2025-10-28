import { IcMainPaperLeft, IcMainPaperRight } from '@components/icons';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { routePath } from '@routes/routePath';

import * as styles from './sectionBottom.css';

const SectionBottom = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const navigate = useNavigate();

  const handleClick = () => navigate(routePath.SOLVE);

  const [offsetTop, setOffsetTop] = useState(0);
  useLayoutEffect(() => {
    if (wrapperRef.current) {
      setOffsetTop(wrapperRef.current.offsetTop);
    }
  }, []);

  const FADE_IN_START = offsetTop - window.innerHeight / 2;
  const FADE_IN_GAP = 150;
  const FADE_OUT_GAP = 150;

  const opacityIn = useTransform(
    scrollY,
    [FADE_IN_START, FADE_IN_START + FADE_IN_GAP],
    [0, 1],
  );

  const translateYIn = useTransform(
    scrollY,
    [FADE_IN_START, FADE_IN_START + FADE_IN_GAP],
    [-100, -150],
  );

  const opacityOut = useTransform(
    scrollY,
    [FADE_IN_START - FADE_OUT_GAP, FADE_IN_START],
    [0, 1],
  );

  const combinedOpacity = useTransform([opacityIn, opacityOut], (values) => {
    const [a, b] = values as [number, number];
    return a * b;
  });

  return (
    <div ref={wrapperRef} className={styles.sectionBottomWrapper}>
      <motion.div
        style={{
          y: translateYIn,
          opacity: combinedOpacity,
          willChange: 'opacity',
        }}
        className={styles.sectionContent}
      >
        <div className={styles.iconWrapper}>
          <IcMainPaperLeft className={styles.iconFull} />
          <IcMainPaperRight className={styles.iconFull} />
        </div>

        <div className={styles.blueBackground}>
          <button className={styles.mainButton} onClick={handleClick}>
            질문 하러가기
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default SectionBottom;
