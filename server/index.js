import express, { json, urlencoded } from "express";
import cors from "cors";
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());

import posts from "./routes/posts";

app.use("/api/posts", posts);

/* app.use('/', (_, res) => {
  res.redirect(301, '/api/posts');
}); */

if (process.env.NODE_ENV === "production") {
  // Static folder
  app.use(express.static(__dirname + "/public/"));

  //Handle SPA
  app.get(/.*/, (_, res) => res.sendFile(__dirname + "/public/index.html"));
}

app.use((err, _, res) => {
  if (err.code === "INCORRECT_FILETYPE") {
    res.status(422).json({ error: "Only images are allowed" });
    return;
  }
  if (err.code === "LIMIT_FILE_SIZE") {
    res.status(422).json({ error: "Allow file size is 500KB" });
    return;
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () =>
  console.log(`Server started on port http://localhost:${port}`)
);
