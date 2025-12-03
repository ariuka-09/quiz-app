export type quiz = {
  id: number;
  question: string;
  options: string[];
  answer: string;
  articleid: string;
  quizattempts: string[];
  userscores: string;
};
export type article = {
  id?: number;
  title?: string;
  content?: string;
  summary?: string;
  userid?: number;
};
