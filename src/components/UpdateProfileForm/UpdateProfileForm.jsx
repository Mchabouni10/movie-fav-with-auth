import React, { useState } from "react";
import Select from "react-select"; 
import * as usersService from "../../utilities/users-service";
import styles from "./UpdateProfileForm.module.css";

// Define the countries array
const countries = [
  { value: "USA", label: "United States" },
  // Add more countries as needed
];

const UpdateProfileForm = ({ onUpdate }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    birthdate: "",
    country: "",
    profilePicture: null, // Use null to track the selected file
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profilePicture: e.target.files[0], // Set the selected file
    });
  };

  // Define the handleCountryChange function
  const handleCountryChange = (selectedOption) => {
    setFormData({
      ...formData,
      country: selectedOption.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create a FormData object to send the form data including the file
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("birthdate", formData.birthdate);
      formDataToSend.append("country", formData.country);
      formDataToSend.append("profilePicture", formData.profilePicture);

      // Make a PUT request to update the user profile
      const updatedUser = await usersService.updateUserProfile(formDataToSend);

      // Trigger the onUpdate callback with the updated user data
      onUpdate(updatedUser);
    } catch (error) {
      console.error("Error updating user profile:", error);
    }
  };

  return (
    <form className={styles.container} onSubmit={handleSubmit}>
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
          type="text"
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
          onChange={handleFileChange}
        />
      </label>
      <button type="submit">Update Profile</button>
    </form>
  );
};

export default UpdateProfileForm;


