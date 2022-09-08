import prisma from "../../../prisma";
import bcrypt from "bcrypt";

export const getBannerImage = async (req: any, res: any, next: any) => {};

export const getUpdate = async (req: any, res: any, next: any) => {
  try {
    const hash = await bcrypt.hash(req.body.password, 10);
    const { id } = req.params;
    const user = await prisma.user.update({
      where: { id },
      data: {
        password: hash,
      },
      select: {
        email: true,
      },
    });
    return res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};
