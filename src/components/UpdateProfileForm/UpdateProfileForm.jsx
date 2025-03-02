//UpdateProfile
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Select from "react-select";
import { getCurrentUser, updateUserProfile } from "../../utilities/users-service";
import "./UpdateProfileForm.css";

const countries = [
  { value: "USA", label: "United States" },
  { value: "CA", label: "Canada" },
];

const UpdateProfileForm = ({ onUpdate }) => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthdate: "",
    country: "",
    profilePicture: null,
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true); // Start loading
        const user = await getCurrentUser();
        console.log("Fetched User Data:", user); // ADD THIS
        
        if (!user || user._id !== userId) {
          setError("User not found or unauthorized to edit this profile.");
          setLoading(false);
          return;
        }

        setFormData({
          name: user.name || "",
          email: user.email || "",
          birthdate: user.birthdate || "",
          country: user.country || "",
          profilePicture: user.profilePicture || null,
        });

      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please try again.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile.type.startsWith("image/")) {
      setError("Invalid file type: Only images allowed.");
      return;
    }
    setFormData({ ...formData, profilePicture: selectedFile });
  };

  const handleCountryChange = (selectedOption) => {
    setFormData({ ...formData, country: selectedOption.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("birthdate", formData.birthdate);
      formDataToSend.append("country", formData.country);
      if (formData.profilePicture) {
        formDataToSend.append("profilePicture", formData.profilePicture);
      }

      const updatedUser = await updateUserProfile(formDataToSend, userId);
      if (onUpdate) {
        onUpdate(updatedUser);
      }
      navigate("/profile");
    } catch (error) {
      setError("Error updating profile. Please try again.");
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return <p>Loading user data...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="update-profile-container">
      <h2>Update Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        
        <label>Email:</label>
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
        
        <label>Birthdate:</label>
        <input type="date" name="birthdate" value={formData.birthdate} onChange={handleChange} />
        
        <label>Country:</label>
        <Select 
          options={countries} 
          value={countries.find(c => c.value === formData.country)} 
          onChange={handleCountryChange} 
        />
        
        <label>Profile Picture:</label>
        <input type="file" name="profilePicture" accept="image/*" onChange={handleFileChange} />
        
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UpdateProfileForm;





