import { useLocation } from 'react-router-dom'

import './page-header.style.css'

const PageHeader = () => {
	const path = useLocation().pathname

	return (
		<div className='page-header'>
			<span>Neven Mitrovic</span>
			<span> / </span>
			<span>{path === '/' ? 'Home' : path}</span>
		</div>
	)
}

export default PageHeader
