import { ColumnDef } from "@tanstack/react-table";

import { TIssue } from "@/types";

import Image from "next/image";
import Link from "next/link";
import { CircleDot, MessageSquare } from "lucide-react";
import BadgeGithub from "../BadgeGithub";
import { timeSince } from "@/lib/utils";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const columns: ColumnDef<TIssue>[] = [
  {
    id: "details",
    cell: ({ row }) => (
      <div className="flex flex-col gap-1">
        <div className="grid grid-cols-[1fr_100px] gap-1">
          <div className="flex gap-2 items-start">
            <CircleDot size={16} color="green" />
            <div className="flex flex-wrap gap-1">
              <Link href={row.original.html_url} target="_blank">
                <div className="font-bold text-[16px] hover:text-blue-500 w-max">
                  {row.original.title}
                </div>
              </Link>
              {row.original.labels.map((label) => (
                <BadgeGithub
                  key={label.id}
                  text={label.name}
                  bgColor={label.color}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div>
              {row?.original?.assignee && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={row.original.assignee.html_url}
                        target="_blank"
                      >
                        <Image
                          src={row?.original?.assignee?.avatar_url}
                          alt={row.original.assignee.login}
                          className="rounded-full"
                          width={20}
                          height={20}
                        />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Assigned to {row.original.assignee.login} </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
            {row.original.comments > 0 && (
              <Link
                href={row.original.html_url}
                className="text-gray-500 hover:text-blue-500 flex items-start gap-1 text-xs"
                target="_blank"
              >
                <MessageSquare size={16} /> {row.original.comments}
              </Link>
            )}
          </div>
        </div>
        <div className="text-muted-foreground text-xs">
          #{row.original.number}{" "}
          {row.original.state === "open" ? "opened" : "closed"}{" "}
          {timeSince(new Date(row.original.created_at))} by{" "}
          <Link
            href={row.original.user.html_url}
            className="hover:text-blue-500"
          >
            {row.original.user.login}
          </Link>
        </div>
      </div>
    ),
  },
];
