import type { ReactNode } from 'react'
import './modal.style.css'

interface ModalProps {
	children: ReactNode
	isOpen: boolean
}

const Modal = ({ children, isOpen }: ModalProps) => {
	return (
		<div className={`modal-background container ${!isOpen && 'hidden'}`}>
			<div className='container content-card modal-container'>{children}</div>
		</div>
	)
}

export default Modal
