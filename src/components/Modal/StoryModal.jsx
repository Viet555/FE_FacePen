import './StoryModal.scss'

const StoryModal = ({story, onClose}) => {
    return (
        <div className="story-modal-overlay">
            <div className="story-modal" onClick={(e) => e.stopPropagation}>
                <img src={story.storyImage} alt="" className="modal-image" />
                <div className="modal-info">
                    <img src={story.avatar} alt="" className="modal-avatar" />
                    <p className="modal-name">{story.name}</p>
                </div>
                <button className="modal-close" onClick={onClose}>
                    <i className="fa-solid fa-xmark"></i>
                </button>
            </div>
        </div>
    )
}

export default StoryModal