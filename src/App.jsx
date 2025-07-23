
import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  
  const [length, setLength ] = useState(8);
  const [allowedNumber , setAllowedNumber] = useState(false);
  const [allowedChar, setAllowedChar] = useState(false);
  const [Password, setPassword] = useState("");

  const passwordGenrater = useCallback (()=>{
    let pass = " ";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let num = "0123456789";
    let char = "!@#$%^&*";

    if(allowedNumber) {
      str += num;
    } 
    if(allowedChar) {
      str += char;
    }

    for(let i = 1; i <= length; i++){
       
      pass += str.charAt(Math.floor(Math.random()* str.length + 1));

    }

    setPassword(pass);
    document.getElementById('copy-password').innerHTML = "Copy"

  }, [length, allowedNumber, allowedChar, setPassword])

  const copyPassword = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(Password)
    document.getElementById("copy-password").innerHTML = "Copied"
  }, [Password])

  useEffect (() => {
    passwordGenrater();
  },[length, allowedNumber, allowedChar, setPassword , passwordGenrater]);

  // useRef hook

  const passwordRef =  useRef(null)







 return (
  <>
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
      <div className='w-full max-w-md shadow-md rounded-lg px-4 py-6 text-orange-500 bg-gray-700'>
        <h3 className="text-center text-lg font-bold mb-4">Password Generator</h3>

        <div className='flex shadow rounded-lg overflow-hidden mb-5'>
          <input 
            type="text" 
            value={Password}
            className='outline-none w-full py-1 px-3'
            placeholder='password'
            ref={passwordRef}
            readOnly
          />
          <button 
            id='copy-password'
            onClick={copyPassword}
            className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'>
            Copy
          </button>
        </div>

        <div className='flex flex-col gap-y-4 text-sm'>
          <div className='flex items-center gap-x-2'>
            <input 
              type="range" 
              min={5}
              max={100}
              value={length}
              className='cursor-pointer'
              onChange={(e) => { setLength(e.target.value); }}
            />
            <label> Length: {length}</label>
          </div>

          <div className='flex items-center gap-x-3'>
            <input 
              type="checkbox" 
              checked={allowedNumber}
              onChange={() => setAllowedNumber(prev => !prev)}
              className='cursor-pointer'
            />
            <label> Number</label>

            <input 
              type="checkbox" 
              checked={allowedChar}
              onChange={() => setAllowedChar(prev => !prev)}
              className='cursor-pointer'
            />
            <label> Character</label>
          </div>
        </div>
      </div>
    </div>
  </>
)

}

export default App
