export type SubmissionStatus = 
  | 'overdue' 
  | 'duesoon' 
  | 'upcoming' 
  | 'completed' 
  | 'reopened' 
  | 'new'
  | 'in-progress'
  | 'reopened_by_system'
  | 'submitted_for_review';

export interface Submission {
  id: string; // e.g. "122"
  refId: string; // e.g. "#122"
  submissionNumber: string; // e.g. "122"
  title: string; // e.g. "AP Aging Analysis"
  category: string; // e.g. "AP Aging Analysis", "Tax Filing", "Statutory Filing"
  serviceProvider: string; // e.g. "Crestview Advisory Group"
  entityName: string; // e.g. "Dummy Entity 6"
  propertyName: string; // e.g. "Park Avenue Tower"
  dataset: string; // e.g. "Dummy Dataset 3"
  dueDate: string; // YYYY-MM-DD, e.g. "2025-06-15"
  postMonth: string; // e.g. "Oct 2024"
  status: SubmissionStatus;
  priority?: 'High' | 'Medium' | 'Low';
  assignedTo?: string;
  description?: string;
  files?: Array<{ name: string; size: string; date: string; type: string }>;
  history?: Array<{ user: string; action: string; timestamp: string }>;
}

export type CalendarViewType = 'month' | 'week';
