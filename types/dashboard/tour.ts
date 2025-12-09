export interface Tour {
  id: number;
  title: string;
  desc: string;
  status: string;
  created?: string;
  views: number;
  completions?: number;
  color?: string;
}

export interface StepData {
  title: string;
  description: string;
  selector: string;
  button_text?: string;
  bg_color?: string;
  text_color?: string;
  highlight_color?: string;
}