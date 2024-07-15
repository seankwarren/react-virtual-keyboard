import { modifyTextAtCursor } from './utils';

describe('addTextAtCursor', () => {
    it('should return the original value if cursorStart', () => {
        const value = 'Hello, world!';
        const result = modifyTextAtCursor(value, null, 7, 'Hello');
        expect(result).toBe(value);
    });
    it('should return the original value if cursorEnd is null', () => {
        const value = 'Hello, world!';
        const result = modifyTextAtCursor(value, 7, null, 'Hello');
        expect(result).toBe(value);
    });
    it('should add text at the cursor position', () => {
        const value = 'Hello, world!';
        const result = modifyTextAtCursor(value, 7, 7, 'Hello');
        expect(result).toBe('Hello, Helloworld!');
    });
    it('should replace the selected text when cursorStart is less than cursorEnd', () => {
        const value = 'Hello, world!';
        const result = modifyTextAtCursor(value, 0, 1, 'Hello');
        expect(result).toBe('Helloello, world!');
    });
    it('should delete the selected text when the added text is <empty_string>', () => {
        const value = 'Hello, world!';
        const result = modifyTextAtCursor(value, 0, 1, '');
        expect(result).toBe('ello, world!');
    });
});
