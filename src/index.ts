import express from "express";
import morgan from "morgan";
import compression from "compression";
import auth from "./api/routes/AuthRoute";
import thread from "./api/routes/ThreadRoute";
import user from "./api/routes/UserRoute";
import notification from "./api/routes/NotificationRoute";
import showcase from "./api/routes/ShowcaseRoute";
import populer from "./api/routes/PopulerRoute";
import circle from "./api/routes/CirclesRoute";
import resizeImage from "./api/routes/Resize";
import bookmark from "./api/routes/BookmarkRoute";
import rateLimit from "./api/middlewares/rateLimit";
// import multer from "multer";
import bodyParser from 'body-parser'
// import path from "path";
// import {z} from 'zod'
// import hashtagRegex from 'hashtag-regex'

import cors from "cors";
const PORT = process.env.PORT || 3002;

const app = express();

// app.use(rateLimit);
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan("dev"));
app.use(compression());
app.use(cors());
app.use(express.static('public'));
// app.use(hashtagRegex)
// app.use(multer());

app.all("/", (req, res) => {
	res.json({
		Status: 200,
		Message: "Welcome to the ACC33SS API",
	});
});

app.use("/api/v1", auth);
app.use("/api/v1", thread);
app.use("/api/v1", user);
app.use("/api/v1", notification);
app.use("/api/v1", showcase);
app.use("/api/v1", populer);
app.use("/api/v1", circle);
app.use("/api/v1", bookmark);
app.use("/api/vi", resizeImage);



app.listen(PORT, () => console.log(`Rest Api run on http://localhost:${PORT}`));
