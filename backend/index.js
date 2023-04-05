import express from "express";
import cors from "cors";
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UserRoute from "./routes/UserRoute.js"
import TaskRoute from "./routes/TaskRoute.js"
import AuthRoute from "./routes/AuthRoute.js"

dotenv.config();

const app = express();

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});
(async()=>{
    await db.sync();
})();

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(UserRoute);
app.use(TaskRoute);
app.use(AuthRoute);

// app.get('/generate', (req, res) => {
//     // create a new PDF document
//     const doc = new PDFDocument();
  
//     // set the PDF document to be downloaded as a file
//     res.setHeader('Content-Disposition', 'attachment; filename="example.pdf"');
  
//     // pipe the PDF document to the response object
//     doc.pipe(res);
  
//     // add some content to the PDF document
//     // doc.fontSize(20).text('Hello World!', 100, 100);
//     const frontendTemplate = fs.readFileSync('template.html', 'utf8');
// doc.fontSize(12).text(frontendTemplate);

// doc.pipe(fs.createWriteStream('output.pdf'));
//     // end the PDF document
//     doc.end();
//   });
//   app.listen(3000, () => {
//     console.log('Server is running on port 3000');
//   });

store.sync();

app.listen(process.env.APP_PORT, ()=> {
    console.log('Server up and running...')
})