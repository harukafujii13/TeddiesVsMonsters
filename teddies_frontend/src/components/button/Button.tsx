import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  tertiary?: boolean;
  fourth?: boolean;
  fifth?: boolean;
  outline?: boolean;
  className?: string;
}

const Button = (props: ButtonProps) => {
  const {
    children,
    primary = true,
    secondary,
    tertiary,
    fourth,
    fifth,
    outline,
    onClick,
    className,
    ...rest
  } = props;

  const classes = classNames(
    'font-mulish text-[1.5rem] font-semibold p-2 rounded-lg shadow-md border-2 transition-colors duration-200 ease-in-out',
    className,
    {
      'bg-primary-orange text-primary-lightOrange border-primary-lightOrange hover:border-primary-orange hover:bg-primary-lightOrange hover:text-primary-orange':
        primary,
      'bg-primary-orange text-primary-lightOrange border-primary-lightOrange hover:border-primary-orange hover:bg-primary-lightOrange hover:text-primary-orange absolute lg:bottom-10 md:bottom-10 bottom-[5px] left-1/2 -translate-x-1/2 -translate-y-1/2 lg:text-[1.5rem] md:text-[1rem] text-[7px] lg:w-[13rem] lg:h-[4rem] md:w-[10rem] md:h-[3rem] w-[4rem] h-[1.7rem] lg:p-[8px] md:p-[8px] p-[2px]':
        secondary,
      'bg-primary-orange text-primary-lightOrange border-primary-lightOrange hover:border-primary-orange hover:bg-primary-lightOrange hover:text-primary-orange text-[1.5rem] w-[20rem]':
        tertiary,
      'bg-primary-orange text-primary-lightOrange border-primary-lightOrange hover:border-primary-orange hover:bg-primary-lightOrange hover:text-primary-orange lg:p-[2px] md:p-[2px] p-[1px] lg:text-2xl md:text-xl text-xs lg:w-[14rem] lg:h-[4rem] md:w-[10rem] md:h-[3rem] w-[5rem] h-[1.7rem]':
        fourth,
      'pointer-events-auto bg-primary-orange text-primary-lightOrange border-primary-lightOrange hover:border-primary-orange hover:bg-primary-lightOrange hover:text-primary-orange lg:p-[2px] md:p-[2px] p-[1px] lg:text-2xl md:text-xl text-xs lg:w-[9rem] lg:h-[4rem] md:w-[8rem] md:h-[3rem] w-[5rem] h-[1.8rem]':
        fifth,
    },
  );

  return (
    <button className={classes} {...rest} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
