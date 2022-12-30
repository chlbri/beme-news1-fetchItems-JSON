type Props = {
  language?: string;
  category?: string;
  from?: Date;
  to?: Date;
  source?: string;
};

export async function fetchNews({}: Props) {}
