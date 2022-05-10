import express from "express";
import path from "path";

import config from "@config/keys";

const PORT = config.port;

const app = express();
app.use(express.static(path.resolve(__dirname, "./static")));

app.use("/api/test", (req, res) => {
  try {
    res.status(200).json({
      success: true,
      message: "api/test proxy working",
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

if (config.node_env === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./static/index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
