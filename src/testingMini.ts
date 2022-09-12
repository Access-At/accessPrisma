import { TemplateQuery } from "./api/query/Template";

const obj = {
	id: "asdad",
};

const template = new TemplateQuery();
template.include([
	// template.keyObject("author", [template.select(["author", "displayName"])]),
	template.count(["user", "displayName"]),
]);

template.where([template.keyObject("Test", "asdadda")]),
	// template.select("displayName", true);
	// template.select("username", true);
	// template.select("bio", true);
	// template.select("user", true);
	template.generate();
