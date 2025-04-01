import { ChangeEvent, useCallback } from 'react';

// Icons
import { ChevronsUpDown } from 'lucide-react';
import { SearchIcon } from '@/icons';

// Components
import { Input, InputProps } from '../common';

type TSearchBarProps = Omit<InputProps, 'onChange'> & {
  onChange: (value: string) => void;
};

const SearchBar = ({ onChange, ...rest }: TSearchBarProps) => {
  const handleChangeValue = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => onChange(e.target.value),
    [onChange],
  );

  return (
    <div className="relative w-[721px] h-[69px]">
      <div className="absolute inset-0 flex items-center justify-center gap-3 w-[216px] h-full bg-primary text-white rounded-l-[15px]">
        <span className="text-lg font-bold">All Candidates</span>
        <ChevronsUpDown />
      </div>
      <Input
        type="text"
        placeholder="Search..."
        onChange={handleChangeValue}
        {...rest}
        className="bg-white h-full rounded-[15px] pl-[251px] pr-[90px] font-bold"
      />
      <SearchIcon className="absolute top-[25%] right-10" />
    </div>
  );
};

export default SearchBar;
