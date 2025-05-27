import { useRef, useState } from 'react'
import './Story.scss'
import StoryModal from './StoryModal'
import image from '../assets/image/post-image.jpg'
const stories = [
  {
    id: 1,
    name: "Vy 2003",
    avatar: "",
    storyImage: image,
  },
  {
    id: 1,
    name: "Vy 2003",
    avatar: "",
    storyImage: image,
  },
  {
    id: 1,
    name: "Vy 2003",
    avatar: "",
    storyImage: image,
  },
  {
    id: 1,
    name: "Vy 2003",
    avatar: "",
    storyImage: image,
  },
  {
    id: 1,
    name: "Vy 2003",
    avatar: "",
    storyImage: image,
  },
  {
    id: 1,
    name: "Vy 2003",
    avatar: "",
    storyImage: image,
  },
  {
    id: 1,
    name: "Vy 2003",
    avatar: "",
    storyImage: image,
  },
  {
    id: 1,
    name: "Vy 2003",
    avatar: "",
    storyImage: image,
  },
  {
    id: 1,
    name: "Vy 2003",
    avatar: "",
    storyImage: image,
  },
];
const Story = () => {
  const [selectedStory, setSelectedStory] = useState(null);
  const scrollRef = useRef();
  const handleOpen = (story) => setSelectedStory(story);
  const handleClose = () => setSelectedStory(null);
  const scrollLeft = () => {
    scrollRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };

    const scrollRight = () => {
        scrollRef.current.scrollBy({ left: 200, behavior: 'smooth' })
    }
    return (
        <div className="story-container">
            <button className="scroll-btn left" onClick={scrollLeft}><i className="fa-solid fa-chevron-left"></i></button>
            <div className="story-scroll" ref={scrollRef}>
                <div className="story-create">
                    <div className="story-image-placeholder"></div>
                    <button className="create-button">
                        +
                    </button>
                    <p>Create</p>
                </div>

        {stories.map((story, index) => (
          <div
            className="story-card"
            key={story.id}
            onClick={() => handleOpen(story)}
          >
            <img src={story.storyImage} alt="" className="story-img" />
            <img src="" alt="" className="story-avatar" />
            <p className="story-name">{story.name}</p>
          </div>
        ))}
      </div>
      <button className="scroll-btn right" onClick={scrollRight}>
        <i className="fa-solid fa-chevron-right"></i>
      </button>
      {selectedStory && (
        <StoryModal story={selectedStory} onClose={handleClose} />
      )}
    </div>
  );
};

export default Story;
