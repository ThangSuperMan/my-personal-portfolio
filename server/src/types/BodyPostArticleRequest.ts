export interface BodyPostArticleRequest {
  Body: {
    title: string;
    shortDescription: string;
    content?: string;
    slug: string;
    thumbnailImageUrl?: string;
  };
}
