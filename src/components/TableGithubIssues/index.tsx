import { TIssue } from "@/types";
import { columns } from "./columns";
import DataTable from "./data-table";

interface ITableGithubIssuesProps {
  issues: TIssue[];
}

export default function TableGithubIssues({ issues }: ITableGithubIssuesProps) {
  return <DataTable columns={columns} data={issues} />;
}
