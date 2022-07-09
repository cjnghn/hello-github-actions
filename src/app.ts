import * as express from "express";
import * as logger from "morgan";
import * as cors from "cors";
import ErrorHandler from "./middlewares/ErrorHandler";
import TodoRoute from "./routes/TodoRoute";
import "dotenv/config";

const env = process.env.NODE_ENV || "development";
const app = express();

if (env === "production") app.use(logger("common"));
else if (env === "development") app.use(logger("dev"));

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get(["/", "/test"], (req, res, next) => {
  return res.send("Welcome!");
});

app.use("/todo", new TodoRoute().router);
app.use(new ErrorHandler().router);

export default app;
