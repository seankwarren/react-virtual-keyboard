import { TextField as MuiTextField } from '@mui/material';
import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { Keyboard } from '../lib/Keyboard';
import { DISPLAY_MAPPING_IOS } from '../lib/constants';

export function App() {
    const [value1, setValue1] = useState<string>('');
    const [value2, setValue2] = useState<string>('');
    const [value3, setValue3] = useState<string>('');

    const inputRef1 = useRef<HTMLInputElement | null>(null);
    const inputRef2 = useRef<HTMLInputElement | null>(null);
    const inputRef3 = useRef<HTMLInputElement | null>(null);

    const onChange1 = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue1(() => e.target.value);
    }, []);

    const onChange2 = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue2(() => e.target.value);
    }, []);

    const onChange3 = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setValue3(() => e.target.value);
    }, []);

    return (
        <>
            <Keyboard theme='ios' visible layoutName='default-ios' display={DISPLAY_MAPPING_IOS} />
            <div>
                <h3 style={{ textDecoration: "underline" }}>Vanilla JS input</h3>
                <h5>type="text"</h5>
                <label htmlFor="vanilla-controlled">controlled</label>
                <input
                    id="vanilla-controlled"
                    ref={inputRef1}
                    value={value1}
                    onInput={onChange1}
                />
                <label htmlFor="vanilla-uncontrolled">uncontrolled</label>
                <input id="vanilla-uncontrolled" />
                <h5>type="number"</h5>
                <label htmlFor="vanilla-controlled-number">controlled</label>
                <input
                    id="vanilla-controlled-number"
                    type="number"
                    min={0}
                    step={0.1}
                    max={10}
                    ref={inputRef2}
                    value={value2}
                    onInput={onChange2}
                />
                <label htmlFor="vanilla-uncontrolled-number">uncontrolled</label>
                <input
                    id="vanilla-uncontrolled-number"
                    type='number'
                    min={0}
                    step={0.1}
                    max={10}
                />
            </div>
            <div>
                <h3 style={{ textDecoration: "underline" }}>MUI TextField</h3>
                <MuiTextField
                    label="controlled"
                    inputRef={inputRef3}
                    value={value3}
                    onInput={onChange3}
                />
                <MuiTextField
                    label="uncontrolled" />
            </div>
        </>
    )
}
