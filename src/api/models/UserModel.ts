import { validationProfile, validationProfileUpdate, validationSignOut } from "./../validations/UserValidation";

import prisma from "../../../prisma";
import { validationSignIn, validationSignup } from "../validations/UserValidation";
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
	if ((await validationSignup(username, email, password)) === -1) return "Fields cannot be empty";

	if ((await validationSignup(username, email, password)) === -2) return "Please input valid email";

	if ((await validationSignup(username, email, password)) === -3) return "There is already a user using it";

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
	if ((await validationSignOut(id)) === -1) return "Timeout account, please login";

	const signout = await prisma.session.deleteMany({
		where: {
			userId: id,
		},
	});

	return signout;
};

export const Myprofile = async (userId: string) => {
	const user = await prisma.user.findUnique({
		where: { id: userId },
		select: { displayName: true, username: true, bio: true },
	});
	return user;
};

export const profile = async (username: string) => {
	if ((await validationProfile(username)) === -1) return "Username can't be empty";
	if ((await validationProfile(username)) === -2) return "Username not found";

	const user = await prisma.user.findUnique({ where: { username } });
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
