const multer = require('multer');

// module.exports = (imageName) => {
//   return (req, res, next) => {
//     const storage = multer.diskStorage({
//       destination: function (req, file, cb) {
//         cb(null, './uploads/');
//       },
//       filename: function (req, file, cb) {
//         cb(null, `${new Date().getTime()}-${file.originalname}`);
//       },
//     });

//     const upload = multer({ storage });
//     upload.single(imageName);
//     next();
//   };
// };

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});

// The limit upload file size is 1MB.
const limits = { fileSize: 1024 * 1024 };

module.exports = {
  storage,
  limits,
};
