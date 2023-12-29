import grid from 'gridfs-stream';
import mongoose from 'mongoose';
import user from '../model/user.js';
// import dotenv from "dotenv";

const url = process.env.BASE_URL;


let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once('open', () => {
    gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'photos'
    });
    gfs = grid(conn.db, mongoose.mongo);
    gfs.collection('photos');
});


// export const uploadImage = (request, response) => {
//     console.log("inside upload file function ",request.body);
//     if(!request.file) {
//         return response.status(404).json("File not found");
//     }
    
//     const imageUrl = `${url}/file/${request.file.filename}`;

//     response.status(200).json(imageUrl);    
// }

export const getImage = async (request, response) => {
    try {   
        const file = await gfs.files.findOne({ filename: request.params.filename });

        if (!file) {
            return response.status(404).json({ msg: "File not found" });
        }

        const readStream = gridfsBucket.openDownloadStream(file._id);
        readStream.pipe(response);
    } catch (error) {
        response.status(500).json({ msg: error.message });
    }
}

export const uploadImage = async(req,res) =>{
    try{
        if(!req.file){
            return res.status(404).json("File not found");
        }
        const match = ["image/png", "image/jpg","image/jpeg"];
        if(match.indexOf(req.file.mimetype) === -1) {
            res.status(400).json({msg:'Only Image of png, jpg and jped format is supported'});
        }
        else{
            // console.log(file);   
            // console.log('image is saved to the gridfs',req.file);
            // console.log(req.body.username,'image-controller',57);
            const imageUrl = `${url}/file/${req.file.filename}`;
            const updatedUser = await user.findOneAndUpdate({username:req.body.username},{bannerUrl : imageUrl},{new :true});
            console.log(updatedUser,'image-controller',61);
            res.status(200).json({updatedUser});
        }

    }
    catch(err){
        console.log(err,'image-controller',51);
        res.status(500).json({msg: err.message});
    }
}