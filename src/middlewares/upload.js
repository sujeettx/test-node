import multer from "multer";
import path from "path";
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,path.join('./uploads/'))
    },
    filename: function(req,file,cb){
        const uniqeName = `${Date.now()}-${Math.round(Math.random()*1E9)}${path.extname(file.originalname)}`;
        cb(null,uniqeName)
    }
})

const upload = multer({
    storage:storage,
    limits:{fileSize:1000000*5}
})
export default upload;