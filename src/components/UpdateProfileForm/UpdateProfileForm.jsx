import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import { getCurrentUser } from "../../utilities/users-service"; // Import getCurrentUser
import { updateUserProfile } from "../../utilities/updateUser-service"; // Import updateUserProfile
import "./UpdateProfileForm.css";

const countries = [
  { value: "USA", label: "United States" },
  { value: "CA", label: "Canada" },
  // Add more countries as needed
];

const UpdateProfileForm = ({ onUpdate }) => {
  const { userId } = useParams();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthdate: "",
    country: "",
    profilePicture: null,
  });

  useEffect(() => {
    // Fetch the current user data and populate the form
    const fetchUserData = async () => {
      try {
        const user = await getCurrentUser(); // Fetch current user data
        if (user) {
          setFormData({
            name: user.name || "",
            email: user.email || "",
            birthdate: user.birthdate || "",
            country: user.country || "",
            profilePicture: user.profilePicture || null,
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile.type.startsWith("image/")) {
      console.error("Invalid file type: Only images allowed.");
      return;
    }

    setFormData({
      ...formData,
      profilePicture: selectedFile,
    });
  };

  const handleCountryChange = (selectedOption) => {
    setFormData({
      ...formData,
      country: selectedOption.value,
    });
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
        onUpdate(updatedUser); // Notify parent component of the update
      }
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <form className="container" onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </label>
      <label>
        Birthdate:
        <input
          type="date"
          name="birthdate"
          value={formData.birthdate}
          onChange={handleChange}
        />
      </label>
      <label>
        Country:
        <Select
          options={countries}
          value={countries.find((c) => c.value === formData.country)}
          onChange={handleCountryChange}
        />
      </label>
      <label>
        Profile Picture:
        <input
          type="file"
          name="profilePicture"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
      <button className="update-profile-button" type="submit">
        Update Profile
      </button>
    </form>
  );
};

export default UpdateProfileForm;



