import { useEffect, useState } from 'react'
import './PostModal.scss'
import { useSelector } from 'react-redux'
import { createPost, getPostsService } from '../../service/ApiService'
import { toast } from 'react-toastify'


const PostModal = ({user, onClose}) => {
    const userAcc = useSelector(state => state.user.account)
    useEffect(() => {
        if (userAcc.id) {
            setFormCreate({
                ...formCreate,
                author: userAcc.id
            })
        }
    }, [userAcc])
    const [formCreate, setFormCreate] = useState({
        author: userAcc.id,
        caption: '',
        visibility: '',
        media: '', 
        mediaPreview: ''
    })

    const handleFileChange = (event) => {
        const files = event.target.files;
        if (!files) return;

        const mediaPreviewArray = [];
        const mediaArray = [];

        const promises = Array.from(files).map((file) => {
            return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = () => {
                mediaPreviewArray.push({
                    url: URL.createObjectURL(file),
                    type: file.type,
                });

                mediaArray.push({
                    data: reader.result, // base64
                    type: file.type,
                });

                resolve();
            };
            reader.readAsDataURL(file);
            });
        });

        Promise.all(promises).then(() => {
            setFormCreate((prev) => ({
            ...prev,
            mediaPreview: mediaPreviewArray,
            media: mediaArray,
            }));
        });
    };
    const handleOnChange = (e) => {
        setFormCreate({
            ...formCreate,
            [ e.target.name ] : e.target.value
        })
    }

    const deleteMedia = (item, index) => {
        setFormCreate((prev) => {
            const newPreview = [...prev.mediaPreview];
            const newMedia = [...prev.media];

            newPreview.splice(index, 1); // Xóa mediaPreview tại vị trí index
            newMedia.splice(index, 1);   // Xóa media base64 tương ứng

            return {
            ...prev,
            mediaPreview: newPreview,
            media: newMedia,
            };
        });
    };

    const handleCreate = async () => {
        let res = await createPost(formCreate)
        if (res?.Ec === 0) {
            toast.success(res.Mes)
            await getPostsService(userAcc.id)
            setFormCreate({
                ...formCreate,
                caption: '',
                visibility: '',
                media: '', 
                mediaPreview: ''
            })
        } else {
            toast.error(res?.Mes)
        }
    }
    console.log(formCreate)


    return (
        <div className="post-modal-overlay">
            <div className="post-modal">
                <div className="modal-header">
                    <h3>Create New Post</h3>
                    <button className="close-btn" onClick={onClose}>
                        <i className="fa-solid fa-xmark"></i>
                    </button>
                </div>
                <div className="modal-body">
                    <div className="user-info">
                        <div className="avatar-placeholder">
                            <img src={user.avatar} alt="" />
                        </div>
                        <div>
                            <p className="username">{user.firstName} {user.lastName}</p>
                            <select className="privacy" name='visibility' value={formCreate['visibility']} onChange={(handleOnChange)}>
                                <option value="public">Public</option>
                                <option value="friends">Friends</option>
                                <option value="private">Only me</option>
                            </select>
                        </div>
                    </div>
                    <textarea  placeholder="What do you think?" name='caption' value={formCreate['caption']} rows={4} onChange={(handleOnChange)}></textarea>

                    <div className="upload-section" >
                        <div className="upload-box">
                            {formCreate.mediaPreview?.length > 0 ?  "" : <label htmlFor="mediapost">Add photo/video <small>or drag and drop</small></label>}
                            <input type="file" name='media' id='mediapost' hidden accept='image/*, video/*' onChange={handleFileChange} multiple  />
                        </div>
                        {formCreate.mediaPreview?.length > 0 && (
                            <div className="preview-grid">
                                {formCreate.mediaPreview.map((item, index) => (
                                    <div key={index} className="preview-item" onClick={() => deleteMedia(item, index)}>

                                        {item?.type?.startsWith('video') ? (
                                            <video src={item.url}  width="100%" />
                                        ) : (
                                            <img src={item.url} alt={`preview-${index}`} />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                <div className="modal-footer">
                    <button className="post-btn" onClick={() => handleCreate()}>Post</button>
                </div>
            </div>
        </div>
    )
}

export default PostModal
