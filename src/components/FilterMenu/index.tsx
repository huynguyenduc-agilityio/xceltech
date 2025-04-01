import { useState } from 'react';

// Icons
import { FilterIcon } from '@/icons';

// Components
import { Button, Checkbox, PopoverContainer } from '../common';

export interface FilterMenuProps {
  options: string[];
  selectedValues?: string[];
  onApply: (values: string[]) => void;
}

const FilterMenu = ({
  options,
  selectedValues = [],
  onApply,
}: FilterMenuProps) => {
  const [selected, setSelected] = useState<string[]>(selectedValues);

  const toggleSelection = (value: string) => {
    setSelected((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value],
    );
  };

  const resetFilters = () => setSelected([]);

  const handleFilter = () => {
    onApply(selected);
  };

  return (
    <PopoverContainer
      trigger={
        <Button variant="ghost" size="icon" className="p-2">
          <FilterIcon />
        </Button>
      }
      contentClassName="px-0 pt-4 pb-2"
      content={
        <div>
          <div className="space-y-2 px-4">
            {options.map((option) => (
              <div key={option} className="flex items-center space-x-2">
                <Checkbox
                  id={option}
                  checked={selected.includes(option)}
                  onCheckedChange={() => toggleSelection(option)}
                />
                <label htmlFor={option} className="text-sm">
                  {option}
                </label>
              </div>
            ))}
          </div>
          <div className="mt-4 border-t border-gray-muted">
            <div className="flex justify-between px-4 pt-2">
              <Button
                variant="outline"
                onClick={resetFilters}
                className="text-sm px-4 py-2 w-[60px] h-[36px] rounded-md"
              >
                Reset
              </Button>
              <Button
                className="text-sm px-4 py-2 w-[60px] h-[36px] rounded-md"
                onClick={handleFilter}
              >
                OK
              </Button>
            </div>
          </div>
        </div>
      }
    />
  );
};

export default FilterMenu;
