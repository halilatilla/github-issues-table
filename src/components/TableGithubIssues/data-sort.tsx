import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { TIssue } from '@/types';

interface DataSortProps {
  data: TIssue[];
  setSortedData: Dispatch<SetStateAction<TIssue[]>>;
}

interface SortConfig {
  key: keyof TIssue;
  direction: 'ascending' | 'descending';
}

const DataSort = ({ data, setSortedData }: DataSortProps) => {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'created_at',
    direction: 'ascending'
  });

  useEffect(() => {
    const sortData = (
      data: TIssue[],
      { key, direction }: SortConfig
    ): TIssue[] => {
      return [...data].sort((a, b) => {
        const aValue =
          key === 'created_at' || key === 'updated_at'
            ? new Date(a[key] as string).getTime()
            : a[key];
        const bValue =
          key === 'created_at' || key === 'updated_at'
            ? new Date(b[key] as string).getTime()
            : b[key];
        // @ts-expect-error
        if (aValue < bValue) return direction === 'ascending' ? -1 : 1;
        // @ts-expect-error
        if (aValue > bValue) return direction === 'ascending' ? 1 : -1;
        return 0;
      });
    };

    const sortedData = sortData(data, sortConfig);
    setSortedData(sortedData);
  }, [data, sortConfig, setSortedData]);

  const handleSortChange = (value: string) => {
    const [key, direction] = value.split(':');
    setSortConfig({
      key: key as keyof TIssue,
      direction: direction as 'ascending' | 'descending'
    });
  };

  return (
    <Select onValueChange={handleSortChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="created_at:ascending">Created At (Asc)</SelectItem>
          <SelectItem value="created_at:descending">
            Created At (Desc)
          </SelectItem>
          <SelectItem value="updated_at:ascending">Updated At (Asc)</SelectItem>
          <SelectItem value="updated_at:descending">
            Updated At (Desc)
          </SelectItem>
          <SelectItem value="comments:ascending">Comments (Asc)</SelectItem>
          <SelectItem value="comments:descending">Comments (Desc)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default DataSort;
