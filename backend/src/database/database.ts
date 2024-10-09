import { DataSource } from "typeorm";
import { User } from "./entities/User.entity";
import { Trip } from "./entities/Trip.entity";
import { City } from "./entities/City.entity";

const dataSource = new DataSource({
  type: "postgres",
  url: Bun.env.DATABASE_URL,
  logging: false,
  synchronize: true,
  entities: [User, City, Trip],
});

export default dataSource;
