import prisma from "../../../prisma";

export const populer = async () => {
	const _threadViews = await prisma.thread.findMany({
		take: 5,
		select: {
			id: true,
			_count: {
				select: {
					viewThread: true,
				},
			},
		},
		orderBy: {
			viewThread: {
				_count: "desc",
			},
		},
	});

	const threadView = await prisma.thread.findMany({
		select: {
			id: true,
			author: {
				select: {
					displayName: true,
				},
			},
			_count: {
				select: {
					viewThread: true,
				},
			},
		},
		where: {
			id: {
				in: _threadViews.filter(({ _count }) => _count.viewThread < 50).map(x => x.id),
			},
		},
	});

	console.log(threadView);

	// const [showcasePopuler threadPopuler] = await prisma.$transaction([
	// 	prisma.showCase.findMany({
	// 		take: 5,
	// 		orderBy: {
	// 			viewShowcase: {
	// 				_count: "desc",
	// 			},
	// 		},
	// 	}),
	// ]);

	// const threadPopuler = await prisma.thread.groupBy({
	// 	by: [""],
	// 	_count: {
	// 		_all: true,
	// 	},
	// });

	return threadView;
};
