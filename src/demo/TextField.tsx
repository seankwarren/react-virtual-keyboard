import { TextField as MuiTextField, TextFieldProps } from '@mui/material';
import React, { ChangeEvent, useCallback, useState } from 'react';

interface Props extends Omit<TextFieldProps, 'onChange'> {
    onChange?: (value: string) => void;
}

export const TextField = React.forwardRef<HTMLInputElement, Props>(({
    onChange,
    value: valueProp,
    inputRef: inputRefProp,
    ...textFieldProps
}, ref) => {
    const [value, setValue] = useState<string>('');

    const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        if (onChange) onChange(e.target.value);
    }, [onChange]);

    return (
        <MuiTextField
            {...textFieldProps}
            ref={ref}
            inputRef={inputRefProp}
            value={valueProp ?? value}
            onInput={handleChange}
        />
    );
});
