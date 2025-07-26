import { ClipLoader } from 'react-spinners'

import './spinner.style.css'

const Spinner = () => {
	return (
		<div className='spinner-container'>
			<ClipLoader size={35} speedMultiplier={2} color='#3498db' />
		</div>
	)
}

export default Spinner
