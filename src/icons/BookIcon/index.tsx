import { SVGProps } from 'react';

const BookIcon = ({
  width = 34,
  height = 28,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 34 28"
    {...props}
  >
    <path
      d="M32.006.78c-3.235.184-9.664.852-13.633 3.282a.907.907 0 0 0-.43.777v21.479c0 .681.746 1.112 1.375.796 4.084-2.055 9.99-2.616 12.91-2.77.996-.052 1.771-.851 1.771-1.81V2.594C34 1.547 33.093.719 32.006.78Zm-16.38 3.282C11.658 1.632 5.23.965 1.994.78.907.719 0 1.547 0 2.593v19.942c0 .959.775 1.758 1.772 1.81 2.921.154 8.83.715 12.913 2.771.627.316 1.37-.114 1.37-.794V4.829a.889.889 0 0 0-.429-.767Z"
      fill="currentColor"
    />
  </svg>
);

export default BookIcon;
