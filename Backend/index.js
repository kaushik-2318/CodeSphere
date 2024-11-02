require("dotenv").config();

const express = require("express");
const mongooseconnection = require("./config/mongoose.config");
const path = require("path");
const cors = require("cors");

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();

app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
// app.use(morgan('dev'));

const contactRouter = require("./routes/contact.routes");
const authRouter = require("./routes/auth.routes");
const profileRouter = require("./routes/profile.routes");
const templaterRouter = require("./routes/template.routes");
const verificationRouter = require("./routes/verification.routes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/image', express.static(path.join(__dirname, 'public')));

mongooseconnection();

app.use("/email", contactRouter);
app.use("/auth", authRouter);
app.use("/profile", profileRouter);
app.use("/template", templaterRouter);
app.use("/verification", verificationRouter)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
