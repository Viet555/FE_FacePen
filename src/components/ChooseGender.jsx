import './ChooseGender.scss'
import avatarMale from '../assets/image/avatar-male.avif'
import avatarFeMale from '../assets/image/avatar-female.avif'

const ChooseGender = () => {
  return (
    <>
      <div className="gender-container">
        <div className="gender-content">
          <div className="content__header">
            <div className="content__header--title">
              <h4 className="title">Choose your gender</h4>
            </div>
          </div>
          <div className="content__body">
            <div className="gender__option">
              <img src={avatarMale} alt="" className="gender-img" />
              <div className="gender-title">Male</div>
            </div>
            <div className="gender__option">
              <img src={avatarFeMale} alt="" className="gender-img" />
              <div className="gender-title">FeMale</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ChooseGender;
