// import prisma from "../../../prisma";

export class TemplateQuery {
	selectObject: any = [];
	whereObject: any = [];
	includeObject: any = [];
	dataObject: any = [];
	countObject: any = [];

	query: any = [];

	select(values: any) {
		let valuesCount: any = [];

		values.map((key: any) => {
			valuesCount.push({
				[key]: true,
			});
		});

		valuesCount = Object.assign({}, ...valuesCount);

		this.selectObject = {
			select: valuesCount,
		};

		this.query.push(this.selectObject);

		return this.selectObject;
	}

	include(includes: any) {
		let includeC: any = [];

		includeC = Object.assign({}, ...includes);

		this.includeObject = {
			include: includeC,
		};

		this.query.push(this.includeObject);
	}

	count(include: any) {
		this.countObject = {
			_count: this.select(include),
		};

		this.query.push(this.countObject);

		return this.countObject;
	}

	keyObject(key: string, value: any) {
		let values: any = [];
		values = Object.assign({}, ...value);

		return { [key]: values };
	}

	where(obj: any) {
		console.log(obj);
		// this.whereObject = {
		// 	where: this.keyObject(key, value),
		// };

		// this.query.push(this.keyObject(key, value));

		// return this.whereObject;
	}

	generate() {
		let combineSelect: any = [];
		let combineCount: any = [];
		let combineInclude: any = [];
		let combineWhere: any = [];

		for (let i = 0; i < this.query.length; i++) {
			if (this.query[i]["select"]) {
				combineSelect.push(this.query[i]["select"]);
			}
			if (this.query[i]["_count"]) {
				combineCount.push(this.query[i]["_count"]);
			}
			if (this.query[i]["include"]) {
				combineInclude.push(this.query[i]["include"]);
			}
			// if (this.query[i]["where"]) {
			// 	combineWhere.push(this.query[i]["where"]);
			// }
		}

		this.selectObject = {
			select: Object.assign({}, ...combineSelect),
		};

		this.countObject = {
			_count: Object.assign({}, ...combineCount),
		};

		this.includeObject = {
			include: Object.assign({}, ...combineInclude),
		};

		// this.whereObject = {
		// 	where: Object.assign({}, ...combineWhere),
		// };

		this.query = {};
		if (this.selectObject && !this.include) this.query = { ...this.selectObject, ...this.query };
		if (this.whereObject) this.query = { ...this.whereObject, ...this.query };
		if (this.countObject && !this.include) this.query = { ...this.countObject, ...this.query };
		if (this.includeObject) this.query = { ...this.includeObject, ...this.query };

		// this.query = { ...this.selectObject, ...this.countObject, ...this.includeObject };

		console.log(JSON.stringify(this.query, null, 4));
	}
}
