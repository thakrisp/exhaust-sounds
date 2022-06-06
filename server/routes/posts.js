import { Router } from "express";
import path from "path";
import { ObjectId } from "mongodb";
import { MongoClient } from "mongodb";
import multer from "multer";
import { unlink } from "fs";
import uploadFile from "../aws";
import dotenv from "dotenv";

const router = Router();

dotenv.config();

let dbUser = process.env.dbUserName;
let dbPassword = process.env.dbPassword;

const fileFilter = (_, file, cb) => {
  const allowedTypes = ["audio/mpeg", "image/jpeg", "image/png"];
  if (!allowedTypes.includes(file.mimetype)) {
    const error = new Error("Incorrect file");
    error.code = "INCORRECT_FILETYPE";
    return cb(error, false);
  }
  cb(null, true);
};

const upload = multer({
  dest: "./uploads",
  fileFilter,
  limits: {
    fileSize: 6000000,
  },
});

//get everything in database
router.get("/", async (_, res) => {
  const posts = await loadPostsCollection();
  let data = await posts
    .find({ reports: { $lte: 5 } })
    .sort({ date: -1 })
    .toArray();

  res.send(data);
});

//Post to database
router.post(
  "/",
  upload.fields([
    { name: "audioFile", maxCount: 1 },
    { name: "imgFile", maxCount: 1 },
  ]),
  async (req, res) => {
    let imgFile = req.files["imgFile"][0]["filename"];
    let imgFileEXT = path.extname(req.files["imgFile"][0]["originalname"]);

    console.log(path.resolve("uploads", imgFile));

    let imgFilePath = path.resolve("uploads", imgFile);

    let audioFile = req.files["audioFile"][0]["filename"];
    let audioFileEXT = path.extname(req.files["audioFile"][0]["originalname"]);
    let audioFilePath = path.resolve("uploads", audioFile);

    uploadFile(imgFilePath, imgFile, "test-exhaust-imgs", imgFileEXT);
    uploadFile(audioFilePath, audioFile, "test-exhaust-sounds", audioFileEXT);

    unlink(imgFilePath, (err) => {
      if (err) throw err;
      console.log(`img file: ${imgFile} was deleted`);
    });

    unlink(audioFilePath, (err) => {
      if (err) throw err;
      console.log(`audio file: ${audioFile} was deleted`);
    });

    const posts = await loadPostsCollection();
    await posts.insertOne({
      Name: req.body.name,
      IMG: imgFile,
      Audio: audioFile,
      tags: JSON.parse(req.body.tags),
      audioURL: `https://test-exhaust-sounds.s3.us-east-2.amazonaws.com/${audioFile}${audioFileEXT}`,
      imageURL: `https://test-exhaust-imgs.s3.us-east-2.amazonaws.com/${imgFile}${imgFileEXT}`,
      date: new Date(),
      reports: 0,
    });
    res.status(201).send("Added to DB");
  }
);

router.post("/report", async (req, res) => {
  const posts = await loadPostsCollection();
  try {
    posts.updateOne({ _id: ObjectId(req.body.id) }, { $inc: { reports: 1 } });
  } catch (err) {
    console.error(err);
  }

  res.status(200).send("updated");
});

async function loadPostsCollection() {
  const client = await MongoClient.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.vhobs.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  ).catch((err) => {
    console.error(err);
  });

  console.log("DB connected!");

  return client.db("carExhaustSounds").collection("audioFiles");
}

export default router;
