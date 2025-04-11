import multer from "multer"
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads")
  },
  filename(req, file, cb) {
    const id = uuid()

    const extName = file.originalname.split(".").pop();

    const fileName = `${id}.${extName}`;

    cb(null, fileName)
  },
});

export const uploadfiles = multer({ 
  storage, 
  limits: { fileSize: 50 * 1024 * 1024 }, 
}).single("file");