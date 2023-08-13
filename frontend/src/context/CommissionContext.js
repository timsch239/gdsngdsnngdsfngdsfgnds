import { createContext, useReducer } from 'react'

export const CommissionsContext = createContext()

export const commissionsReducer = (state, action) => {
	switch (action.type) {
		case 'SET_COMMISSIONS':
			return {
				commissions: action.payload
			}
		case 'CREATE_COMMISSION':
			return {
				commissions: [action.payload, ...state.commissions]
			}
		case 'DELETE_COMMISSION':
			return {
				commissions: state.commissions.filter((c) => c._id !== action.payload._id)
			}
		default:
			return state
	}
}

export const CommissionsContextProvider = ({ children }) => {
	const [state, dispatch] = useReducer(commissionsReducer, {
		commissions: null
	})

	return (
		<CommissionsContext.Provider value={{ ...state, dispatch }}>
			{children}
		</CommissionsContext.Provider>
	)
}