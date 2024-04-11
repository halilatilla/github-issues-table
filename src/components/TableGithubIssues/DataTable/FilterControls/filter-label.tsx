import { useMemo, useState } from 'react';

import { XIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { TIssue } from '@/types';

interface FilterLabelProps {
  data: TIssue[];
  handleFilterChange: (key: string, value: string | undefined) => void;
}

const FilterLabel = ({ data, handleFilterChange }: FilterLabelProps) => {
  const [key, setKey] = useState(+new Date());

  const labelOptions = useMemo(() => {
    return Array.from(
      new Set(data.flatMap(d => d.labels.map(l => l.name))).values()
    ).map(label => ({
      label,
      value: label
    }));
  }, [data]);

  const handleReset = () => {
    setKey(+new Date());
    handleFilterChange('label', undefined);
  };

  return (
    <div className="flex gap-2">
      <Select
        onValueChange={value => handleFilterChange('label', value)}
        key={key + 'label'}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a label" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {labelOptions.map(option => (
              <SelectItem key={option.label} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

      <Button onClick={handleReset} variant="outline">
        <XIcon size={16} />
      </Button>
    </div>
  );
};

export default FilterLabel;
