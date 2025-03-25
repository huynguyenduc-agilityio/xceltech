import { SVGProps } from 'react';

const KebabIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width={31}
    height={27}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M15.5 9.703c2.41 0 4.36 1.698 4.36 3.797s-1.95 3.797-4.36 3.797-4.36-1.698-4.36-3.797 1.95-3.797 4.36-3.797ZM11.14 4.22c0 2.099 1.95 3.797 4.36 3.797s4.36-1.698 4.36-3.797c0-2.1-1.95-3.797-4.36-3.797s-4.36 1.698-4.36 3.797Zm0 18.562c0 2.1 1.95 3.797 4.36 3.797s4.36-1.698 4.36-3.797-1.95-3.797-4.36-3.797-4.36 1.698-4.36 3.797Z"
      fill="#000"
    />
  </svg>
);

export default KebabIcon;
