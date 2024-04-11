import Link from 'next/link';
import React from 'react';

import { timeSince } from '@/lib/utils';

interface IDetailsProps {
  number: number;
  state: string;
  createdAt: string;
  userUrl: string;
  userName: string;
}

const Details = ({
  number,
  state,
  createdAt,
  userUrl,
  userName
}: IDetailsProps) => {
  return (
    <div className="text-muted-foreground text-xs">
      #{number} {state === 'open' ? 'opened' : 'closed'}{' '}
      {timeSince(new Date(createdAt))} by{' '}
      <Link href={userUrl} className="hover:text-blue-500">
        {userName}
      </Link>
    </div>
  );
};

export default Details;
