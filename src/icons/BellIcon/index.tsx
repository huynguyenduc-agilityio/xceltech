import { SVGProps } from 'react';

const BellIcon = ({
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
        d="M13.981 27.49a3.367 3.367 0 0 0 3.367-3.367h-6.733a3.367 3.367 0 0 0 3.366 3.368Zm11.335-7.878c-1.017-1.092-2.92-2.735-2.92-8.119 0-4.089-2.866-7.362-6.732-8.165V2.231a1.684 1.684 0 1 0-3.366 0v1.097c-3.866.803-6.732 4.076-6.732 8.165 0 5.383-1.903 7.027-2.92 8.12-.315.339-.455.745-.453 1.142.006.863.683 1.684 1.69 1.684H24.08c1.006 0 1.684-.821 1.689-1.684a1.644 1.644 0 0 0-.453-1.143Z"
        fill="#fff"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path
          fill="#fff"
          transform="translate(.51 .547)"
          d="M0 0h26.943v26.943H0z"
        />
      </clipPath>
    </defs>
  </svg>
);

export default BellIcon;
