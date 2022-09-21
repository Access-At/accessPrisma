import prisma from "../../../prisma";
import {
	validationSignIn,
	validationSignup,
	validationChangePassword,
	validationChangeImage,
	validationProfile,
	validationProfileUpdate,
	validationSignOut,
} from "../validations/UserValidation";
import bcrypt from "bcrypt";

export const signIn = async (username: string, password: string) => {
	if ((await validationSignIn(username, password)) === -1) return "Username or password cannot be empty";

	if ((await validationSignIn(username, password)) === -2) return "Can't find username";

	if ((await validationSignIn(username, password)) === -3) return "Invalid password";

	const userToken = await prisma.user.findFirst({ where: { username } });
	const token = await prisma.session.create({
		data: {
			userId: userToken?.id || "",
		},
		select: {
			token: true,
			userId: true,
		},
	});

	return token;
};

export const signUp = async (username: string, email: string, password: string) => {
	if ((await validationSignup(username, email, password)) === -1) return "field cannot be empty, must be filled";

	if ((await validationSignup(username, email, password)) === -2) return "Please enter the correct email";

	if ((await validationSignup(username, email, password)) === -3) return "Use text characters without spaces";
	if ((await validationSignup(username, email, password)) === -4) return "There is already a user using it";

	if (username.length < 3) return "Username must be more than 3 characters";
	if (password.length < 8) return "Password must greater then 8 character";

	const hash = await bcrypt.hash(password, 10);
	const users = await prisma.user.create({
		data: {
			username,
			displayName: username,
			email,
			password: hash,
		},
	});

	return users;
};

export const signOut = async (id: string) => {
	if ((await validationSignOut(id)) === -1) return "Time is up, please login again";

	const signout = await prisma.session.deleteMany({
		where: {
			userId: id,
		},
	});

	return signout;
};

export const Myprofile = async (userId: string) => {
	const user = await prisma.user.findUniqueOrThrow({
		where: {
			id: userId,
		},
		select: {
			id: true,
			username: true,
			displayName: true,
			bio: true,
			profileImage: true,
			bannerImage: true,
			location: true,
			email: true,
			ShowCase: {
				where: {
					authorId: userId,
				},
				orderBy: {
					createAt: "desc",
				},
			},
			writeThread: {
				where: {
					authorId: userId,
				},
				orderBy: {
					createAt: "desc",
				},
			},
		},
	});
	return user;
};

export const profile = async (username: string) => {
	if ((await validationProfile(username)) === -1) return "Username can't be empty";
	if ((await validationProfile(username)) === -2) return "Username not found";
	const userId = await prisma.user.findFirst({
		where: { username },
		select: { id: true },
	});

	const user = await prisma.user.findFirstOrThrow({
		where: { username },
		select: {
			id: true,
			username: true,
			displayName: true,
			profileImage: true,
			bannerImage: true,
			bio: true,
			location: true,
			ShowCase: {
				where: {
					authorId: userId?.id,
				},
				orderBy: {
					createAt: "desc",
				},
			},
			writeThread: {
				where: {
					authorId: userId?.id,
				},
				orderBy: {
					createAt: "desc",
				},
			},
		},
	});
	return user;
};

export const profileUpdate = async (id: string, displayName: string, bio: string, location: string) => {
	if ((await validationProfileUpdate(id)) === -1) return "userId can't be empty";
	if ((await validationProfileUpdate(id)) === -2) return "User not found";

	const userId = await prisma.user.update({
		where: { id },
		data: {
			displayName,
			bio,
			location,
		},
	});
	return userId;
};

export const changePassword = async (id: string, password: string) => {
	if ((await validationChangePassword(id)) === -1) return "UserId can't be empty";
	if ((await validationChangePassword(id)) === -2) return "User not found";

	if (password.length < 8) return "Password must greater then 8 character";
	const hash = await bcrypt.hash(password, 10);
	const userId = await prisma.user.update({
		where: { id },
		select: {
			id: true,
			username: true,
			email: true,
			password: true,
		},
		data: {
			password: hash,
		},
	});

	return userId;
};

export const uploadProfileImage = async (id: string, profileImage: any, linked: any) => {
	if ((await validationChangeImage(id)) === -1) return "UserId can't be empty";

	// const deleteProfileImage = await prisma.user.findFirst({
	// 	where: { id },
	// 	select: {
	// 		profileImage: true,
	// 	},
	// });

	// if (deleteProfileImage?.profileImage) {
	// 	fs.unlinkSync(deleteProfileImage.profileImage);
	// }

	const linkUrlImage = profileImage.path.replace(/\\/g, "/").replace("public/", "");

	const changeProfileImage = await prisma.user.update({
		where: { id },
		select: {
			id: true,
			profileImage: true,
		},
		data: {
			profileImage: `${linked}/${linkUrlImage}`,
		},
	});

	return changeProfileImage;
};
export const uploadBannerImage = async (id: string, bannerImage: any, linked: any) => {
	if ((await validationChangeImage(id)) === -1) return "UserId can't be empty";

	const linkUrlImage = bannerImage.path.replace(/\\/g, "/").replace("public/", "");

	const changeBannerImage = await prisma.user.update({
		where: { id },
		select: {
			id: true,
			bannerImage: true,
		},
		data: {
			bannerImage: `${linked}/${linkUrlImage}`,
		},
	});

	return changeBannerImage;
};
