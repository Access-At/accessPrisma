// import { PrismaClient } from "@prisma/client";
import client from "../prisma";
import { faker } from "@faker-js/faker";

async function main() {
	if (process.env.NODE_ENV !== "development") return;

	await client.user.deleteMany({});
	await client.session.deleteMany({});
	await client.thread.deleteMany({});
	await client.likeThread.deleteMany({});
	await client.saveThread.deleteMany({});
	await client.commentThread.deleteMany({});

	for (let i = 0; i < 20; i++) {
		const name = faker.internet.userName();
		const user = await client.user.create({
			data: {
				email: faker.internet.email(),
				username: name,
				displayName: name,
				password: faker.internet.password(),
			},
		});

		const login = await client.session.create({
			data: {
				userId: user.id,
			},
		});

		const threads = await client.thread.create({
			data: {
				description: faker.lorem.paragraphs(2),
				authorId: user.id,
			},
		});

		await client.likeThread.create({
			data: {
				userId: user.id,
				threadId: threads.id,
			},
		});
		await client.saveThread.create({
			data: {
				userId: user.id,
				threadId: threads.id,
			},
		});
		await client.commentThread.create({
			data: {
				description: faker.lorem.paragraph(2),
				userId: user.id,
				threadId: threads.id,
			},
		});
	}
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => {
		client.$disconnect;
	});
