import prisma from "../../../../prisma";

export const ThreadCreate = async (authorId: string, description: string) => {
	if(description.length > 1000) return "This thread is too long a maximum of 1000 characters"
 	const thread = await prisma.thread.create({
		data: {
			authorId,
		description,
		},
	});
  return thread
}
