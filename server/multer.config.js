import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/imgs/')
    },
    filename: function (req, file, cb) {
      let photoName = file.originalname + '-' + Date.now() + path.extname(file.originalname);
      req.body.photoName = photoName;
      cb(null, photoName)
    }
})

const checkFileType = (file, cb) => {
  // Allowed ext
  const filetypes = /jpeg|jpg|png/;
  // Check ext
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimetype = filetypes.test(file.mimetype);

  if(mimetype && extname){
    return cb(null,true);
  } else {
    return cb(null, false);    
  }
}
  
export const upload = multer({ storage: storage,
  fileFilter: function(_req, file, cb){
    checkFileType(file, cb);
  } 
})