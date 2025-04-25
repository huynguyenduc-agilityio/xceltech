import { useState } from 'react';

// Icons
import { FilterIcon } from '@/icons';

//Types
import { FilterCriteria } from '@/types';

// Components
import { Button, Checkbox, PopoverContainer } from '../common';

export interface FilterMenuProps {
  options: FilterCriteria;
  selectedValues?: FilterCriteria;
  isDisabled?: boolean;
  onApply: (filter: FilterCriteria) => void;
}

const FilterMenu = ({
  options,
  selectedValues = {},
  isDisabled = false,
  onApply,
}: FilterMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<FilterCriteria>(
    () => ({ ...selectedValues }),
  );

  const toggleSelection = (field: string, value: string) => {
    setSelectedFilters((prev) => {
      const currentValues = prev[field];

      if (Array.isArray(currentValues)) {
        return {
          ...prev,
          [field]: currentValues.includes(value)
            ? currentValues.filter((item) => item !== value)
            : [...currentValues, value],
        };
      }
      return {
        ...prev,
        [field]: [value],
      };
    });
  };

  const resetFilters = () => {
    setSelectedFilters({});
    onApply({});
  };

  const handleFilter = () => {
    onApply(selectedFilters);
    setIsOpen(false);
  };

  return (
    <PopoverContainer
      isOpen={!isDisabled && isOpen}
      onOpenChange={setIsOpen}
      trigger={
        <Button
          title="Filter Dropdown"
          variant="ghost"
          size="icon"
          className="p-2"
          disabled={isDisabled}
        >
          <FilterIcon />
        </Button>
      }
      contentClassName="px-0 pt-4 pb-2"
      content={
        <>
          {Object.entries(options).map(([field, values]) =>
            Array.isArray(values) ? (
              <div key={field} className="px-4">
                <h3 className="font-bold text-base mb-3">
                  {field.toUpperCase()}
                </h3>
                <div className="flex flex-col gap-4">
                  {values.map((value) => (
                    <div key={value} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${field}-${value}`}
                        checked={
                          Array.isArray(selectedFilters[field]) &&
                          selectedFilters[field].includes(value)
                        }
                        onCheckedChange={() => toggleSelection(field, value)}
                      />
                      <label htmlFor={`${field}-${value}`} className="text-sm">
                        {value}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ) : null,
          )}

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
        </>
      }
    />
  );
};

export default FilterMenu;
