import fs from "fs";

export default function resize(path: any, format: any, width: any, height: any) {
	const readStream = fs.createReadStream(path);
	return readStream;
}
