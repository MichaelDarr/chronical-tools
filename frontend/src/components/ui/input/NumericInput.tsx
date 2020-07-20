import React, { FC } from 'react';

export interface NumericInputProps extends React.DetailedHTMLProps<
    React.LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
>{
    label: string;
    value: number;
    onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const NumericInput: FC<NumericInputProps> = ({
    label,
    value,
    onInputChange,
    ...rest
}) => (
    <label {...rest}>
        {label}:
        <br />
        <input
            name={label}
            type='number'
            value={value}
            onChange={onInputChange}
        />
    </label>
);
