import { useState, useEffect, useRef } from 'react'
import { callFunction } from '~/helper/callFunction';

const TerminalWrite = () => {
  const [input, setInput] = useState('');
  const [array, setArray] = useState([])
  const [output, setOutput] = useState('');
  const [commands, setCommands] = useState([]);
  const [currentCommandIndex, setCurrentCommandIndex] = useState(-1);
  const inputRef = useRef(null);


  const prefix = 'username:~$ Person>'

  useEffect(() => {
    if (output) {
      setArray(prev => [...prev, prefix + output])
      callFunction(output, setArray)

      setOutput('')
    }
  }, [output, prefix, array])

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
    <div className='w-full h-full bg-black overflow-auto md:overflow-y-auto' onClick={handleOuterDivClick}>
      <div className='flex flex-col bg-black pl-2'>
        <p className='pt-2'>Codify version 1.0</p>
        {Array.isArray(array) &&
          array.map((item, idx) => (
            <div key={idx} className='flex flex-col pb-2'>
              <span>{item}</span>
            </div>
          ))}
        <div className="flex items-center">
          <span className="prefix" style={{ flexShrink: 0 }}>{prefix}</span>
          <input
            ref={inputRef}
            className='input-cursor bg-black focus:outline-none font-sans flex-grow'
            type='text'
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
      </div>
    </div>
  );
};

export default TerminalWrite
