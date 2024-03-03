/* eslint-disable react/prop-types */
import { useState } from 'react';
import eyeIcon from '../assets/eye.png';
const PasswordInput = ({onChange,placeholder,label}) => {
    const [isPasswordVisible,setIsPasswordVisible] =useState(true);
    const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
    }
    return(
        <div className="relative input_box">
            <div className="text-sm font-medium text-left py-2">
        {label}
      </div>
        <input
          type={isPasswordVisible ? 'text' : 'password'}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-2 py-1 border rounded border-slate-200 bg-white"
        />
        <button
          type="button"
          className="absolute top-0 right-0  mt-10 mr-6"
          onClick={togglePasswordVisibility}
        >
          <img src={eyeIcon} alt="Toggle password visibility" />
        </button>
      </div>
    );
}
export default PasswordInput;