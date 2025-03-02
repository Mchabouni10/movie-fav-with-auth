import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import { updateUserProfile } from "../../utilities/users-service";
import "./CompleteProfileForm.css";

const countries = [
  { value: "USA", label: "United States" },
  { value: "CA", label: "Canada" },
  // Add more countries as needed
];

const CompleteProfileForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phoneNumber: "",
    country: "",
    birthdate: "",
    profilePicture: null,
  });

  const [error, setError] = useState("");

  // Handles text input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handles file input changes
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (!selectedFile) {
      setError("No file selected.");
      return;
    }

    if (!selectedFile.type.startsWith("image/")) {
      setError("Invalid file type: Only images allowed.");
      return;
    }

    setError(""); // Clear any previous errors
    setFormData({
      ...formData,
      profilePicture: selectedFile,
    });
  };

  // Handles country selection
  const handleCountryChange = (selectedOption) => {
    setFormData({
      ...formData,
      country: selectedOption ? selectedOption.value : "",
    });
  };

  // Handles form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("phoneNumber", formData.phoneNumber);
      formDataToSend.append("country", formData.country);
      formDataToSend.append("birthdate", formData.birthdate);
      if (formData.profilePicture) {
        formDataToSend.append("profilePicture", formData.profilePicture);
      }

      const updatedUser = await updateUserProfile(formDataToSend);

      if (updatedUser) {
        navigate("/profile"); // Redirect to profile page after completion
      }
    } catch (error) {
      setError("Error updating profile. Please try again.");
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="complete-profile-container">
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Phone Number:
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Enter your phone number"
          />
        </label>
        <label>
          Country:
          <Select
            options={countries}
            value={countries.find((c) => c.value === formData.country)}
            onChange={handleCountryChange}
            isClearable
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
          Profile Picture:
          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>
        {error && <p className="error-message">{error}</p>}
        <button type="submit">Complete Profile</button>
      </form>
    </div>
  );
};

export default CompleteProfileForm;
