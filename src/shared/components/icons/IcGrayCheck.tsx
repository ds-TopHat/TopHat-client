import type { SVGProps } from 'react';
const SvgIcGrayCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <rect width={23} height={23} x={0.5} y={0.5} fill="#E7EBEF" rx={11.5} />
    <rect width={23} height={23} x={0.5} y={0.5} stroke="#E7EBEF" rx={11.5} />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m8.067 12.234 2.84 2.84L17.078 8.9"
    />
  </svg>
);
export default SvgIcGrayCheck;
