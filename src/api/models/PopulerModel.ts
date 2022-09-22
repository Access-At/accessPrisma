import prisma from "../../../prisma";

export const populer = async () => {
	// const _threadViews = await prisma.thread.findMany({
	// 	take: 5,
	// 	select: {
	// 		id: true,
	// 		_count: {
	// 			select: {
	// 				viewThread: true,
	// 			},
	// 		},
	// 	},
	// 	orderBy: {
	// 		viewThread: {
	// 			_count: "desc",
	// 		},
	// 	},
	// });

	// const threadView = await prisma.thread.findMany({
	// 	select: {
	// 		id: true,
	// 		author: {
	// 			select: {
	// 				displayName: true,
	// 			},
	// 		},
	// 		_count: {
	// 			select: {
	// 				viewThread: true,
	// 			},
	// 		},
	// 	},
	// 	where: {
	// 		id: {
	// 			in: _threadViews.filter(({ _count }) => _count.viewThread < 50).map(x => x.id),
	// 		},
	// 	},
	// });

	// showcase
	const _showcaseViews = await prisma.showCase.findMany({
		take: 5,
		select: {
			id: true,
			_count: {
				select: {
					viewShowcase: true,
				},
			},
		},
		
		orderBy: {
			viewShowcase: {
				_count: "desc",
			},
		},
	});

	const PopulerShowcase = await prisma.showCase.findMany({
		select: {
			id: true,
			slug: true,
			title: true,
			_count: {
				select: {
					viewShowcase:true
				}
			}
		},
		where: {
			id: {
				in: _showcaseViews.filter(({ _count }) => _count.viewShowcase > 25).map(x => x.id),
			},
		},
	});
	return { PopulerShowcase };
};
