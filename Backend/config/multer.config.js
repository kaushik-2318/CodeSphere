const FirebaseStorage = require("multer-firebase-storage");
const fbAdmin = require("./firebase.config");
const serviceCredentials = require("../etc/secrets/codesphere-7627c-firebase-adminsdk-lu3xr-000ca3eddd.json");
const multer = require("multer");

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/jpg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("Only JPEG, JPG, and PNG files are allowed"), false);
  }
};

const storage = FirebaseStorage({
  bucketName: "codesphere-7627c.appspot.com",
  credentials: fbAdmin.credential.cert(serviceCredentials),
  unique: true,
  public: true,
});

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

module.exports = upload;
