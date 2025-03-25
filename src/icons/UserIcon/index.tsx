import { SVGProps } from 'react';

const UserIcon = ({
  width = 28,
  height = 28,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 28 28"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="M14 15.75a7.877 7.877 0 0 0 7.875-7.875A7.877 7.877 0 0 0 14 0a7.877 7.877 0 0 0-7.875 7.875A7.877 7.877 0 0 0 14 15.75Zm7 1.75h-3.013a9.53 9.53 0 0 1-3.987.875 9.549 9.549 0 0 1-3.987-.875H7a7 7 0 0 0-7 7v.875A2.626 2.626 0 0 0 2.625 28h22.75A2.626 2.626 0 0 0 28 25.375V24.5a7 7 0 0 0-7-7Z"
        fill="currentColor"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="currentColor" d="M0 0h28v28H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default UserIcon;
