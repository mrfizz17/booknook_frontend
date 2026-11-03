export type Book = {
  id: string;
  title: string;
  author: string;
  category: string;
  isNew?: boolean;
  cover: {
    from: string;
    to: string;
  };
};
