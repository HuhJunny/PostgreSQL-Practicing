import multer from "multer";

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Buffer.from(file.originalname, "latin1").toString("utf8");
    cb(null, uniqueName);
  },
});

export const upload = multer({ storage });