import React, { useCallback, useEffect, useState, useRef } from "react";

function PasswordGenerator() {
  const [length, setLength] = useState(8);
  const [password, setPassword] = useState("");
  const [specCharAllowed, setSpecAharAllowed] = useState(false);
  const [numberAllowed, setNumberAllowed] = useState(false);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "1234567890";
    if (specCharAllowed) str += " !@#$%^&*()_-+=";

    for (let i = 0; i <= length; i++) {
      let chara = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(chara);
    }
    setPassword(pass);
  }, [length, specCharAllowed, numberAllowed]);

  useEffect(() => {
    passwordGenerator();
  }, [passwordGenerator]);

  const passwordRef = useRef(null);
  const copyTextTOInput = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <div>
      <div className="bg-black min-h-screen flex justify-center items-start text-orange-400">
        <div className="bg-gray-200 w-137.5 p-6 mt-20 rounded">
          <p className=" text-center m-4 text-2xl ">Password Generator</p>
          <div className="flex">
            <input
              className="bg-white rounded w-full h-10 pointer-coarse"
              type="text"
              value={password}
              placeholder="Password"
              readOnly
              ref={passwordRef}
            />
            <button
              className="bg-blue-500 text-white  h-10 outline-none rounded px-3 py-2"
              onClick={copyTextTOInput}
            >
              Copy
            </button>
          </div>
          <div>
            <input
              className="m-4"
              type="range"
              id="lengthInput"
              min="8"
              max="20"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label htmlFor="lengthInput">Length: {length}</label>

            <input
              className="m-4"
              type="checkbox"
              id="numberInput"
              onClick={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Number</label>

            <input
              className="m-4"
              type="checkbox"
              id="char"
              onClick={() => {
                setSpecAharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="char">Character</label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PasswordGenerator;
