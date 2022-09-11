import prisma from "../../../../prisma";

export const ThreadCreate = async (authorId:string, description: string) => {
 const thread = await prisma.thread.create({
		data: {
			authorId,
			description,
		},
	});
  return thread
}