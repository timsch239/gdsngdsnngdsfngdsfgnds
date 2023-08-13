import { useCommissionsContext } from '../hooks/useCommissionsContext'
import { useAuthContext } from '../hooks/useAuthContext'

import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const CommissionDetail = ({ commission }) => {
    const { dispatch } = useCommissionsContext()
    const { user } = useAuthContext()

    const handleClick = async () => {
        if (!user) {
            return
        }

        const response = await fetch('/api/commissions/' + commission._id, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${user.token}`
            }
        })

        const json = await response.json()

        if (response.ok) {
            dispatch({ type: 'DELETE_COMMISSION', payload: json })
        }
    }

    return (
        <div className="commission-details">
            <h4>{commission.name}</h4>
            <p><strong>E-Mail: </strong>{commission.mail}</p>
            <p><strong>Request: </strong>{commission.request}</p>
            <p><strong>Size: </strong>{commission.size}</p>
            <p><strong>Color-Set: </strong>{commission.colorSet}</p>
            <p><strong>Detail-Set: </strong>{commission.detailSet}</p>
            <p>{formatDistanceToNow(new Date(commission.createdAt), { addSuffix: true })}</p>
            <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
        </div>
    )
}

export default CommissionDetail