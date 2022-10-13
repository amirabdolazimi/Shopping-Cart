import { useAuth } from "../../Context/AuthProvider";
import "./Profile.css";
const Profile = () => {
  const auth = useAuth();

  return (
    <div className="container">
      <div className="profileDetail">
        <div className="profileSection">
          <span>name :</span>
          <p> {auth.name}</p>
        </div>
        <div className="profileSection">
          <span>email : </span>
          <p>{auth.email}</p>
        </div>
        <div className="profileSection">
          <span>phoneNumber :</span>
          <p>{auth.phoneNumber} </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
