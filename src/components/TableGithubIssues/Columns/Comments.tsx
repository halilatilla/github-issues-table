import Link from 'next/link';
import React from 'react';

import { MessageSquare } from 'lucide-react';

interface ICommentsProps {
  url: string;
  commentsCount: number;
}

const Comments = ({ url, commentsCount }: ICommentsProps) => {
  return (
    <Link
      href={url}
      className="text-gray-500 hover:text-blue-500 flex items-start gap-1 text-xs"
      target="_blank"
    >
      <MessageSquare size={16} /> {commentsCount}
    </Link>
  );
};

export default Comments;
