import { SVGProps } from 'react';

const SearchIcon = ({
  width = 32,
  height = 32,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clipPath="url(#a)">
      <path
        d="m31.563 27.669-6.232-6.232A1.499 1.499 0 0 0 24.27 21H23.25A12.936 12.936 0 0 0 26 13c0-7.181-5.819-13-13-13S0 5.819 0 13s5.819 13 13 13c3.019 0 5.794-1.025 8-2.75v1.019c0 .4.156.781.438 1.062l6.23 6.232a1.494 1.494 0 0 0 2.12 0l1.768-1.77a1.507 1.507 0 0 0 .006-2.124ZM13 21c-4.419 0-8-3.575-8-8 0-4.419 3.575-8 8-8 4.419 0 8 3.575 8 8 0 4.419-3.575 8-8 8Z"
        fill="#C4C4C4"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h32v32H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default SearchIcon;
