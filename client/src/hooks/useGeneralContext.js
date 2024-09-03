import { useContext } from 'react';
import { GeneralContext } from '../context/generalContext';

export const useGeneralContext = () => {
    const context = useContext(GeneralContext);
    if (!context) {
        throw new Error("useGeneralContext must be used within a GeneralProvider");
    }
    return context;
}