import { Keyboard, KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';
import { isPlatform } from '@ionic/react';
import { useState, } from 'react';

export function useKeyboardResize() {

    const setKeyboardResize = () => {
        if (isPlatform("capacitor")) {
            Keyboard.setResizeMode({ mode: KeyboardResize.Native });
            Keyboard.setStyle({style:KeyboardStyle.Default})
        }
    }
    const getResizeMode = () => {
        if (isPlatform("capacitor")) {
            const resize = Keyboard.getResizeMode();
            console.log(resize);
        }
    }
    return {
        setKeyboardResize,
        getResizeMode,
    }

}
