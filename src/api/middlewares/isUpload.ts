import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
	destination: function (req: any, file: any, cb: any) {
		let whereFile = "";

		switch (req.path) {
			case "/profile/change/profile":
				whereFile = "profiles/";
				break;
			case "/profile/change/banner":
				whereFile = "banner/";
				break;
			case "/showcase/create":
			case "/showcase/update":
				whereFile = "showcase/";
				break;
			default:
				break;
		}

		const fullpath = `public/${whereFile}`;
		if (!fs.existsSync(fullpath)) fs.mkdirSync(fullpath);
		cb(null, fullpath);
	},

	filename: function (req: any, file: any, cb: any) {
		const paths = "jpg";
		let nameFile = "";
		let id = req.headers["userid"] || req.headers["showcaseid"];

		switch (req.path) {
			case "/profile/change/profile":
				nameFile = "AVATAR";
				break;
			case "/profile/change/banner":
				nameFile = "BANNER";
				break;
			case "/showcase/create":
			case "/showcase/update":
				nameFile = "SHOWCASE";
				break;
			default:
				break;
		}

		cb(null, `${nameFile}-${id}.${paths}`);
	},
});

const fileFilter = (req: any, file: any, cb: any) => {
	const allowExt = ["image/jpg", "image/jpeg", "image/png"];

	if (!allowExt.includes(file.mimetype)) cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
	cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;

// export default = (req, res, next) => {
//   return upload.single('file')(req, res, () => {
//     // Remember, the middleware will call it's next function
//     // so we can inject our controller manually as the next()

//     if (!req.file) return res.json({ error: ErrorMessages.invalidFiletype })
//     next()
//   })
// };
