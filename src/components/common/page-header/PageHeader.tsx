import { useLocation } from 'react-router-dom'

import './page-header.style.css'

const formatPath = (path: string) => {
	if (path === '/') return 'Home'

	return path.charAt(0).toUpperCase() + path.slice(1).toLowerCase()
}

const PageHeader = () => {
	const path = useLocation().pathname

	return (
		<div className='page-header'>
			<span>Neven Mitrovic</span>
			<span> / </span>
			<span>{formatPath(path)}</span>
		</div>
	)
}

export default PageHeader
