import SidebarLogoCard from '@/components/sidebar/sidebar-header/sidebar-logo-card/SidebarLogoCard'
import Search from '@/components/sidebar/sidebar-header/search/Search'
import { useCallback, useState } from 'react'

import './sidebar-header.style.css'

const SidebarHeader = () => {
	const [searchValue, setSearchValue] = useState('')

	const handleSearchValue = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(e.target.value)
	}, [])

	return (
		<div className='sidebar-header'>
			<SidebarLogoCard />
			<Search onChange={() => handleSearchValue} />
		</div>
	)
}

export default SidebarHeader
