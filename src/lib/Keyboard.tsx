import "./Keyboard.css";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
    BASE_BUTTON_CLASSES,
    BASE_KEYBOARD_CLASSES,
    BASE_ROW_CLASSES,
    DEFAULT_LAYOUT_MAP,
    DISPLAY_MAPPING,
    INPUT_MAPPING,
    THEME_CLASSES
} from "./constants";
import { DisplayMap, LayoutType } from "./types";
import { classList, isTypeableInput, updateInputText } from "./utils";

let globalInstanceTracker = 0;

export const Keyboard = ({
    layout: layoutProp,
    layoutName: layoutNameProp,
    display,
    theme = "default",
    visible,
    onOpen,
    onClose
}: {
    layout?: LayoutType;
    layoutName?: string;
    display?: DisplayMap;
    theme?: string;
    visible?: boolean;
    onOpen?: () => void;
    onClose?: () => void;
}) => {
    const layout = layoutProp ?? DEFAULT_LAYOUT_MAP;

    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

    const [layoutName, setLayoutName] = useState<string>(layoutNameProp ?? 'default');

    const [isVisible, setIsVisible] = useState<boolean>(false);

    const [isShifted, setIsShifted] = useState<boolean>(false);

    const selectedLayout = useMemo(() => (
        layout[layoutName]
    ), [layoutNameProp, layoutName]);

    const handleOpen = useCallback((element: EventTarget | null) => {
        if (element === null) return;
        if (element instanceof HTMLInputElement
            || element instanceof HTMLTextAreaElement
        ) {
            setIsVisible(true);
            setLayoutName('default');
            inputRef.current = element;
            if (onOpen) onOpen();
        }
    }, []);

    const handleClose = useCallback(() => {
        setIsVisible(false);
        if (!inputRef.current) return;
        inputRef.current?.blur();
        inputRef.current = null;
        if (onClose) onClose();
    }, [inputRef]);

    useEffect(() => {
        setLayoutName(() => isShifted
            ? `${theme === "default" ? 'shift' : `shift-${theme}`}`
            : `${theme === "default" ? 'default' : `default-${theme}`}`
        );
    }, [isShifted])

    useEffect(() => {
        globalInstanceTracker += 1;

        if (globalInstanceTracker > 1) {
            console.warn(`Keyboard component appears ${globalInstanceTracker} time${globalInstanceTracker > 1 ? 's' : ''} in the DOM tree. This may lead to unexpected side-effects add goes against the intended design pattern.`);
        }

        return () => {
            globalInstanceTracker -= 1;
        };
    }, [name]);

    useEffect(() => {
        const onFocus = (e: Event) => {
            if (isTypeableInput(e.target as HTMLElement)) {
                handleOpen(e.target as HTMLInputElement | HTMLTextAreaElement)
            }
        };

        const onBlur = (e: Event) => {
            if (isTypeableInput(e.target as HTMLElement)) {
                handleClose();
            }
        };

        document.addEventListener('focus', onFocus, true);
        document.addEventListener('blur', onBlur, true);

        return () => {
            document.removeEventListener('focus', onFocus, true);
            document.removeEventListener('blur', onBlur, true);
        };
    }, [inputRef]);


    const onKeyPress = (key: string) => {
        switch (key) {
            case '{enter}':
            case '{collapse}':
                handleClose();
                break;
            case '{shift}':
            case '{shift-right}':
                setIsShifted((isShifted) => !isShifted);
                setLayoutName(`${theme === "default" ? 'shift' : `shift-${theme}`}`);
                break;
            case '{alt}':
                setLayoutName(`${theme === "default" ? 'alt' : `alt-${theme}`}`);
                break;
            case '{default}':
                setLayoutName(`${theme === "default" ? 'default' : `default-${theme}`}`);
                break;
            case '{capslock}':
                setLayoutName((layoutName) => layoutName.startsWith('default')
                    ? 'shift'
                    : 'default');
                break;
            case '{backspace}':
            case '{space}':
            case '{tab}':
            case '{.com}':
            default:
                setIsShifted(false);
                if (!inputRef.current) return;
                updateInputText(inputRef.current, key, INPUT_MAPPING);
                inputRef.current.dispatchEvent(new Event('input', {
                    bubbles: true
                }));
                break;
        }
    }

    console.log(layoutName);
    if ((visible === undefined && !isVisible) || visible === false) return null;

    return (
        <div className={THEME_CLASSES('vk-keyboard-container', theme)}>
            <div className={BASE_KEYBOARD_CLASSES()} onMouseDown={(e) => e.preventDefault()}>
                {selectedLayout.map((row, i) => (
                    <div key={i} className={BASE_ROW_CLASSES()}>
                        {row.split(' ').map((keyName: string) => {
                            return (
                                <KeyButton
                                    keyName={keyName}
                                    onKeyPress={onKeyPress}
                                    display={display ?? DISPLAY_MAPPING} />
                            )
                        })}
                    </div>
                ))}
            </div>
        </div>
    )
};

const KeyButton = ({ keyName, onKeyPress, display }: { keyName: string, onKeyPress: (key: string) => void, display: DisplayMap }) => {
    const [active, setActive] = useState<boolean>(false);

    return (
        <div
            onMouseDown={() => setActive(true)}
            onMouseUp={() => setActive(false)}
            className={classList([BASE_BUTTON_CLASSES(keyName), active ? 'vk-button--active' : ''])}
            onClick={() => onKeyPress(keyName)}>
            <span>{display?.[keyName] ?? keyName}</span>
        </div>
    )
}
