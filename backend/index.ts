import express, { type Express, type Request, type Response } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import http from "http";
import cookieParser from "cookie-parser";
import cors from 'cors';
import path from "path";
import fileUpload from "express-fileupload";

import { initDB } from "./app/common/services/database.service";
import { initPassport } from "./app/common/services/passport-jwt.service";
import { loadConfig } from "./app/common/helper/config.hepler";
import { type IUser } from "./app/user/user.dto";
import errorHandler from "./app/common/middleware/error-handler.middleware";
import routes from "./app/routes";
import swaggerUi from "swagger-ui-express";
import apiLimiter from "./app/common/middleware/rate-limit.middleware";

loadConfig();

declare global {
  namespace Express {
    interface User extends Omit<IUser, "password"> {}
    interface Request {
      user?: User;
    }
  }
}

const port = Number(process.env.PORT) ?? 5000;


const app: Express = express();


app.use(bodyParser.json());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors({
  origin: "*",
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true,
}));


app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',
  limits: { fileSize: 50 * 1024 * 1024 },
  abortOnLimit: true,
  safeFileNames: true,
}));


import swaggerDocument from "./app/swagger/swagger";


const initApp = async (): Promise<void> => {
  // init mongodb
  await initDB();

  // passport init
  initPassport();

  // set base path to /api
  app.use("/api", apiLimiter, routes);

  app.get("/", (req: Request, res: Response) => {
    res.send({ status: "ok" });
  });

  // Set up Swagger UI
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // error handler
  app.use(errorHandler);


  http.createServer(app).listen(port, '0.0.0.0', () => {
    console.log("Server is runnuing on port", port);
    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
  });


};

void initApp();