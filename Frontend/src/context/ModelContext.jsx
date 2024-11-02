import { createContext } from "react";

export const Context = createContext({
    isOpen: false,
    setIsOpen: (value) => { },
});
