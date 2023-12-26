import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: '150', nullable: false })
  title: string;

  @Column({ type: 'varchar', length: '300', nullable: false })
  shortDescription: string;

  @Column({ type: 'text', nullable: false })
  content: string;

  @Column({ type: 'varchar', length: '100', nullable: false })
  slug: string;

  @Column({ type: 'varchar', length: '150', nullable: true })
  thumbnailImageUrl: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  constructor(
    title: string,
    shortDescription: string,
    content: string,
    slug: string,
    thumbnailImageUrl: string
  ) {
    this.title = title;
    this.shortDescription = shortDescription;
    this.content = content;
    this.thumbnailImageUrl = thumbnailImageUrl;
    this.slug = slug;
  }
}
