export const clear = (setArray, setPrefix, prefix) => {
	setPrefix(prefix.slice(prefix.length - 1));
	setArray([]);
};
