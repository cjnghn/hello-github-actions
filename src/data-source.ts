import { DataSource } from "typeorm";
import { Todo } from "./entities/Todo";

const dataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "toor",
  database: "test",
  entities: [Todo],
  logging: true,
  synchronize: true,
});

export default dataSource;
