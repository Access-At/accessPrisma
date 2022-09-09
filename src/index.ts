import express from "express";
import morgan from "morgan";
import compression from "compression";
import auth from "./api/routes/AuthRoute";
import thread from "./api/routes/ThreadRoute";
import user from "./api/routes/UserRoute";
import notification from "./api/routes/Notification";
import showcase from "./api/routes/ShowcaseRoute";
import rateLimit from "./api/middlewares/rateLimit";

import cors from "cors";
const PORT = 3001;

const app = express();

app.use(rateLimit);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(compression());
app.use(cors());

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

app.listen(PORT, () => console.log(`Rest Api run on http://localhost:${PORT}`));
