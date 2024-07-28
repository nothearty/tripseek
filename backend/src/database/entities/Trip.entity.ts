import { User } from "./User.entity";
import { City } from "./City.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";

@Entity("trips")
export class Trip extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: "int4",
  })
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column()
  text: string;

  @Column()
  departureDate: Date;

  @Column()
  returnDate: Date;

  @ManyToOne(() => City)
  @JoinColumn({ name: "city_id" })
  @Column({ type: "simple-array", default: [] })
  cities: City[];

  @Column()
  price: number;

  @CreateDateColumn()
  created_at: Date;
}
