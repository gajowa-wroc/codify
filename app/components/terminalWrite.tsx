import { useState, useEffect, useRef } from "react";
import { callFunction } from "~/helper/callFunction";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "~/firebase/firebase";

const TerminalWrite = () => {
    const [input, setInput] = useState("");
    const [prefix, setPrefix] = useState("username:~$ Person>");
    const [array, setArray] = useState([]);
    const [output, setOutput] = useState("");
    const [commands, setCommands] = useState([]);
    const [currentCommandIndex, setCurrentCommandIndex] = useState(-1);
    const inputRef = useRef(null);
    const [prefixArray, setPrefixArray] = useState(["username:~$ Person>"]);

    useEffect(() => {
		/*const unsubscribe =*/ onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid;
            console.log("user is signed in", uid);
            setPrefix(user.email || "username:~$ Person");

            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/auth.user
            // ...
        } else {
            // User is signed out
            console.log("user is signed out");
            setPrefix("username:~$ Person>");
        }
    });

        //return () => unsubscribe(); // Cleanup function
    }, []);

    useEffect(() => {
        const a = async () => {
            if (output) {
                await callFunction(output, setArray, setPrefixArray, prefixArray);
                setPrefixArray((prev) => [...prev, prefix]);
                setArray((prev) => [...prev, output]);

                setOutput("");
            }
        };
        a();
    }, [output]);

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            setOutput(input);
            if (input !== "") {
                //	setPrefix((prev) => [...prev, prefix[prefix.length - 1]]);
            }
            console.log(prefix);
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
            const inputValue = inputRef.current.value;

            // Set the cursor position to the end
            inputRef.current.setSelectionRange(inputValue.length, inputValue.length);

            // Focus on the input
            inputRef.current.focus();
        }
    };

    return (
        <div
            className="w-full h-full bg-black overflow-auto md:overflow-y-auto"
            onClick={handleOuterDivClick}
        >
            <div className="flex flex-col bg-black pl-2">
                <p className="mt-2 ml-2">Codify version 1.0</p>
                {Array.isArray(array) &&
                    array.map((item, idx) => (
                        <div key={idx} className="flex flex-col pb-2">
                            <div className="flex items-center">
                                <span className=" ml-2 text-green-600 flex-shrink-0">
                                    {prefixArray[idx]}
                                </span>
                                <span className="ml-2">{item}</span>
                            </div>
                        </div>
                    ))}
                <div className="flex items-center">
                    <span className="text-green-600 ml-2" style={{ flexShrink: 0 }}>
                        {prefixArray[prefixArray.length - 1]}
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
