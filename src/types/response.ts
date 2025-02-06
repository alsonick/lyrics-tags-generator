export interface Response {
  success: boolean;
  length: number;
  error?: string;
  tags: string;
  title: string;
  artist: string;
  t: string;
  features: string[];
  extras: {
    titles: string;
  };
  url: string;
}
