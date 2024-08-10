import { Preferences } from "@capacitor/preferences";
import { useEffect, useMemo, useState } from "react";
export interface userToken {
    accessToken: string;
}
const Token_Key = "app_auth_token";
export  function  prefrenceStorage() {
    const [asstoken, setAsstoken] = useState<userToken[]>([]);
    useEffect(() => {
        const loadSaved = async () => {
            const { value } = await Preferences.get({ key: Token_Key });
            const photosInPreferences = (value ? JSON.parse(value) : []) as userToken[];
            setAsstoken(photosInPreferences);
        };
        loadSaved();
    }, [])

    const getasstoken = async () => {
        const { value } = await Preferences.get({ key: Token_Key });
        const photosInPreferences = (value ? value : '');
        return photosInPreferences;
    };
    const setSetToken = async (Token: string) => {
        const savedToken = {accessToken:Token};
        const newToken= [savedToken];
        setAsstoken(newToken);
        Preferences.set({ key: Token_Key,  value: JSON.stringify(newToken)});
    }
    const removeName = async () => {
        Preferences.clear();
        const savedToken = {accessToken:''};
        const newToken= [savedToken];
        console.log()
        setAsstoken(newToken);
        // Preferences.set({ key: Token_Key, value: JSON.stringify(newToken) });
        // await Preferences.remove({ key: Token_Key });
    };
    return {
        asstoken,
        setSetToken,
        removeName,
        getasstoken,
    };
}