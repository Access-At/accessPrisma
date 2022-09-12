import prisma from "../../../../prisma";

export const ThreadUserComment = async (threadId:string, userId:string, description:string) => {
  const threadComment = await prisma.commentThread.create({
		data: {
			threadId,
			userId,
			description,
		},
  });
  
  return threadComment
}

