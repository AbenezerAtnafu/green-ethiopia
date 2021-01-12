const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const chalk= require("chalk");
const morgan = require("morgan");
const compression = require('compression');
const bodyParser = require('body-parser');

const db = require ("./models");
const AppError = require("./utils/AppError");
const { errorHandler } = require("./controllers/error.controller");


const publicViewsRouter = require("./routes/public-views.route")
const blogRouter = require("./routes/blog.route");
const campaignRouter = require("./routes/campaign.route");
const adminRouter = require("./routes/admin-veiws.route");

db.sequelize.sync().then(() => {
  console.log(chalk.cyan("Connected to database"));
});

const app = express();

if(process.env.NODE_ENV==='development'){
  app.use(morgan('dev'))
}
app.use(cors());
// app.use(compression())
app.use(express.json("12kb"));
app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.urlencoded({extended:true}))
app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");


app.use('/', publicViewsRouter);
app.use("/admin", adminRouter);
app.use('/api/v1/blogs', blogRouter);
app.use('/api/v1/campaigns', campaignRouter);



app.use("*", (req, res, next) => {
  next(new AppError(`The requested ${req.originalUrl} does not exist`));
});
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(chalk.blue(`Server started succesfully on port ${port}`));
});