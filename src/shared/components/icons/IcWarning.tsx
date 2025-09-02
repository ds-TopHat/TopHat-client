import type { SVGProps } from 'react';
const SvgIcWarning = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 72 72"
    {...props}
  >
    <g fill="#488BFF" clipPath="url(#ic_warning_svg__a)">
      <path d="M44.654 14.957c-3.851-6.653-13.457-6.654-17.308-.001L13.945 37.883c-.557.953-.165 2.166.81 2.682 1.122.594 2.338.084 2.974-1.015l13.079-22.59c2.31-3.991 8.073-3.991 10.384 0l19.125 33.034c2.316 4-.571 9.006-5.193 9.006H16.876c-4.622 0-7.509-5.006-5.194-9.006l1.6-2.761a2 2 0 0 0-3.462-2.005L8.222 47.99c-3.86 6.667.95 15.01 8.654 15.01h38.248c7.703 0 12.514-8.343 8.654-15.01z" />
      <path
        fillRule="evenodd"
        d="M36 44a3 3 0 0 1-3-3V26a3 3 0 0 1 6 0v15a3 3 0 0 1-3 3"
        clipRule="evenodd"
      />
      <path d="M33 50.474a3.159 3.159 0 1 1 6.317 0 3.159 3.159 0 0 1-6.317 0" />
    </g>
    <defs>
      <clipPath id="ic_warning_svg__a">
        <path fill="#fff" d="M0 0h72v72H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgIcWarning;
