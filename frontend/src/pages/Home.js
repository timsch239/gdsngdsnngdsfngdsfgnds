import { useEffect } from 'react'
import { useCommissionsContext } from '../hooks/useCommissionsContext'
import { useAuthContext } from '../hooks/useAuthContext'

import CommissionDetail from '../components/CommissionDetails'
import CommissionForm from '../components/CommissionForm'

const Home = () => {
	const { commissions, dispatch } = useCommissionsContext()
	const { user } = useAuthContext()

	useEffect(() => {
		const fetchCommissions = async () => {
			const response = await fetch('/api/commissions/', {
				headers: {
					'Authorization': `Bearer ${user.token}`
				}
			})
			const json = await response.json()

			if (response.ok) {
				dispatch({ type: 'SET_COMMISSIONS', payload: json })
			}
		}

		if (user) {
			fetchCommissions()
		}

	}, [dispatch, user])

	return (
		<div className="home">
			<div className="commissions">
				{commissions && commissions.map(commission => (
					<CommissionDetail key={commission._id} commission={commission} />
				))}
			</div>
			<CommissionForm />
		</div>
	)
}

export default Home