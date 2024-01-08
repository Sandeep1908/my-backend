import multer from "multer";

const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
       
        cb(null,'./public/temp')
    },
    filename:(req,file,cb)=>{
        console.log("file.originalname",file.originalname)
        cb(null,file.originalname)
    }
})

export const upload=multer({
    storage
})