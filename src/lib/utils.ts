/**
 * Adds text at the specified cursor position in a given value. Can be used as a
 * delete function by passing an empty string as the text.
 *
 * @param value - The original value.
 * @param cursorStart - The starting position of the cursor.
 * @param cursorEnd - The ending position of the cursor.
 * @param text - The text to be added at the cursor position.
 * @returns The updated value with the text added at the cursor position.
 */
export function modifyTextAtCursor(
    value: string,
    cursorStart: number | null,
    cursorEnd: number | null,
    text: string
): string {
    if (cursorStart === null || cursorEnd === null) return value;
    if (cursorStart > cursorEnd) {
        const temp = cursorStart;
        cursorStart = cursorEnd;
        cursorEnd = temp;
    }
    if (cursorEnd > value.length) cursorEnd = value.length;
    // delete case
    if (text === '' && cursorStart === cursorEnd) {
        return (
            value.slice(0, cursorStart - 1) +
            value.slice(cursorEnd, value.length)
        );
    }
    return (
        value.slice(0, cursorStart) +
        text +
        value.slice(cursorEnd, value.length)
    );
}

/**
 * Updates the value of an input element by adding the given text at the cursor
 * position. If the text is an empty string, the selected text is deleted and
 * the cursor position is updated.
 *
 * @param input - The input element to be updated.
 * @param text - The text to be added at the cursor position.
 */
export function updateInputText(
    input: HTMLInputElement | HTMLTextAreaElement,
    text: string,
    inputMapping?: Record<string, string>
) {
    text = inputMapping?.[text] ?? extractGroupedText(text);
    const value = input.value;
    const cursorStart = input.selectionStart;
    const cursorEnd = input.selectionEnd;
    input.value = modifyTextAtCursor(value, cursorStart, cursorEnd, text);
    // if it was a delete operation, update the cursor position
    if (text === '') {
        const newCursorPos =
            Math.min(cursorStart || 0, cursorEnd || 0) -
            Number(cursorStart === cursorEnd);

        input.selectionStart = newCursorPos;
        input.selectionEnd = newCursorPos;
    }
}

/**
 * Extracts the grouped text from a given string.
 * If the string starts with '{' and ends with '}', the grouped text is
 * returned. Otherwise, the original string is returned.
 *
 * @param text - The input string.
 * @returns The grouped text if it exists, otherwise the original string.
 */
export function extractGroupedText(text: string): string {
    if (text.startsWith('{') && text.endsWith('}')) {
        return text.slice(1, text.length - 1);
    }
    return text;
}

/**
 * Checks if the given element is a typeable input. A typeable input is either
 * an HTMLInputElement or an HTMLTextAreaElement with a valid input type or a
 * content editable element. Valid input types are: `'text'`, `'search'`, `'url'`,
 * `'tel'`, `'email'`, `'password'`, `'number'`, `'search'`.
 *
 * @param element
 * @returns True if the element is a typeable input, otherwise false.
 */
export function isTypeableInput(element: EventTarget & Element): boolean {
    const validInputTypes = [
        'text',
        'search',
        'url',
        'tel',
        'email',
        'password',
        'number',
        'search',
    ];
    const isTextInputElement =
        (element instanceof HTMLInputElement ||
            element instanceof HTMLTextAreaElement) &&
        validInputTypes.includes(element.type);
    const isContentEditable =
        element instanceof HTMLElement && element.isContentEditable;
    return isTextInputElement || isContentEditable;
}

export function classList(classes: string[]): string {
    return classes.filter((str) => str !== '').join(' ');
}
