interface ClearFuncType {
	setPrefix: React.Dispatch<React.SetStateAction<string>>,
	prefix: string,
}

export const clear = ({ setPrefix, prefix }: ClearFuncType) => {
	setPrefix(prefix.slice(prefix.length - 1));
};
