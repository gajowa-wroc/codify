import { useState, useEffect } from 'react'
import { callFunction } from '~/helper/callFunction';

const TerminalWrite = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState();
    const [commands, setCommands] = useState([]);
    const [currentCommandIndex, setCurrentCommandIndex] = useState(-1);


   const prefix = 'Username$/Person>'

    useEffect(() => {
        if (output) {
            callFunction(output)

            setOutput("")
        }
    }, [output, prefix])

    const handleKeyDown = (e: any) => {
        if (e.key === "Enter") {
            setOutput(input)
            setCommands(prevCommands => [...prevCommands, input]);
            setCurrentCommandIndex(commands.length + 1); // Reset the command index
            setInput("")
        } else if (e.key === 'ArrowUp') {
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
        } else if (e.key === 'ArrowDown') {
            if (currentCommandIndex >= 0 && currentCommandIndex < commands.length - 1) {
                const newIndex = currentCommandIndex + 1;
                setInput(commands[newIndex]);
                setCurrentCommandIndex(newIndex);
            } else if (currentCommandIndex === commands.length - 1) {
                setInput('');
                setCurrentCommandIndex(-1);
            }
        }
    }

    return (
        <div className='w-full h-full bg-black overflow-auto md:overflow-y-auto'>
            <div className='flex flex-col bg-black pl-2'>
                <p className='pt-2'>Codify version 1.0</p>

                <div className="input-prefix">
                    <span className="prefix">{prefix}</span>
                    <input className='input-cursor bg-black focus:outline-none font-sans w-full'
                        type='text'
                        value={input}
                        onChange={e => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                </div>

            </div>
        </div>
    )
}

export default TerminalWrite
