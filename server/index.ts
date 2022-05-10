import express from "express";
import path from "path";

import config from "@config/keys";
import routes from "./routes";

const PORT = config.port;

const app = express();
app.use(express.static(path.resolve(__dirname, "./static")));

app.use(routes);

if (config.node_env === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./static/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
