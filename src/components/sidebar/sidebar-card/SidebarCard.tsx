import { Link, useLocation } from 'react-router-dom'
import { useSidebarContext } from '@/contexts/SidebarContext'

import './sidebar-card.style.css'

interface SidebarCardProps {
	path: string
	icon: JSX.Element
	text: string
}

const SidebarCard = ({ path, icon, text }: SidebarCardProps) => {
	const { open } = useSidebarContext()
	const currentPath = useLocation()

	return (
		<Link
			to={path}
			className={`sidebar-card ${currentPath.pathname === path ? 'card-active' : 'card-inactive'}`}
		>
			<span className={`${!open ? 'margin-auto' : ''}`}>{icon}</span>
			<span className={`${!open ? 'hidden' : ''}`}>{text}</span>
		</Link>
	)
}

export default SidebarCard
