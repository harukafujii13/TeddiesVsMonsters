import React from 'react';
import { FieldError, UseFormRegister } from 'react-hook-form';

import { ChangeEvent } from 'react';

interface InputProps {
  id?: string;
  label?: string;
  width?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent) => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  register?: UseFormRegister<any>;
  registerName?: string;
  error?: FieldError;
}

const Input: React.FC<InputProps> = ({
  id,
  label,
  width = 'w-full',
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  onKeyDown,
  register,
  registerName,
  error,
}) => {
  let inputProps: { [key: string]: any } = {
    className: `text-[16px] md:text-[20px] bg-primary-lightOrange border-primary-orange border-[1px] rounded-[10px] py-2 px-2 text-center`,
    type: type,
    placeholder: placeholder,
    value,
    onChange,
    onBlur,
    onKeyDown,
  };

  // If register and registerName are provided, add them to the inputProps
  if (register && registerName) {
    inputProps = {
      ...inputProps,
      ...register(registerName),
    };
  }
  return (
    <>
      <div className={`flex flex-col ${width}`}>
        <label className=' pb-2 text-center font-LDRKaet'>{label}</label>
        <input {...inputProps} id={id} />
        {error && <p className='form_invalid_message'>{error.message}</p>}
      </div>
    </>
  );
};

export default Input;
