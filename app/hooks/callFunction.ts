import useSignup from "./useSignup";
import useLogin from "./useLogin";
import useLogout from "./useLogout";
import useSend from "./useSend";
import React from "react";

const useFunctionCaller = () => {

	const { signup } = useSignup();
	const { login } = useLogin();
	const { logout } = useLogout();
	const { send } = useSend();

	interface Line {
		girdi: string[];
		cikti: string[];
	}

	interface CallFunc {
		output: string,
		setIsSecondEffectFinished: React.Dispatch<React.SetStateAction<boolean>>,
		line: Line,
		setLine: React.Dispatch<React.SetStateAction<Line>>
	}

	const callFunction = async ({ output, setIsSecondEffectFinished, line, setLine }: CallFunc) => {

		const functionMap = {
			login: login,
			signup: signup,
			logout: logout,
			send: send,
			//clear: clear,
		};

		if (output === "clear") {	//TODO not working as fully expected but ..
			//setPrefix(prefix.slice(prefix.length - 1));
			setLine({
				girdi: line.girdi.slice(line.girdi.length),
				cikti: line.cikti.slice(line.cikti.length),
			});
		}
		if (output === "change") {	//TODO change with strong logic func.
			/* if (prefix[prefix.length - 1] === "changedVal") {
				setPrefix((prev) => [...prev.slice(0, -1), "changedVal2"]);
			} else {
				setPrefix((prev) => [...prev.slice(0, -1), "changedVal"]);
			} */

			/* setLine((prevLine) => {
				const updatedGirdi = prevLine.girdi[prevLine.girdi.length - 1] === "changedVal"
					? [...prevLine.girdi.slice(0, -1), "changedVal2"]
					: [...prevLine.girdi.slice(0, -1), "changedVal"];

				return {
					...prevLine,
					girdi: updatedGirdi,
				};
			}); */	
		}
		const matches = output.match(/([a-zA-Z0-9_]+)\((.*)\)/);
		if (matches) {
			const functionName = matches[1];
			const propsString = matches[2];
			const props = parsePropsString(propsString);

			// Check if the function name exists in the function map
			if (functionName in functionMap) {
				const func = functionMap[functionName];
				if (functionName === "send") {
					await func(propsString);
				} else {
					await func(props);
				}
				// func(mutate, data, props); // Call the corresponding function with props
			}
		}
		setIsSecondEffectFinished(true)

		return null;
	};

	const parsePropsString = (propsString) => {
		const propsArray = propsString.split(",").map((prop) => {
			const trimmedProp = prop.trim();

			if (
				(trimmedProp.startsWith('"') && trimmedProp.endsWith('"')) ||
				(trimmedProp.startsWith("'") && trimmedProp.endsWith("'"))
			) {
				// Check if it's a string value
				return trimmedProp.slice(1, -1); // Remove the surrounding quotes
			}

			if (!isNaN(trimmedProp)) {
				// Check if it's a number value
				return Number(trimmedProp);
			}

			return trimmedProp; // If the value doesn't match any recognized type, return it as is
		});

		return propsArray;
	};

	return { callFunction }
}

export default useFunctionCaller;
