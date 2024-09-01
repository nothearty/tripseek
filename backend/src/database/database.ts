import { DataSource } from "typeorm";
import { User } from "./entities/User.entity";
import { Trip } from "./entities/Trip.entity";
import { City } from "./entities/City.entity";

const dataSource = new DataSource({
  type: "postgres",
  host: "postgres",
  port: 5432,
  username: Bun.env.DB_USER,
  password: Bun.env.DB_PASSWORD,
  database: Bun.env.DB_NAME,
  logging: false,
  synchronize: true,
  entities: [User, City, Trip],
});

export default dataSource;
