import { useState } from "react"
import { useCommissionsContext } from '../hooks/useCommissionsContext'
import { useAuthContext } from '../hooks/useAuthContext'

const CommissionForm = () => {
	const { dispatch } = useCommissionsContext()
	const { user } = useAuthContext()

	const [name, setName] = useState('')
	const [mail, setMail] = useState('')
	const [request, setRequest] = useState('')
	const [size, setSize] = useState('')
	const [colorSet, setColorSet] = useState('')
	const [detailSet, setDetailSet] = useState('')
	const [error, setError] = useState(null)
	const [emptyFields, setEmptyFields] = useState([])

	const handleSubmit = async (e) => {
		e.preventDefault()

		if (!user) {
			setError('Please log in to submit a commission')
			return
		}

		const commission = { name, mail, request, size, colorSet, detailSet }

		const response = await fetch('/api/commissions/', {
			method: 'POST',
			body: JSON.stringify(commission),
			headers: {
				'Content-Type': 'application/json',
				'Authorization': `Bearer ${user.token}`
			}
		})

		const json = await response.json()

		if (!response.ok) {
			setError(json.error)
			setEmptyFields(json.emptyFields)
		}
		else if (response.ok) {
			setName('')
			setMail('')
			setRequest('')
			setSize('')
			setColorSet('')
			setDetailSet('')
			setError(null)
			setEmptyFields([])

			dispatch({ type: 'CREATE_COMMISSION', payload: json })
		}
	}

	return (
		<form className="create" onSubmit={handleSubmit}>
			<h3>Add a new Commission</h3>

			<label>Name:</label>
			<input
				type="text"
				onChange={(e) => setName(e.target.value)}
				value={name}
				className={emptyFields.includes('name') ? 'error' : ''}
			/>

			<label>E-Mail:</label>
			<input
				type="text"
				onChange={(e) => setMail(e.target.value)}
				value={mail}
				className={emptyFields.includes('mail') ? 'error' : ''}
			/>

			<label>Request:</label>
			<input
				type="text"
				onChange={(e) => setRequest(e.target.value)}
				value={request}
				className={emptyFields.includes('request') ? 'error' : ''}
			/>

			<label>Size:</label>
			<input
				type="text"
				onChange={(e) => setSize(e.target.value)}
				value={size}
				className={emptyFields.includes('size') ? 'error' : ''}
			/>

			<label>Color-Set:</label>
			<input
				type="text"
				onChange={(e) => setColorSet(e.target.value)}
				value={colorSet}
				className={emptyFields.includes('colorSet') ? 'error' : ''}
			/>

			<label>Detail-Set:</label>
			<input
				type="text"
				onChange={(e) => setDetailSet(e.target.value)}
				value={detailSet}
				className={emptyFields.includes('detailSet') ? 'error' : ''}
			/>

			<button>Submit</button>
			{error && <div className="error">{error}</div>}
		</form>
	)
}

export default CommissionForm