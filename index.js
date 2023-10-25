import express from "express";
// import { client } from "./Database/Db.js";
 import { isAuthenticated } from "./Authentication/Auth.js";
import dotenv from "dotenv";
import cors from "cors";
import { usersRouter } from "./Routers/Routers-User.js";
import {TransdataRouter} from "./Routers/Routers-Tansdata.js";
//configure thhe environment
dotenv.config();
const PORT = process.env.PORT;

// initialize express server framework
const app = express();
// MiddleWare
app.use(express.json());
app.use(cors());

//UserssRouter
app.use("/users", usersRouter);
// TransdataRouter
app.use("/transdata",isAuthenticated,TransdataRouter)



// listen to a server
app.listen(PORT, () => console.log(`Server Running in localhost:${PORT}`));
