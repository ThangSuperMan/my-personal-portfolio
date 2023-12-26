import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPostsTable1703583384595 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS posts (
          id SERIAL PRIMARY KEY,
          title VARCHAR(150) NOT NULL,
          short_description VARCHAR(150) NOT NULL,
          content TEXT NOT NULL,
          slug VARCHAR(100) NOT NULL,
          thumbnail_image_url VARCHAR(150),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
