export interface Comment {
  authorName: string;
  createdAt: number;
  id: string;
  isResolved: boolean;
  parentId: string | null;
  text: string;
}
