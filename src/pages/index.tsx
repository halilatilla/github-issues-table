import TableGithubIssues from '@/components/TableGithubIssues';
import { TIssue } from '@/types';

interface IHomeProps {
  issues: TIssue[];
}

export default function Home({ issues }: IHomeProps) {
  return (
    <main className="container mx-auto py-10">
      <TableGithubIssues issues={issues} />
    </main>
  );
}

export async function getServerSideProps() {
  const API_URL = process.env.API_URL;
  const res = await fetch(`${API_URL}`);
  const issues = (await res.json()) as TIssue[];

  return {
    props: {
      issues: issues || []
    }
  };
}
