import { motion, useScroll, useTransform } from 'framer-motion';
import {
  IcMainGroup,
  IcMainChat1,
  IcMainChat2,
  IcMainChat3,
} from '@components/icons';
import * as styles from '@pages/home/components/sectionTop/sectionTop.css';

const START_SCROLL = 640;
const GAP = 150;
const EXIT_OFFSET = 400;
const END_SCROLL = START_SCROLL + GAP * 3 + EXIT_OFFSET;

const SectionTop = () => {
  const { scrollY } = useScroll();

  // wrapper 하나만 translateY
  const wrapperTranslateY = useTransform(
    scrollY,
    [START_SCROLL, START_SCROLL + 100, END_SCROLL, END_SCROLL + 300],
    [0, -100, -100, -150],
  );

  // Group opacity
  const groupOpacity = useTransform(
    scrollY,
    [START_SCROLL, START_SCROLL + 100, END_SCROLL + 100, END_SCROLL + 400],
    [1, 0, 0, 0],
  );

  // Chat opacity
  const chat1Opacity = useTransform(
    scrollY,
    [
      START_SCROLL + 100,
      START_SCROLL + GAP + 50,
      END_SCROLL + 100,
      END_SCROLL + 400,
    ],
    [0, 1, 1, 0],
  );

  const chat2Opacity = useTransform(
    scrollY,
    [
      START_SCROLL + GAP + 50,
      START_SCROLL + GAP * 2 + 50,
      END_SCROLL + 100,
      END_SCROLL + 400,
    ],
    [0, 1, 1, 0],
  );

  const chat3Opacity = useTransform(
    scrollY,
    [
      START_SCROLL + GAP * 2 + 50,
      START_SCROLL + GAP * 3 + 50,
      END_SCROLL + 100,
      END_SCROLL + 400,
    ],
    [0, 1, 1, 0],
  );

  return (
    <div className={styles.sectionTopWrapper}>
      <motion.div
        style={{
          y: wrapperTranslateY,
          position: 'fixed',
          top: '24rem',
          width: '100%',
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      >
        {/* Group */}
        <motion.div
          style={{
            opacity: groupOpacity,
            maxWidth: 1180,
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'flex-end',
            paddingRight: '3.6rem',
          }}
        >
          <IcMainGroup
            style={{
              willChange: 'opacity',
              width: 'clamp(425.5px, 60vw, 600px)',
              height: 'auto',
            }}
          />
        </motion.div>

        {/* Chat 1 */}
        <motion.div
          style={{
            opacity: chat1Opacity,
            position: 'absolute',
            top: '18rem',
            paddingLeft: '3rem',
            width: '100%',
          }}
        >
          <IcMainChat1
            width={168}
            height={68}
            style={{
              willChange: 'opacity',
            }}
          />
        </motion.div>

        {/* Chat 2 */}
        <motion.div
          style={{
            opacity: chat2Opacity,
            position: 'absolute',
            top: `calc(18rem + 1.8rem + 6rem)`,
            paddingLeft: '3rem',
            width: '100%',
          }}
        >
          <IcMainChat2
            width={168}
            height={164}
            style={{ willChange: 'opacity' }}
          />
        </motion.div>

        {/* Chat 3 */}
        <motion.div
          style={{
            opacity: chat3Opacity,
            position: 'absolute',
            top: `calc(18rem + 3.6rem + 21.8rem)`,
            paddingLeft: '3rem',
            width: '100%',
          }}
        >
          <IcMainChat3
            width={223}
            height={144}
            style={{ willChange: 'opacity' }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SectionTop;
