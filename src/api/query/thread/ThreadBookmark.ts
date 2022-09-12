import prisma from "../../../../prisma";

export const ThreadAllBookmark = async (threadId:string, userId:string) => {
  const savedBookmark = await prisma.saveThread.deleteMany({
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
  return savedBookmark
}
export const ThreadAllSaved = async (threadId:string, userId:string) => {
  const threadSave = await prisma.saveThread.create({
		data: {
			threadId,
			userId,
		},
  });
  
  return threadSave
}

