import './modal.css'

function Modal({children, isOpen, onClose, title}) {

    console.log(isOpen, onClose, title)

    if(!isOpen) {
        return <></>
    }

  return (
    <div className='overlay' onClick={() => e.stopPropagation()}>
        <div className="modal">
            <div className="modal__header">
                <h3>{title}</h3>
                <span onClick={onClose}>X</span>
            </div>
            <div className="modal__body">
                {children}
            </div>
        </div>
    </div>
  )
}

export default Modal