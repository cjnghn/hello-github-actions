import "dotenv/config";
import { DataSource } from "typeorm";
import { Todo } from "./entities/Todo";

const dataSource = new DataSource({
  type: "mysql",
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USERNAME || "root",
  password: process.env.DB_PASSWORD || "toor",
  database: process.env.DB_NAME || "test",
  entities: [Todo],
  logging: true,
  synchronize: true,
});

export default dataSource;
