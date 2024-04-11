import Link from 'next/link';
import React from 'react';

import { CircleDot } from 'lucide-react';

import BadgeGithub from '@/components/BadgeGithub';
import { TLabel } from '@/types';

interface TitleAndLabelsProps {
  labels: TLabel[];
  url: string;
  title: string;
}

const TitleAndLabels = ({ labels, url, title }: TitleAndLabelsProps) => {
  return (
    <div className="flex gap-2 items-start">
      <CircleDot size={16} color="green" />
      <div className="flex flex-wrap gap-1">
        <Link href={url} target="_blank">
          <div className="font-bold text-[16px] hover:text-blue-500 w-max">
            {title}
          </div>
        </Link>
        {labels.map(label => (
          <BadgeGithub key={label.id} text={label.name} bgColor={label.color} />
        ))}
      </div>
    </div>
  );
};

export default TitleAndLabels;
