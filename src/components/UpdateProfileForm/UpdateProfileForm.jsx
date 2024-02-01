import React, { useState, useParams } from "react";
import Select from "react-select";
import * as usersService from "../../utilities/updateUser-service";
import "./UpdateProfileForm.css";

// Define the countries array
const countries = [
  { value: "USA", label: "United States" },
  // Add more countries as needed
];

const UpdateProfileForm = ({ onUpdate}) => {
  const { userId } = useParams(); 

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    birthdate: '',
    country: '',
    profilePicture: null,
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
      profilePicture: e.target.files[0],
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
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('birthdate', formData.birthdate);
      formDataToSend.append('country', formData.country);
      formDataToSend.append('profilePicture', formData.profilePicture);

      // Include the userId in the updateUserProfile function
      const updatedUser = await usersService.updateUserProfile(formDataToSend, userId);

       // Call onUpdate prop (if provided) with the updated user data
       if (onUpdate) {
        onUpdate(updatedUser);
      }
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  

  return (
    <form className='container' onSubmit={handleSubmit}>
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
          onChange={handleFileChange}
        />
      </label>
      <button className="update-profile-button" type="submit">Update Profile</button>
    </form>
  );
};

export default UpdateProfileForm;




