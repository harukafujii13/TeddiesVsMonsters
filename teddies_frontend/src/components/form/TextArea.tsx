import { FieldError, UseFormRegister } from 'react-hook-form';

interface TextAreaProps {
  label?: string;
  placeholder?: string;
  max?: number;
  register: UseFormRegister<any>;
  registerName: string;
  error?: FieldError;
  className?: string;
}

const TextArea = (props: TextAreaProps) => {
  const { label, placeholder, max, register, registerName, error, className } =
    props;
  return (
    <>
      <div className='flex flex-col w-full'>
        <label className=' pb-2 text-center font-LDRKaet'>{label}</label>
        <textarea
          maxLength={max}
          placeholder={placeholder}
          className={`w-full  bg-primary-lightOrange border-primary-orange border-[1px] rounded-[10px] py-2 px-2 text-center ${className}`}
          {...register(registerName)}
        />
        {max && (
          <p className='text-end text-sm text-secondary-gray'>{`${max} maximum`}</p>
        )}
        {error && <p className='form_invalid_message'>{error.message}</p>}
      </div>
    </>
  );
};

export default TextArea;
