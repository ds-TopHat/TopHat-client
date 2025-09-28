import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import * as styles from '@pages/home/components/scrollText/scrollText.css';

const ScrollText = () => {
  const { scrollY } = useScroll();
  const BREAKPOINT = 2480;

  const positionY = useTransform(scrollY, (y) =>
    y < BREAKPOINT ? 'fixed' : 'absolute',
  );
  const topY = useTransform(scrollY, (y) =>
    y < BREAKPOINT ? '0' : `${BREAKPOINT}px`,
  );

  const opacityLine2 = useTransform(scrollY, [0, 1200], [0.3, 1]);

  const opacityLine3 = useTransform(scrollY, [0, 0], [0.3, 0.3]);

  const gradientOpacity = useTransform(scrollY, [2000, 2200], [0, 1]);
  const inverseGradientOpacity = useTransform(gradientOpacity, (v) => 1 - v);

  const combinedOpacityLine2 = useTransform(
    [opacityLine2, inverseGradientOpacity] as MotionValue<number>[],
    ([o1, o2]) => (o1 as number) * (o2 as number),
  );

  const combinedOpacityLine3 = useTransform(
    [opacityLine3, inverseGradientOpacity] as MotionValue<number>[],
    ([o1, o2]) => (o1 as number) * (o2 as number),
  );

  const renderLine = (text: string, baseOpacity: MotionValue<number>) => (
    <div className={styles.lineWrapper}>
      <motion.p className={styles.line} style={{ opacity: baseOpacity }}>
        {text}
      </motion.p>
      <motion.p
        className={`${styles.line} ${styles.gradient} ${styles.gradientOverlay}`}
        style={{ opacity: gradientOpacity }}
      >
        {text}
      </motion.p>
    </div>
  );
  return (
    <motion.div
      className={styles.wrapper}
      style={{
        position: positionY as unknown as 'fixed' | 'absolute',
        top: topY,
      }}
    >
      {renderLine('수학문제풀이를', inverseGradientOpacity)}
      {renderLine('단계별로 도와주는', combinedOpacityLine2)}
      {renderLine('MAPI', combinedOpacityLine3)}
    </motion.div>
  );
};

export default ScrollText;
