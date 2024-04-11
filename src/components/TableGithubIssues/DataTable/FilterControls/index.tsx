import React from 'react';

import { CircleDot } from 'lucide-react';

import { Separator } from '@/components/ui/separator';
import { IIssue } from '@/types';

import DataSort from './data-sort';
import FilterAuthor from './filter-author';
import FilterLabel from './filter-label';

interface FilterControlsProps {
  data: IIssue[];
  handleFilterChange: (key: string, value: string | undefined) => void;
  setSortedData: React.Dispatch<React.SetStateAction<any[]>>;
}

const FilterControls = ({
  data,
  handleFilterChange,
  setSortedData
}: FilterControlsProps) => {
  return (
    <div className="flex gap-4 justify-between items-center">
      {data.length > 0 ? (
        <div className="flex gap-2 items-center">
          <CircleDot size={16} />
          <div className="flex flex-wrap gap-1">{data.length} Open</div>
        </div>
      ) : null}

      <div className="flex gap-4 justify-end">
        <FilterLabel data={data} handleFilterChange={handleFilterChange} />
        <Separator orientation="vertical" className="h-10" />
        <FilterAuthor data={data} handleFilterChange={handleFilterChange} />
        <Separator orientation="vertical" className="h-10" />
        <DataSort data={data} setSortedData={setSortedData} />
      </div>
    </div>
  );
};

export default FilterControls;
