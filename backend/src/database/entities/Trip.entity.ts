import { User } from "./User.entity";
import { City } from "./City.entity";
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  ManyToOne,
  JoinTable,
  JoinColumn,
  ManyToMany,
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

  @Column({ type: "timestamp with time zone" })
  departureDate: Date;

  @Column({ type: "timestamp with time zone" })
  returnDate: Date;

  @ManyToMany(() => City)
  @JoinTable({
    name: "trip_cities",
    joinColumn: {
      name: "trip_id",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "city_id",
      referencedColumnName: "id",
    },
  })
  cities: City[];

  @CreateDateColumn({
    type: "timestamp with time zone",
    default: () => "CURRENT_TIMESTAMP",
  })
  created_at: Date;
}
