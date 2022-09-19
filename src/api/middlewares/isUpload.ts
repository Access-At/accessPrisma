import multer from "multer";
import path from "path";

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
				whereFile = "showcase/";
				break;
			default:
				break;
		}

		cb(null, `public/${whereFile}`);
	},

	filename: function (req: any, file: any, cb: any) {
		const paths = path.extname(file.originalname).substr(1);
		let nameFile = "";

		switch (req.path) {
			case "/profile/change/profile":
				nameFile = "AVATAR";
				break;
			case "/profile/change/banner":
				nameFile = "BANNER";
				break;
			case "/showcase/create":
				nameFile = "SHOWCASE";
				break;
			default:
				break;
		}

		cb(null, `${nameFile}-${req.headers["userid"]}.${paths}`);
	},
});

const fileFilter = (req: any, file: any, cb: any) => {
	const allowExt = ["image/jpg", "image/jpeg", "image/png"];

	if (!allowExt.includes(file.mimetype)) cb(new Error("Image uploaded is not of type jpg/jpeg or png"), false);
	cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

export default upload;
