const multer = require("multer");
const path = require("path");
const { S3Client } = require("@aws-sdk/client-s3");
const multerS3 = require('multer-s3')
const awsKey = process.env.AWS_ACCESS_KEY_ID
const awsSecret = process.env.AWS_SECRET_ACCESS_KEY

const s3Client = new S3Client({
  region: 'ap-southeast-2',
  credentials: {
    accessKeyId: awsKey,
    secretAccessKey: awsSecret,
  },
});

function fileUpload(req, res, next) {
  const storages3 = multerS3({
    s3: s3Client,
    bucket: process.env.AWS_BUCKET,
    acl: "public-read",
    metadata: (req, file, cb) => {
      cb(null, { fieldname: file.fieldname })
    },
    key: (req, file, cb) => {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname);
      cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    }
  })

  const upload = multer({
    storage: storages3,
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
    fileFilter: (req, file, cb) => {
      if (
        file.mimetype.startsWith("image/") ||
        file.mimetype.startsWith("video/")
      ) {
        cb(null, true);
      } else {
        cb(null, false);
      }
    },
  });

  upload.any()(req, res, (err) => {
    if (err) {
      return res.status(500).json({
        success: false,
        message: "Error uploading file",
        error: err.message,
      });
    }

    if (!req.files || req.files.length === 0) {
      return next();
    }

    const file = req.files[0];
    req.file = file;
    req.fileUrl = file.location
    req.fileType = file.mimetype.split("/")[0];

    next();
  });
}

module.exports = fileUpload;
