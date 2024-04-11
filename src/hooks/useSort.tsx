import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { IIssue } from '@/types';

interface SortConfig {
  key: keyof IIssue;
  direction: 'ascending' | 'descending';
}
type setSortedData = Dispatch<SetStateAction<IIssue[]>>;

function useSort(data: IIssue[], setSortedData: setSortedData) {
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: 'created_at',
    direction: 'ascending'
  });

  useEffect(() => {
    function sortData() {
      const sorted = [...data].sort((a, b) => {
        const aValue =
          typeof a[sortConfig.key] === 'string'
            ? new Date(a[sortConfig.key] as string).getTime()
            : a[sortConfig.key];
        const bValue =
          typeof b[sortConfig.key] === 'string'
            ? new Date(b[sortConfig.key] as string).getTime()
            : b[sortConfig.key];
        // @ts-expect-error
        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        // @ts-expect-error
        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
      setSortedData(sorted);
    }

    sortData();
  }, [data, sortConfig, setSortedData]);

  const handleSortChange = (value: string) => {
    const [key, direction] = value.split(':');
    setSortConfig({
      key: key as keyof IIssue,
      direction: direction as 'ascending' | 'descending'
    });
  };

  return { handleSortChange };
}

export default useSort;
