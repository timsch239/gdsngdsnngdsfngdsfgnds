import { CommissionsContext } from "../context/CommissionContext";
import { useContext } from "react";

export const useCommissionsContext = () => {
    const context = useContext(CommissionsContext)

    if (!context) {
        throw Error('useCommissionsContext must be used inside a CommissionsContextProvider')
    }

    return context
}