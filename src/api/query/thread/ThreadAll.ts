import { RandomOrder } from './../../helpers/RandomOrder';
import prisma from "../../../../prisma";

export const allThreadQuery = async (skip: number) => {
  const randomPick = (values: string[]) => {
		const random = Math.floor(Math.random() * values.length);
		return values[random];
	}
	const orderBy = randomPick(['id', 'description', 'createAt' ,'updateAt']);
	const orderRandom = randomPick([`asc`, `desc`]);

	// RandomOrder(
	// 	['id', 'description', 'createAt', 'updateAt'], [`asc`, `desc`])
 const thread = await prisma.thread.findMany({
		skip,
		take: 12,
		orderBy: { [orderBy]: orderRandom },
		where: {
			NOT: {
				id: "desc"
			}
		},
		include: {
			author: { select: { displayName: true, username:true } },
			_count: {
				select: { commentThread: true, saveThread: true, likeThread: true },
			},
		},
 });
  return thread
}