import { SVGProps } from 'react';

const FilterIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="31"
    height="25"
    viewBox="0 0 31 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <g clip-path="url(#a)">
      <path
        d="M29.545 0H1.455C.165 0-.487 1.263.427 2l11.198 9.032v10.062c0 .382.231.74.62.96l4.844 2.733c.955.54 2.286-.007 2.286-.96V11.032l11.198-9.031C31.486 1.264 30.839 0 29.545 0"
        fill="#1A1A1A"
      />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 0h31v25H0z" />
      </clipPath>
    </defs>
  </svg>
);

export default FilterIcon;
