import prisma from "../../../../prisma";

export const ThreadUpdated = async (threadId:string,description:string) => {
  const update = await prisma.thread.update({
		where: { id: threadId },
		data: {
			description,
		},
	});
  
  return update
}

