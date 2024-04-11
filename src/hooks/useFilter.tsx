import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import { IFiltersState } from '@/types';

function useFilter(initialFilters: IFiltersState) {
  const router = useRouter();
  const [filters, setFilters] = useState<IFiltersState>(initialFilters);

  // Function to update filters and modify the URL query parameters
  const handleFilterChange = (
    filterType: string,
    value: string | undefined
  ) => {
    const newFilters = { ...filters, [filterType]: value };
    setFilters(newFilters);

    const newQuery = { ...router.query, [filterType]: value || '' };
    router.push({ pathname: router.pathname, query: newQuery }, undefined, {
      shallow: true
    });
  };

  // Effect to initialize and sync state with URL query parameters
  useEffect(() => {
    const query = router.query;
    setFilters({
      label: typeof query.label === 'string' ? query.label : undefined,
      author: typeof query.author === 'string' ? query.author : undefined
    });
  }, [router.query]);

  return { filters, handleFilterChange };
}

export default useFilter;
