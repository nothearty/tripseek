import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from "typeorm";

@Entity("cities")
export class City extends BaseEntity {
  @PrimaryGeneratedColumn({
    type: "int",
  })
  id: number;

  @Column()
  name: string;

  @Column()
  province: string;

  @Column()
  country: string;

  @Column()
  postalCode: string;
}
