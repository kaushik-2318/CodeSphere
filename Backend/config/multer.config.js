const FirebaseStorage = require("multer-firebase-storage");
const fbAdmin = require("./firebase.config");

const serviceCredentials = {
  type: `${process.env.FIREBASE_TYPE}`,
  project_id: `${process.env.FIREBASE_PROJECT_ID}`,
  private_key_id: `${process.env.FIREBASE_PRIVATE_KEY_ID}`,
  private_key: process.env.FIREBASE_PRIVATE_KEY,
  client_email: `${process.env.FIREBASE_CLIENT_EMAIL}`,
  client_id: `${process.env.FIREBASE_CLIENT_ID}`,
  auth_uri: `${process.env.FIREBASE_AUTH_URI}`,
  token_uri: `${process.env.FIREBASE_TOKEN_URI}`,
  auth_provider_x509_cert_url: `${process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL}`,
  client_x509_cert_url: `${process.env.FIREBASE_CLIENT_X509_CERT_URL}`,
  universe_domain: `${process.env.FIREBASE_UNIVERSE_DOMAIN}`,
}

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
