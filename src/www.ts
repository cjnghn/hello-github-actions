import app from "./app";
import dataSource from "./data-source";

const port = process.env.PORT || 3000;

dataSource
  .initialize()
  .then(() => {
    app
      .listen(port, () => {
        console.log(`🎉 ${port}`);
      })
      .on("error", (error) => {
        console.error(error);
      });
  })
  .catch((error) => console.log(error));
