import { TIssue } from '@/types';

import Columns from './Columns';
import DataTable from './DataTable';

interface ITableGithubIssuesProps {
  issues: TIssue[];
}

export default function TableGithubIssues({ issues }: ITableGithubIssuesProps) {
  return <DataTable columns={Columns} data={issues} />;
}
