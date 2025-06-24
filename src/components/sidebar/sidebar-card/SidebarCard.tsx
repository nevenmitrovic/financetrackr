import { Link, useLocation } from 'react-router-dom'

import './sidebar-card.style.css'

interface SidebarCardProps {
	path: string
	icon: JSX.Element
	text: string
}

const SidebarCard = ({ path, icon, text }: SidebarCardProps) => {
	const currentPath = useLocation()

	return (
		<Link
			to={path}
			className={`sidebar-card ${currentPath.pathname === path ? 'card-active' : 'card-inactive'}`}
		>
			<span>{icon}</span>
			<span>{text}</span>
		</Link>
	)
}

export default SidebarCard
