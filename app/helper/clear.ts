export const clear = (setArray, setPrefixArray, prefixArray) => {
	setPrefixArray(prefixArray.slice(prefixArray.length - 1));
	setArray([]);
};
