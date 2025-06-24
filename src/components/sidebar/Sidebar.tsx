import { useSidebarContext } from '@/contexts/SidebarContext'
import SidebarHeader from '@/components/sidebar/sidebar-header/SiderbarHeader'
import SidebarCard from '@/components/sidebar/sidebar-card/SidebarCard'
import ProfileCard from '@/components/sidebar/profile-card/ProfileCard'
import { IoHomeSharp, IoDocumentSharp } from 'react-icons/io5'
import { GiExpense } from 'react-icons/gi'
import { CgInsights } from 'react-icons/cg'

import './sidebar.style.css'

const SIDEBAR_CARD_ITEMS = [
	{ path: '/', icon: <IoHomeSharp />, text: 'Home' },
	{ path: '/expense', icon: <GiExpense />, text: 'Expense' },
	{
		path: '/documents',
		icon: <IoDocumentSharp />,
		text: 'Documents',
	},
	{ path: '/isights', icon: <CgInsights />, text: 'Isights' },
]

const Sidebar = () => {
	const { open } = useSidebarContext()

	return (
		<div className={`sidebar-container container ${open ? 'sidebar-open' : 'sidebar-close'}`}>
			<SidebarHeader />
			<div className='sidebar-card-container'>
				<div className='top-items'>
					{SIDEBAR_CARD_ITEMS.map((item) => {
						return <SidebarCard path={item.path} icon={item.icon} text={item.text} />
					})}
				</div>
				<div className='bottom-items'>
					<ProfileCard />
				</div>
			</div>
		</div>
	)
}

export default Sidebar
