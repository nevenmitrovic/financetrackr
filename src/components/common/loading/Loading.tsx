import { DotLoader } from 'react-spinners'
import { useIsFetching } from '@tanstack/react-query'

import './loading.style.css'

const Loading = () => {
	const isFetching = useIsFetching()

	if (isFetching === 0) return null

	return (
		<div className='loading-overlay'>
			<DotLoader size={100} speedMultiplier={2} color='white' />
		</div>
	)
}

export default Loading
