export interface TimeEntry {
  id: string;
  activity: {
    id: string;
    name: string;
    color: string;
    folderId?: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
  folder: {
    id: string;
    name: string;
  };
  duration: {
    startedAt: string;
    stoppedAt: string;
  };
  note?: {
    text?: string;
    tags?: string[];
    mentions?: Array<{
      id: number;
      key: string;
      label: string;
      scope: string;
      folderId: string;
    }>;
  };
  timezone: string;
}

export interface ReportResponse {
  timeEntries: TimeEntry[];
}
