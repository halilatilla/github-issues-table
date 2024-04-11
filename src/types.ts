export interface IFiltersState {
  label?: string;
  author?: string;
}

export type TUser = {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  site_admin: boolean;
};

export type TLabel = {
  id: number;
  node_id: string;
  url: string;
  name: string;
  color: string;
  default: boolean;
  description: string | null;
};

export type TAssignee = {
  avatar_url: string;
  login: string;
  html_url: string;
  id: number;
};

export type TPullRequest = {
  url: string;
  html_url: string;
  diff_url: string;
  patch_url: string;
  merged_at: null | string;
};

export type TReactions = {
  url: string;
  total_count: number;
  '+1': number;
  '-1': number;
  laugh: number;
  hooray: number;
  confused: number;
  heart: number;
  rocket: number;
  eyes: number;
};

export interface IIssue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: TUser;
  labels: TLabel[];
  state: 'open' | 'closed';
  locked: boolean;
  assignee: TAssignee | null;
  assignees: []; // This could be an array of users if you have assignees
  milestone: null; // This could be expanded to a Milestone type if needed
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  author_association: string;
  active_lock_reason: null | string;
  draft: boolean;
  pull_request: TPullRequest;
  body: string;
  reactions: TReactions;
  timeline_url: string;
  performed_via_github_app: null | string; // This could be expanded to a specific type if you have information about the app
  state_reason: null | string;
}
