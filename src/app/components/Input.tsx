'use client';
import React, {FC, ReactElement} from 'react';

type OptionSelectList = {
  name: string;
  value: string | number;
};

interface Props {
  label?: string;
  name?: string;
  value?: string | number;
  disabled?: boolean;
  handlerChange?: () => void;
  children?: ReactElement;
  options?: OptionSelectList[];
  error?: string;
  type?: string;
  onBlur?: () => void;
}

const Input: FC<Props> = props => {
  const {
    type,
    children,
    label,
    value,
    name,
    handlerChange,
    options,
    disabled,
    error,
    onBlur,
  } = props;
  const css = `rounded-lg px-4 py-3 w-full border-2 ${
    error ? 'border-red-300' : 'border-slate-200'
  }`;
  const typeValue = type ? type : 'text';
  const labelCssClass = 'text-sm font-semibold leading-5 text-slate-400';

  return (
    <div className="w-full pb-4">
      {label && <label className={labelCssClass}>{label}</label>}
      {children ? (
        children
      ) : (
        <>
          {options ? (
            <select
              className={css}
              name={name}
              value={value}
              onChange={handlerChange}
              disabled={disabled}
            >
              <option disabled defaultValue={''} value="">
                Seleccione...
              </option>
              {options.map((item: OptionSelectList, index: number) => (
                <option key={index} value={item.value}>
                  {item.name}
                </option>
              ))}
            </select>
          ) : (
            <input
              type={typeValue}
              className={css}
              name={name}
              value={value || ''}
              onChange={handlerChange}
              disabled={disabled}
              onBlur={onBlur}
            />
          )}
        </>
      )}
      {error ? <small className="text-red-400">{error}</small> : ''}
    </div>
  );
};

export default Input;
