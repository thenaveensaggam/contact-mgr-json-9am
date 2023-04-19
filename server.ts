import express , {Request, Response, Application} from 'express';
import contactRouter from "./routes/contacts/contactRouter";
import groupRouter from "./routes/groups/groupRouter";
import dotEnv from "dotenv";
import {loggerMiddleware} from "./middlewares/loggerMiddleware";

const app:Application = express();

// configure dotenv
dotEnv.config({path : "./.env"})

const port:number | undefined | string = process.env.PORT || 9999;

// configure express to read form data
app.use(express.json());

// configure the logger middleware
app.use(loggerMiddleware);

app.get("/", (request:Request, response:Response) => {
    response.status(200);
    response.json({
        msg : "Welcome to Express JS"
    });
});

// configure the routes
app.use('/contacts', contactRouter);
app.use('/groups', groupRouter);

if(port){
    app.listen(Number(port), () => {
        console.log(`Express server is Started at ${port}`);
    });
}
