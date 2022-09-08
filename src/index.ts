import express from "express";
import auth from "./api/routes/AuthRoute";
import thread from "./api/routes/ThreadRoute";

const PORT = 3001;

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/api/v1", auth);
app.use("/api/v1", thread);

app.listen(PORT, () => console.log(`Rest Api run on http://localhost:${PORT}`));
