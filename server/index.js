import cluster from "cluster";
import os from "os";
import express from "express";
import { createServer } from "http";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";

import authRoute from "./routes/auth.route.js";
import adminRoute from "./routes/admin.route.js";
import userRoute from "./routes/user.route.js";

import {
  createInvoice,
  createUser,
  editInvoice,
  editUser,
} from "./controllers/admin.controller.js";

import { getUser, isAdmin, verifyToken } from "./middleware/auth.js";

import { connectDB } from "./db/connect.js";
import validateObjectId from "./validators/id.js";

if (cluster.isMaster && false) {
  // Get the number of CPU cores
  const numCPUs = os.cpus().length;

  // Fork workers for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
    // Restart the worker if it crashes
    cluster.fork();
  });
} else {
  /*CONFIGURATIONS*/
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  dotenv.config();
  const app = express();
  app.use(express.json());
  app.use(helmet());
  app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
  app.use(morgan("short"));
  app.use(bodyParser.json({ limit: "30mb", extended: true }));
  app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
  app.use(cors());
  app.use("/storage", express.static(path.join(__dirname, "public/storage")));
  app.use("/assets", express.static(path.join(__dirname, "public/assets")));
  app.use(cookieParser(process.env.JWT_SECRET));
  app.use(validateObjectId);
  /*FILE STORAGE*/

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/storage");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
  const upload = multer({ storage });

  /*ROUTES WITH FILES*/
  app.post(
    "/api/admin/create_user",
    isAdmin,
    getUser,
    upload.single("file"),
    createUser
  );
  app.post(
    "/api/admin/create_invoice",
    isAdmin,
    getUser,
    upload.array("file"),
    createInvoice
  );
  app.patch(
    "/api/admin/edit_invoice",
    isAdmin,
    getUser,
    upload.array("file"),
    editInvoice
  );
  app.patch(
    "/api/admin/edit_user",
    isAdmin,
    getUser,
    upload.single("file"),
    editUser
  );

  /*ROUTES*/
  app.use("/api/", authRoute);
  app.use("/api/admin/", isAdmin, getUser, adminRoute);
  app.use("/api/user/", verifyToken, userRoute);

  connectDB();

  /* Error handler*/

  app.use((err, req, res, next) => {
    console.error(err.stack);
    return res.status(500).json({
      message: "حدث خطأ ما. يرجى المحاولة لاحقًا.",
    });
  });

  const PORT = process.env.PORT;
  const server = createServer(app);

  try {
    server.listen(PORT, () => console.log(`Server Connected on Port: ${PORT}`));
  } catch (error) {
    console.error(error);
  }
}
