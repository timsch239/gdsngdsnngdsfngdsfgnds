import { useAuthContext } from './useAuthContext'
import { useCommissionsContext } from './useCommissionsContext'

export const useLogout = () => {
    const { dispatch: authDispatch } = useAuthContext()
    const { dispatch: commissionsDispatch } = useCommissionsContext()

    const logout = () => {
        localStorage.removeItem('user')

        authDispatch({ type: 'LOGOUT' })
        commissionsDispatch({ type: 'SET_COMMISSIONS', payload: null })
    }

    return { logout }
}