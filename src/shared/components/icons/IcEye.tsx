import type { SVGProps } from 'react';
const SvgIcEye = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 18"
    {...props}
  >
    <path
      stroke="#CCD2D8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M1 9s4-8 11-8 11 8 11 8-4 8-11 8S1 9 1 9"
      clipRule="evenodd"
    />
    <path
      stroke="#CCD2D8"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6"
    />
  </svg>
);
export default SvgIcEye;
