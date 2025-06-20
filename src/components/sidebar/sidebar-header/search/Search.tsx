import { IoIosSearch } from 'react-icons/io'
import { useSidebarContext } from '@/contexts/SidebarContext'

import './search.style.css'

interface ISearchProps {
	onChange: () => void
}

const Search = ({ onChange }: ISearchProps) => {
	const { open } = useSidebarContext()

	return (
		<div className={`sidebar-search ${!open ? 'hidden' : ''}`}>
			<input type='text' placeholder='Search' onChange={onChange} name='sidebarSearch' />
			<IoIosSearch className='input-icon' />
		</div>
	)
}

export default Search
