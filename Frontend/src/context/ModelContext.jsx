import { createContext } from "react";

export const modalContext = createContext({
    isOpen: false,
    setIsOpen: (value) => { },
});