import prisma from "../../../prisma";
import {
  validationSignIn,
  validationSignup,
} from "../validations/UserValidation";
import bcrypt from "bcrypt";

export const singIn = async (username: string, password: string) => {
  if ((await validationSignIn(username, password)) === -1)
    return "Username or password cannot be empty";

  if ((await validationSignIn(username, password)) === -2)
    return "Cannont find username";

  if ((await validationSignIn(username, password)) === -3)
    return "Invalid password";

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

export const signUp = async (
  username: string,
  email: string,
  password: string
) => {
  if ((await validationSignup(username, email, password)) === -1)
    return "fields cannot be empty";

  if ((await validationSignup(username, email, password)) === -2)
    return "Please input valid email";

  if ((await validationSignup(username, email, password)) === -3)
    return "there is already a user using it";

  const hash = await bcrypt.hash(password, 10);
  const users = await prisma.user.create({
    data: {
      username,
      email,
      password: hash,
    },
  });

  return users;
};
