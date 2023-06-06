
import { useState } from "react";
import { InputProps } from "./Input.model";

export default function Input({ label , type, value, onChange, error,classname } : InputProps){

    const [className, setClassName] = useState("bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500");

    if(classname){
        setClassName(classname);
    }

    return (
      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
        <input type={type} value={value} onChange={onChange} className={`${className} ${error ? 'invalid' : ''}`}/>
        { error && <small className="text-red-400 dark:brightness-125 text-[0.785rem] font-medium block mt-1 pl-3 leading-snug" >Este campo es requerido</small> }
        
      </div>
    );
  };