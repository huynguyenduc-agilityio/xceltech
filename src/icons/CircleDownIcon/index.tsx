import { SVGProps } from 'react';

const CircleDownIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="17"
    height="14"
    viewBox="0 0 17 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="M16.734 7c0 3.746-3.685 6.781-8.234 6.781S.266 10.746.266 7 3.95.219 8.5.219 16.734 3.254 16.734 7m-7.67 3.114 4.5-3.705c.312-.257.312-.672 0-.927l-.565-.464a.92.92 0 0 0-1.126 0L8.5 7.796 5.127 5.018a.92.92 0 0 0-1.126 0l-.564.464c-.313.257-.313.673 0 .927l4.499 3.706a.92.92 0 0 0 1.128 0"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h17v14H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default CircleDownIcon;
