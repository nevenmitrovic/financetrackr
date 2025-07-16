import { useLocation } from 'react-router-dom'

import { formatPath } from '@/utils'

import './page-header.style.css'
import { useAuth } from '@/contexts/AuthContext'

const PageHeader = () => {
	const { user } = useAuth()

	const path = useLocation().pathname

	return (
		<div className='page-header'>
			<span>{user?.user_metadata.full_name ?? user?.user_metadata.name ?? 'User'}</span>
			<span> / </span>
			<span>{formatPath(path)}</span>
		</div>
	)
}

export default PageHeader
