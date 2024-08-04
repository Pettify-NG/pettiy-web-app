'use client';
import { clsx } from 'clsx/lite';
import { ChangeEvent, useState } from 'react';

type InputType = React.InputHTMLAttributes<HTMLInputElement> & {
  id?: string;
  error?: boolean | string;
  hint?: string;
  format?: boolean;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  leftIconClick?: () => void;
  rightIconClick?: () => void;
  rounded?: boolean;
  value?: string | any;
  ifCategory?: boolean;
};

export default function TextInput(props: InputType) {
  const {
    type = 'text',
    inputMode = 'text',
    error = false,
    disabled = false,
    placeholder,
    hint,
    format = false,
    value,
    id,
    name,
    className,
    leftIcon,
    rightIcon,
    leftIconClick,
    rightIconClick,
    onChange,
    onFocus,
    onBlur,
    rounded = false,
    ifCategory,
  } = props;

  const inputStyles = clsx(
    'h-[48px] bg-[#F0F1F3] px-4 py-2 border border-dark-100 flex gap-2 items-center',
    disabled && 'pointer-events-none opacity-60',
    rounded ? 'rounded-full' : 'rounded-lg',
    className
  );

  const [fValue, setFValue] = useState<string>(value ?? "");

  //Convert value to a formated currency
  const formatValue = (val: string): string => {
    const enteredValue = val;

    //Remove all negative value and alphabets
    const parsedValue = parseFloat(enteredValue.replace(/[^0-9.]/g, ''));
    let stringValue = parsedValue.toLocaleString();

    //Return the formatted string
    if (!isNaN(parsedValue)) {
      setFValue(`$${stringValue}`);
    } else {
      setFValue('');
      return '';
    }

    return stringValue;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let enteredValue = event.target.value;
    if (format) {
      //Get the formatted string and remove the commas
      let stringValue = formatValue(enteredValue);
      stringValue = stringValue.split(',').join('');
      event.target.value = stringValue;
      //handle the onchange
      onChange && onChange(event);
    } else {
      onChange && onChange(event);

      setFValue(enteredValue);
    }
  };

  return (
    <div className='flex flex-col'>
      <div className={inputStyles}>
        {leftIcon && (
          <div
            onClick={leftIconClick}
            className='text-xl text-neutral cursor-pointer'
          >
            {leftIcon}
          </div>
        )}
        <input
          id={id}
          type={type}
          name={name}
          inputMode={inputMode}
          value={fValue}
          onChange={handleInputChange}
          onFocus={onFocus}
          onBlur={onBlur}
          className={`h-full text-sm w-full bg-[#F0F1F3] font-medium caret-primary text-black leading-2 focus:outline-none block appearance-none`}
          placeholder={placeholder}
          maxLength={ifCategory ? 12 : undefined}
        />
        {rightIcon && (
          <div
            onClick={rightIconClick}
            className='text-xl text-neutral cursor-pointer'
          >
            {rightIcon}
          </div>
        )}
      </div>
      {(error || hint) && (
        <div className='text-xs font-light mt-1 ml-1 p-2'>
          {error && <span className='text-red-600'>{error}</span>}
          {hint && <span className='text-dark-200'>{hint}</span>}
        </div>
      )}
    </div>
  );
}
