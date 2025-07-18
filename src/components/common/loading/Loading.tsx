import { DotLoader } from 'react-spinners'

import './loading.style.css'
import { useIsFetching } from '@tanstack/react-query'

const Loading = () => {
	const isFetching = useIsFetching()

	return (
		<div className={`loading-container ${!isFetching ? 'hidden' : ''}`}>
			<DotLoader size={100} speedMultiplier={2} color='var(--clr-text-primary)' />
		</div>
	)
}

export default Loading
