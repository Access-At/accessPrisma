// import  path  from 'path';
// import multer from 'multer';
import { changePassword, uploadBannerImage, uploadProfileImage } from "./../models/UserModel";
import { profile, profileUpdate, Myprofile } from "../models/UserModel";
import { Response200, Response400 } from "../helpers/Response";

export const getMyProfile = async (req: any, res: any, next: any) => {
	const userId = res.get("userId");
	const profiles = await Myprofile(userId);

	if (typeof profiles === "string") return Response400(res, profiles);
	return Response200(res, profiles);
};

export const GetProfile = async (req: any, res: any, next: any) => {
	const { username } = req.params;
	const profiles = await profile(username);

	if (typeof profiles === "string") return Response400(res, profiles);
	return Response200(res, profiles);
};

export const GetUpdate = async (req: any, res: any, next: any) => {
	const userId = res.get("userId");
	const { displayName, bio, location } = req.body;
	const update = await profileUpdate(userId, displayName, bio, location);
	if (typeof update === "string") return Response400(res, update);
	// if (!req.file || !req.body) return Response400(res, "mencobalaksjdlkasjd");
	return Response200(res, profile);
};

export const getChangePassword = async (req: any, res: any, next: any) => {
	const userId = res.get("userId");
	const { password } = req.body;
	const updatePassword = await changePassword(userId, password);
	if (typeof updatePassword === "string") return Response400(res, updatePassword);
	return Response200(res, updatePassword);
};

export const getUpdateProfileImage = async (req: any, res: any, next: any) => {
	const userId = res.get("userId");
	const profileImage = req.file;
	const linked = `${req.protocol}://${req.get("host")}`;
	if (req.file === undefined) {
		return Response400(res, "lalala");
	} else {
		const updateProfileImage = await uploadProfileImage(userId, profileImage, linked);
		if (typeof updateProfileImage === "string") return Response400(res, updateProfileImage);
		return Response200(res, updateProfileImage);
	}
};
export const getUpdateBannerImage = async (req: any, res: any, next: any) => {
	const userId = res.get("userId");
	const bannerImage = req.file;
	const linked = `${req.protocol}://${req.get("host")}`;
	const updateBannerImage = await uploadBannerImage(userId, bannerImage, linked);
	if (typeof updateBannerImage === "string") return Response400(res, updateBannerImage);
	return Response200(res, updateBannerImage);
};
