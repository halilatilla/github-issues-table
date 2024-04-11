import { Dispatch, SetStateAction } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import useSort from '@/hooks/useSort';
import { IIssue } from '@/types';

interface DataSortProps {
  data: IIssue[];
  setSortedData: Dispatch<SetStateAction<IIssue[]>>;
}

const DataSort = ({ data, setSortedData }: DataSortProps) => {
  const { handleSortChange } = useSort(data, setSortedData);

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
