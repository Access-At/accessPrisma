import multer from 'multer'
import path from 'path'


const storage = multer.diskStorage({
    destination: function (req: any, file: any, cb: any) {
        cb(null, `public/profiles/`)
    },
    
    filename: function (req: any, file: any, cb: any) {
        const paths = path.extname(file.originalname).substr(1);
        cb(null, new Date().toISOString().replace(/:/g, "-") + "." + paths);
    }
});
const fileFilter = (req: any,file: any,cb: any) => {
    if(file.mimetype === "image/jpg"  || 
       file.mimetype ==="image/jpeg"  || 
       file.mimetype ===  "image/png"){
     
    cb(null, true);
   }else{
      cb(new Error("Image uploaded is not of type jpg/jpeg or png"),false);
   }
}

const upload = multer({storage: storage, fileFilter : fileFilter});

export default upload
