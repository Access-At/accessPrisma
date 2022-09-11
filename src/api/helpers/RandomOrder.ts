export const RandomOrder = (orderBy: any, randomOrder:any) => {
   const randomPick = (values: string[]) => {
		const random = Math.floor(Math.random() * values.length);
		return values[random];
	}
	const orderByData = randomPick(orderBy);
  const orderRandomData = randomPick(randomOrder);

	return {orderByData: [], orderRandpmData: []}
}