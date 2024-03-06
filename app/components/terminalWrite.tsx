import { useState, useEffect, useRef, KeyboardEvent } from "react";
import useFunctionCaller from "../hooks/callFunction";
import useAuthStore from '../store/authStore';

const TerminalWrite = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	//keyboard movements
	const [commands, setCommands] = useState<string[]>([]);
	const [currentCommandIndex, setCurrentCommandIndex] = useState<number>(-1);

	const [input, setInput] = useState<string>("");
	const [output, setOutput] = useState<string>("");

	const [authUser, setAuthUser] = useState<string>("");

	const [isSecondEffectFinished, setIsSecondEffectFinished] = useState<boolean>(true);

	interface UpdatedLine {
		girdi: string[];
		cikti: string[];
	}
	const [line, setLine] = useState<UpdatedLine>({ girdi: [], cikti: [] });

	const { user } = useAuthStore();
	const { callFunction } = useFunctionCaller()

	useEffect(() => {
		if (isSecondEffectFinished) {
			if (user) {
				setAuthUser(user?.email + ">")

				const updatedLine = {
					girdi: [...line.girdi, authUser.length ? authUser : user?.email + ">"],
					cikti: [...line.cikti, output],
				}
				setLine((prevPrefixes) => ({
					...prevPrefixes,
					...updatedLine
				}));
			} else {
				setAuthUser("username:~$ Person>")
				
				const updatedLine = {
					girdi: [...line.girdi, authUser.length ? authUser : "username:~$ Person>"],
					cikti: [...line.cikti, output],
				}
				setLine((prevPrefixes) => ({
					...prevPrefixes,
					...updatedLine
				}));
			}

			setOutput("");
			setIsSecondEffectFinished(false);

		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user, isSecondEffectFinished, authUser]);

	useEffect(() => {
		if (output) {
			const callF = async () => {
				await callFunction({ output, setIsSecondEffectFinished, line, setLine });
			}
			callF();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [output]);

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Enter") {
			setOutput(input);

			setCommands((prevCommands) => [...prevCommands, input]);
			setCurrentCommandIndex(commands.length + 1); // Reset the command index
			setInput("");
		} else if (e.key === "ArrowUp") {
			if (currentCommandIndex === -1 && commands.length > 0) {
				setCurrentCommandIndex(commands.length - 1);
				setInput(commands[commands.length - 1]);
			} else if (currentCommandIndex >= 0) {
				const newIndex = currentCommandIndex - 1;
				if (newIndex >= 0) {
					setInput(commands[newIndex]);
					setCurrentCommandIndex(newIndex);
				}
			}
			handleOuterDivClick()
		} else if (e.key === "ArrowDown") {
			if (
				currentCommandIndex >= 0 &&
				currentCommandIndex < commands.length - 1
			) {
				const newIndex = currentCommandIndex + 1;
				setInput(commands[newIndex]);
				setCurrentCommandIndex(newIndex);
			} else if (currentCommandIndex === commands.length - 1) {
				setInput("");
				setCurrentCommandIndex(-1);
			}
		}
	};

	const handleOuterDivClick = () => {
		if (inputRef.current) {
			// Use the existing input value
			const inputValue = inputRef.current?.value;

			// Set the cursor position to the end
			inputRef.current.setSelectionRange(inputValue.length, inputValue.length);

			// Focus on the input
			inputRef.current.focus();
		}
	};

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
		<div className="w-full h-full bg-black overflow-auto md:overflow-y-auto" onClick={handleOuterDivClick}
		>
			<div className="flex flex-col bg-black pl-2">
				<p className="mt-2 ml-2">Codify version 1.0</p>
				{Array.isArray(line.girdi) &&
					line.girdi.map((item, idx) => (
						<div key={idx} className="flex flex-col pb-2">
							<div className="flex items-center">
								<span className=" ml-2 text-green-600 flex-shrink-0">
									{item}
								</span>
								<span className="ml-2">{line.cikti[idx]}</span>
							</div>
						</div>
					))}
				<div className="flex items-center bg-yellow-400">
					<span className="text-green-600 ml-2" style={{ flexShrink: 0 }}>
						{authUser}
					</span>
					<input
						ref={inputRef}
						className="input-cursor ml-2 bg-black focus:outline-none font-sans flex-grow"
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyDown={handleKeyDown}
					/>
				</div>
			</div>
		</div>
	);
};

export default TerminalWrite;
