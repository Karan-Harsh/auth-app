import { useState, useEffect } from "react";
import axios from "axios";
import defaultProfilePic from "../assets/d1.jpg"; // Import your default profile picture

const Profile = () => {
  interface UserData {
    profilePicUrl: string;
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
        "http://localhost:3000/api/user/profile",
        { token } // Pass the token as the request body
      ); // Adjust the endpoint URL as per your backend setup
      setUserData(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-3xl text-center font-semibold my-7">Profile</h1>
      {userData && (
        <div className="relative">
          <div className="w-32 h-35 rounded-full overflow-hidden group">
            <img
              className="object-cover w-full h-full transition duration-300 transform group-hover:scale-110"
              src={userData.profilePicUrl || defaultProfilePic}
              alt="Profile picture"
            />
          </div>
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
