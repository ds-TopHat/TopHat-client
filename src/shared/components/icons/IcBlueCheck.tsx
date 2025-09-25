import type { SVGProps } from 'react';
const SvgIcBlueCheck = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <rect width={24} height={24} fill="#488BFF" rx={12} />
    <path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m8.067 12.234 2.84 2.84L17.078 8.9"
    />
  </svg>
);
export default SvgIcBlueCheck;
