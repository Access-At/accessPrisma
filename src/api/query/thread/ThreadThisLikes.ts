import prisma from "../../../../prisma";

export const ThreadThisDisLike = async (threadId:string, userId: string) => {
  const disLike = await prisma.likeThread.deleteMany({
			where: {
				AND: [
					{
						threadId,
					},
					{
						userId,
					},
				],
			},
		});
		return disLike;
}
export const ThreadThisLikes = async (threadId:string, userId: string) => {
  const threadLike = await prisma.likeThread.create({
		data: {
			threadId,
			userId,
		},
	});
  return threadLike
}