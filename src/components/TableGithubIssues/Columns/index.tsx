import { ColumnDef } from '@tanstack/react-table';

import { IIssue } from '@/types';

import Assignee from './Assignee';
import Comments from './Comments';
import Details from './Details';
import TitleAndLabels from './TitleAndLabels';

const Columns: ColumnDef<IIssue>[] = [
  {
    id: 'details',
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <div className="grid grid-cols-[1fr_100px] gap-1">
          <TitleAndLabels
            labels={row.original.labels}
            url={row.original.html_url}
            title={row.original.title}
          />

          <div className="flex items-center justify-between">
            <div>
              {row?.original?.assignee && (
                <Assignee
                  assigneeAvatarUrl={row?.original?.assignee?.avatar_url}
                  assigneeName={row.original.assignee.login}
                  assigneeUrl={row.original.assignee.html_url}
                />
              )}
            </div>
            {row.original.comments > 0 && (
              <Comments
                url={row.original.html_url}
                commentsCount={row.original.comments}
              />
            )}
          </div>
        </div>
        <Details
          number={row.original.number}
          state={row.original.state}
          createdAt={row.original.created_at}
          userUrl={row.original.user.html_url}
          userName={row.original.user.login}
        />
      </div>
    )
  }
];

export default Columns;
