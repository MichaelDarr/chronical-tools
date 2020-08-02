import React, { FC } from 'react';

export interface DropdownInputProps extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
>{
    label: string;
    value: number;
    options: Array<number>;
    optionTransformer: (optionNum: number) => string;
    onInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

// DropdownInput selects from a range of option-correlated numbers.
// Options numbers are mapped to displayed strings by the optionTransformer function.
export const DropdownInput: FC<DropdownInputProps> = ({
    label,
    value,
    options,
    optionTransformer,
    onInputChange,
    ...rest
}) => (
    <label {...rest}>
        {label}:
        <br />
        <select
            value={value}
            onChange={onInputChange}
        >
            {options.map((option) => (
                <option value={option}>
                    {optionTransformer(option)}
                </option>
            ))}
        </select>
    </label>
);
