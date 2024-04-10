import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';
import { CircleDot } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { TIssue } from '@/types';

import DataSort from './data-sort';
import FilterAuthor from './filter-author';
import FilterLabel from './filter-label';


interface DataTableProps {
  columns: ColumnDef<TIssue, any>[];
  data: TIssue[];
}

interface FiltersState {
  label?: string;
  author?: string;
}

export default function DataTable({ columns, data }: DataTableProps) {
  const router = useRouter();
  const [filters, setFilters] = useState<FiltersState>({});

  const [sortedFilteredData, setSortedFilteredData] = useState(data);

  const filteredData = useMemo(() => {
    return sortedFilteredData.filter(item => {
      const labelMatch = filters.label
        ? item.labels.some(label => label.name === filters.label)
        : true;
      const authorMatch = filters.author
        ? item.user.login === filters.author
        : true;
      return labelMatch && authorMatch;
    });
  }, [sortedFilteredData, filters]);

  const table = useReactTable({
    data: filteredData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

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

  useEffect(() => {
    const query = router.query;
    setFilters({
      label: typeof query.label === 'string' ? query.label : undefined,
      author: typeof query.author === 'string' ? query.author : undefined
    });
  }, [router.query]);

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow key={'test'}>
              <TableHead key={'new'}>
                <div className="flex gap-4 justify-between items-center">
                  {filteredData.length > 0 ? (
                    <div className="flex gap-2 items-center">
                      <CircleDot size={16} />
                      <div className="flex flex-wrap gap-1">
                        {filteredData.length} Open
                      </div>
                    </div>
                  ) : null}

                  <div className="flex gap-4 justify-end">
                    <FilterLabel
                      data={data}
                      handleFilterChange={handleFilterChange}
                    />
                    <Separator orientation="vertical" className="h-10" />
                    <FilterAuthor
                      data={data}
                      handleFilterChange={handleFilterChange}
                    />
                    <Separator orientation="vertical" className="h-10" />
                    <DataSort
                      data={data}
                      setSortedFilteredData={setSortedFilteredData}
                    />
                  </div>
                </div>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
