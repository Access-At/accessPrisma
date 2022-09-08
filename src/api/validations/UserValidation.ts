import prisma from "../../../prisma";
import bcrypt from "bcrypt";
import validator from "validator";

export const validationSignIn = async (username: string, password: string) => {
  if (!username || !password) return -1;
  const user = await prisma.user.findUnique({ where: { username } });

  if (!user) return -2;
  const compare = bcrypt.compareSync(password, user?.password || "");

  if (!compare) return -3;
};

export const validationSignup = async (
  username: string,
  email: string,
  password: string
) => {
  if (!username || !password || !email) return -1;

  if (!validator.isEmail(email)) return -2;

  const user = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
  });

  if (user) return -3;
};

export const validationSignOut = async(
  id:string
) => {
  const token = await prisma.session.findFirst({
    where: {
      userId: id
    }
  })
  if (!token) return -1
  const users = await prisma.session.findFirst({
    where: { 
      userId : id
    }
  });
  
  return users
}
