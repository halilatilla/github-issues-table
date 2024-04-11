import { useMemo, useState } from 'react';

import { XIcon } from 'lucide-react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { TIssue } from '@/types';

import { Button } from '../../../ui/button';

interface FilterAuthorProps {
  data: TIssue[];
  handleFilterChange: (key: string, value: string | undefined) => void;
}

const FilterAuthor = ({ data, handleFilterChange }: FilterAuthorProps) => {
  const [key, setKey] = useState(+new Date());

  const authorOptions = useMemo(() => {
    return Array.from(new Set(data.map(d => d.user.login))).map(author => ({
      label: author,
      value: author
    }));
  }, [data]);

  const handleReset = () => {
    setKey(+new Date());
    handleFilterChange('author', undefined);
  };
  return (
    <div className="flex gap-2">
      <Select
        onValueChange={value => handleFilterChange('author', value)}
        key={key + 'author'}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select an author" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {authorOptions.map(option => (
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

export default FilterAuthor;
