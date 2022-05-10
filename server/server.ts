import express from "express";
import path from "path";

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

if (process.env.NODE_ENV === "production") {
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "./static/index.html"));
  });
}

app.listen(3000, () => {
  console.log(`Server running on http://localhost:3000`);
});
