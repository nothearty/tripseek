import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
} from "typeorm";

@Entity("users")
export class User extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: "int2",
  })
  id: number;

  @Column({ type: "varchar", length: 255 })
  google_id: string;

  @Column()
  name: string;

  @Column()
  picture: string;

  @Column()
  email: string;

  @CreateDateColumn()
  created_at: Date;
}
