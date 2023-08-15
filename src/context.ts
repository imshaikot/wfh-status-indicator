import { createContext } from "react"
import { IS_ACTIVE_STORAGE_NAME } from "./constants"

export const defaultContext: any = {
    isActive: window.localStorage.getItem(IS_ACTIVE_STORAGE_NAME) === 'true',
    setIsActive: null,
}
const Context = createContext(defaultContext)

export default Context