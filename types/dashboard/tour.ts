import { Id } from '@/convex/_generated/dataModel';

export interface Tour {
  _id: Id<'tours'>;
  _creationTime?: number;
  createdAt?: number;
  user_id: string;
  title: string;
  description: string;
  status: string;
}

export interface StepData {
  _id: Id<'steps'>;
  _creationTime: number;
  button_text?: string | undefined;
  bg_color?: string | undefined;
  text_color?: string | undefined;
  highlight_color?: string | undefined;
  createdAt: number;
  title: string;
  description: string;
  tour_id: Id<'tours'>;
  selector: string;
  started: number;
  skipped: number;
  completed: number;
}

export type NewStep = Omit<
  StepData,
  '_id' | '_creationTime' | 'createdAt' | 'tour_id'
>;
