import { SVGProps } from 'react';

const BagIcon = ({
  width = 35,
  height = 31,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 35 31"
    {...props}
  >
    <path
      d="M21.875 21.036a1.1 1.1 0 0 1-1.094 1.107H14.22a1.1 1.1 0 0 1-1.094-1.107v-3.322H0v9.965C0 29.45 1.531 31 3.281 31H31.72C33.469 31 35 29.45 35 27.679v-9.965H21.875v3.322Zm9.844-14.393H26.25V3.32C26.25 1.55 24.719 0 22.969 0H12.03C10.281 0 8.75 1.55 8.75 3.321v3.322H3.281C1.531 6.643 0 8.193 0 9.964V15.5h35V9.964c0-1.771-1.531-3.321-3.281-3.321Zm-9.844 0h-8.75V4.429h8.75v2.214Z"
      fill="currentColor"
    />
  </svg>
);

export default BagIcon;
