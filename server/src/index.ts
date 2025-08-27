import "reflect-metadata";
import express from "express";
import routes from "./routes";
import { errorHandler } from "./middlewares/error";
import { AppDataSource } from "./data-source";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_req, res) => res.json({ok: true}));
app.use("/api", routes);
app.use(errorHandler);

AppDataSource.initialize().then(() => {
    const PORT = process.env.port || 3000;
    app.listen(PORT, () => console.log(`API http://localhost:${PORT}`));
}).catch(console.error);

// npm run dev
// curl http://localhost:3000/health
// curl http://localhost:3000/api/students