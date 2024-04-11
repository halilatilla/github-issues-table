import Image from 'next/image';
import Link from 'next/link';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip';

interface IAssigneeProps {
  assigneeUrl: string;
  assigneeAvatarUrl: string;
  assigneeName: string;
}

const Assignee = ({
  assigneeUrl,
  assigneeAvatarUrl,
  assigneeName
}: IAssigneeProps) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link href={assigneeUrl} target="_blank">
            <Image
              src={assigneeAvatarUrl}
              alt={assigneeName}
              className="rounded-full"
              width={20}
              height={20}
            />
          </Link>
        </TooltipTrigger>
        <TooltipContent>
          <p>Assigned to {assigneeName} </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Assignee;
