import { BsFiletypeXlsx } from 'react-icons/bs'
import { FaFileDownload } from 'react-icons/fa'

import './document-card.style.css'

interface DocumentCardProps {
	user: string
	onClick: () => void
	title: string
}

const DocumentCard = ({ user, onClick, title }: DocumentCardProps) => {
	return (
		<div className='document-card'>
			<div className='document-header'>
				<BsFiletypeXlsx size={30} color='var(--clr-success)' />
			</div>
			<div className='document-body'>
				<h4>{title}</h4>
				<p>
					Download {title.toLocaleLowerCase()} for {user}
				</p>
			</div>
			<div className='document-foot'>
				<button className='button' onClick={onClick}>
					<FaFileDownload />
					Download
				</button>
			</div>
		</div>
	)
}

export default DocumentCard
