import { useMemo, useState } from 'react';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import useFilter from '@/hooks';
import { getFilteredDataByLabelAndAuthor } from '@/lib/utils';
import { TIssue } from '@/types';

import FilterControls from './FilterControls';
import PaginationControls from './PaginationControls';

interface DataTableProps {
  columns: ColumnDef<TIssue, any>[];
  data: TIssue[];
}

const DataTable = ({ columns, data }: DataTableProps) => {
  const { filters, handleFilterChange } = useFilter({
    label: undefined,
    author: undefined
  });

  const [sortedData, setSortedData] = useState(data);

  const filteredSortedData = useMemo(() => {
    return getFilteredDataByLabelAndAuthor(sortedData, filters);
  }, [sortedData, filters]);

  const table = useReactTable({
    data: filteredSortedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel()
  });

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <FilterControls
                  data={data}
                  handleFilterChange={handleFilterChange}
                  setSortedData={setSortedData}
                />
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
      <PaginationControls table={table} />
    </div>
  );
};

export default DataTable;
