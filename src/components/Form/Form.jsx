import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import styles from "./Form.module.css";

function Form(props) {
  const [formData, setFormData] = useState({ searchterm: "" });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.moviesearch(formData.searchterm);
  };

  return (
    <div className={styles.SearchFormPage}>
      <form className={styles.SearchForm} onSubmit={handleSubmit}>
        <FontAwesomeIcon icon={faSearch} className={styles.searchIcon} />
        <input
          className={styles.SearchInput}
          type="text"
          name="searchterm"
          onChange={handleChange}
          value={formData.searchterm}
          placeholder="Search for a movie..."
        />
        <button className={styles.seachButton} type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Form;
