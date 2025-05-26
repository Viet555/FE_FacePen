import './Story.scss'

const StoryModal = ({story, onClose}) => {
    return (
        <div className="story-modal-overlay">
            <div className="story-modal">
                <img src="" alt="" className="modal-image" />
                <div className="modal-info">
                    <img src="" alt="" className="modal-avatar" />
                    <p className="modal-name"></p>
                </div>
                <button className="modal-close"></button>
            </div>
        </div>
    )
}

export default StoryModal