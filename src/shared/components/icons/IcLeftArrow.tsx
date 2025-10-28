import type { SVGProps } from 'react';
const SvgIcLeftArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 9 16"
    {...props}
  >
    <path
      stroke="#488BFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 1 1 8l7 7"
    />
  </svg>
);
export default SvgIcLeftArrow;
