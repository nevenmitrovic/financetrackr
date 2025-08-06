import { BsFiletypeXlsx } from 'react-icons/bs'
import { FaFileDownload } from 'react-icons/fa'

import './document-card.style.css'

interface DocumentCardProps {
	onClick: () => void
	title: string
	desc: string
}

const DocumentCard = ({ onClick, title, desc }: DocumentCardProps) => {
	return (
		<div className='document-card'>
			<div className='document-header'>
				<BsFiletypeXlsx size={30} color='var(--clr-success)' />
			</div>
			<div className='document-body'>
				<h4>{title}</h4>
				<p>{desc}</p>
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
