// import { Column, PrimaryGeneratedColumn, Entity, Index } from 'typeorm';

// @Entity({ name: 'users' })
// export class Users {
//   @PrimaryGeneratedColumn('uuid')
//   id: string;

//   @Column('varchar', { length: 20, nullable: true })
//   name: string;

//   @Index({ unique: true })
//   @Column('varchar', { length: 500, nullable: false })
//   email: string | null = null;

//   @Column('text')
//   description: string;

//   @Column('text')
//   avatar_url: string;

//   @Column('boolean')
//   active: boolean;

//   @Column({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
//   createdAt: Date;
// }
