import { DotLoader } from 'react-spinners'

import './loading.style.css'

const Loading = () => {
	return (
		<div className='loading-container '>
			<DotLoader size={100} speedMultiplier={2} color='var(--clr-text-primary)' />
		</div>
	)
}

export default Loading
