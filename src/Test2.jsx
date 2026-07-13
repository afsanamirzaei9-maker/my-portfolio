// import React from 'react';

export default function Test() {
  return (
    <div className="min-h-screen bg-backgroundDark text-textDark p-lg font-english dark:bg-backgroundLight dark:text-textLight">
      
      {/* Typography */}
      <h1 className="text-4xl font-bold mb-md">Heading Example</h1>
      <p className="text-base mb-lg">Body text example in English font.</p>
      <p className="text-base font-persian mb-lg">متن نمونه با فونت فارسی.</p>

      {/* Buttons */}
      <div className="flex gap-md mb-lg">
        <button className="rounded bg-primary text-textDark px-md py-sm shadow-neon hover:bg-secondary transition-colors-opacity">
          Primary Button
        </button>
        <button className="rounded bg-secondary text-textLight px-md py-sm hover:bg-primary transition-colors-opacity">
          Secondary Button
        </button>
        <button className="transition-transform rounded-full p-sm bg-backgroundDark shadow-neon hover:scale-110">
          <span className="material-icons">home</span>
        </button>
      </div>

      {/* Inputs */}
      <div className="flex flex-col gap-md mb-lg">
        <input
          type="text"
          placeholder="Text Input"
          className="border rounded border-primary p-sm bg-backgroundDark text-textDark focus:outline-none focus:border-secondary"
        />
        <textarea
          placeholder="Textarea"
          className="border rounded border-secondary p-sm bg-backgroundDark text-textDark focus:outline-none focus:border-primary"
        />
      </div>

      {/* Switch Example */}
      <div className="flex items-center gap-md mb-lg">
        <label className="flex items-center cursor-pointer">
          <input type="checkbox" className="hidden peer" />
          <div className="w-10 h-5 rounded-full bg-primary peer-checked:bg-secondary transition-colors-opacity"></div>
          <span className="ml-md">Dark/Light Switch</span>
        </label>
      </div>

      {/* Gradient & Shadow */}
      <div className="flex items-center justify-center w-full h-32 font-bold bg-accentGradient shadow-neon text-textDark">
        Accent Gradient Box
      </div>
    </div>
  );
}
