import { SVGProps } from 'react';

const WrenchIcon = ({
  width = 31,
  height = 31,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 31 31"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clip-path="url(#a)">
      <path
        d="M29.86 7.12a.684.684 0 0 0-1.148-.313l-4.242 4.241-3.872-.645-.645-3.872 4.242-4.241a.686.686 0 0 0-.323-1.15 8.21 8.21 0 0 0-7.79 2.163c-2.262 2.261-2.884 5.539-1.943 8.396L1.968 23.871a3.65 3.65 0 0 0 5.162 5.162l12.16-12.161c2.86.953 6.13.324 8.407-1.952a8.21 8.21 0 0 0 2.162-7.8M4.55 27.82a1.37 1.37 0 1 1 0-2.738 1.37 1.37 0 0 1 0 2.738"
        fill="#000"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M.898.898h29.204v29.204H.898z" />
      </clipPath>
    </defs>
  </svg>
);

export default WrenchIcon;
