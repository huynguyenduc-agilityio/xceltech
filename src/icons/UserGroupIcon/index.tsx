import { SVGProps } from 'react';

const UserGroupIcon = ({
  width = 40,
  height = 28,
  ...props
}: SVGProps<SVGSVGElement>) => (
  <svg
    width={width}
    height={height}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 40 28"
    {...props}
  >
    <path
      d="M12 14c3.869 0 7-3.131 7-7s-3.131-7-7-7-7 3.131-7 7 3.131 7 7 7Zm4.8 2h-.519c-1.3.625-2.743 1-4.281 1-1.537 0-2.975-.375-4.281-1H7.2A7.202 7.202 0 0 0 0 23.2V25a3 3 0 0 0 3 3h18a3 3 0 0 0 3-3v-1.8c0-3.975-3.225-7.2-7.2-7.2ZM30 14c3.313 0 6-2.688 6-6 0-3.313-2.688-6-6-6-3.313 0-6 2.688-6 6 0 3.313 2.688 6 6 6Zm3 2h-.237c-.87.3-1.788.5-2.763.5-.975 0-1.894-.2-2.762-.5H27c-1.275 0-2.45.369-3.481.962C25.044 18.606 26 20.788 26 23.2v2.4c0 .137-.031.269-.038.4H37a3 3 0 0 0 3-3c0-3.869-3.131-7-7-7Z"
      fill="currentColor"
    />
  </svg>
);

export default UserGroupIcon;
