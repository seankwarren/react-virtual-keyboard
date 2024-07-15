import { BackspaceOutlined, KeyboardCapslock } from '@mui/icons-material';
import { DisplayMap, LayoutType } from './types';
import { classList, extractGroupedText } from './utils';

const DEFAULT_LAYOUT = [
    '` 1 2 3 4 5 6 7 8 9 0 - = {backspace}',
    '{tab} q w e r t y u i o p [ ] \\',
    "{capslock} a s d f g h j k l ; ' {enter}",
    '{shift} z x c v b n m , . / {shift-right}',
    '{space} {collapse}',
];

const SHIFT_LAYOUT = [
    '~ ! @ # $ % ^ & * ( ) _ + {backspace}',
    '{tab} Q W E R T Y U I O P { } |',
    '{capslock} A S D F G H J K L : " {enter}',
    '{shift} Z X C V B N M < > ? {shift-right}',
    '{space} {collapse}',
];

const IOS_LAYOUT = [
    `q w e r t y u i o p`,
    `a s d f g h j k l`,
    `{shift} z x c v b n m {backspace}`,
    `{alt} {space} {return}`,
];

const IOS_SHIFT_LAYOUT = [
    `Q W E R T Y U I O P`,
    `A S D F G H J K L`,
    `{shift} Z X C V B N M {backspace}`,
    `{alt} {space} {return}`,
];

const IOS_ALT_LAYOUT = [
    `1 2 3 4 5 6 7 8 9 0`,
    `- / : ; ( ) $ & @ "`,
    `{alt2} . , ? ! ' {backspace}`,
    `{default} {space} {return}`,
];

export const DEFAULT_LAYOUT_MAP: LayoutType = {
    default: DEFAULT_LAYOUT,
    shift: SHIFT_LAYOUT,
    'default-ios': IOS_LAYOUT,
    'shift-ios': IOS_SHIFT_LAYOUT,
    'alt-ios': IOS_ALT_LAYOUT,
};

export const DISPLAY_MAPPING: DisplayMap = {
    '{tab}': 'tab',
    '{bkspc}': 'delete',
    '{capslock}': 'caps',
    '{shift}': 'shift',
    '{shift-right}': 'shift',
    '{enter}': 'enter',
    '{return}': 'return',
    '{backspace}': 'delete',
    '{space}': ' ',
    '{.com}': '.com',
    '{collapse}': '↓',
    '{alt}': '123',
};

export const DISPLAY_MAPPING_IOS: DisplayMap = {
    '{shift}': <KeyboardCapslock />,
    '{return}': 'return',
    '{backspace}': <BackspaceOutlined />,
    '{space}': ' ',
    '{collapse}': '↓',
    '{alt}': '123',
    '{alt2}': '#+=',
    '"': '”',
    '{default}': 'ABC',
};

export const INPUT_MAPPING: Record<string, string> = {
    '{tab}': '\t',
    '{space}': ' ',
    '{backspace}': '',
};

export const BASE_BUTTON_CLASSES = (key: string) =>
    classList([
        'vk-button',
        key ? `vk-button-${extractGroupedText(key)}` : '',
        key.length === 1 ? 'vk-button-standardBtn' : '',
    ]);

export const BASE_ROW_CLASSES = () => classList(['vk-row']);

export const BASE_KEYBOARD_CLASSES = () => classList(['vk-keyboard']);

export const THEME_CLASSES = (classes: string, theme: string) =>
    theme ? classList([classes, `vk-theme-${theme}`]) : classes;
