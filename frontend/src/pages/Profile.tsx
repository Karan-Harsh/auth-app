import { useState, useEffect } from "react";
import axios from "axios";
import defaultProfilePic from "../assets/d1.jpg"; // Import your default profile picture

const Profile = () => {
  interface UserData {
    profilePicture: string;
    username: string;
    email: string;
  }

  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token"); // Get the JWT token from local storage
    fetchUserData(token);
  }, []);

  const fetchUserData = async (token: string | null) => {
    try {
      const response = await axios.post(
        "https://auth-app-f6ld.onrender.com/api/user/profile",
        { token } // Pass the token as the request body
      ); // Adjust the endpoint URL as per your backend setup
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const handleProfilePictureChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", import.meta.env.REACT_APP_UPLOAD_PRESET);

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            import.meta.env.REACT_APP_CLOUD_NAME
          }/image/upload`,
          formData
        );
        const imageUrl = response.data.secure_url;
        await updateUserProfilePicture(imageUrl);
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      }
    }
  };

  const updateUserProfilePicture = async (imageUrl: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "https://auth-app-f6ld.onrender.com/api/user/profile/picture",
        { token, imageUrl } // Send image URL to backend
      );

      console.log("Profile picture updated:", response.data);

      // Fetch user data again to re-render with the updated profile picture
      fetchUserData(token);
    } catch (error) {
      console.error("Error updating profile picture:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      {userData && (
        <div className="relative">
          <label htmlFor="profilePicture">
            <div className="w-32 h-32 rounded-full overflow-hidden group cursor-pointer">
              <img
                className="object-cover
                 w-full h-full transition duration-300 transform group-hover:scale-110"
                src={userData.profilePicture || defaultProfilePic}
                alt="Profile picture"
              />
            </div>
          </label>
          <input
            id="profilePicture"
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleProfilePictureChange}
            style={{ display: "none" }}
          />
          <div className="mt-4 text-center">
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Username
              </label>
              <div className="bg-gray-200 rounded-lg px-4 py-2">
                {userData.username}
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Email
              </label>
              <div className="bg-gray-200 rounded-lg px-4 py-2">
                {userData.email}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
