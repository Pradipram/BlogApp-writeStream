import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from "dotenv";
dotenv.config();

const storage = new GridFsStorage({
    url: process.env.MONGODB_URI,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        // console.log("function is called ", file);
        const match = ["image/png", "image/jpg","image/jpeg"];

        if(match.indexOf(file.mimetype) === -1) {
            // console.log("inside upload.js file printing file.memetype ", file.mimetype);
            return`${Date.now()}-blog-${file.originalname}`;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}`
        }
    }
});

export const upload = multer({storage});