export default interface Post {
  id?: number;
  title: string;
  shortDescription: string;
  content: string;
  slug: string;
  thumbnailImageUrl: string;
  createdAt?: Date;
}
