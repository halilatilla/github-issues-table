import { Table } from '@tanstack/react-table';

import { Button } from '@/components/ui/button';
import { IIssue } from '@/types';

interface PaginationControlsProps {
  table: Table<IIssue>;
}

const PaginationControls = ({ table }: PaginationControlsProps) => (
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
);

export default PaginationControls;
