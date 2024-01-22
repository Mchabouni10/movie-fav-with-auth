import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const DeleteMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const deleteMovie = async () => {
      try {
        const response = await fetch(`/api/movies/${id}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`Failed to delete movie. HTTP error ${response.status}`);
        }

        navigate('/favorites'); 
      } catch (error) {
        console.error('Error deleting movie:', error);
      }
    };

    deleteMovie();
  }, [id, navigate]);

  return (
    <div>
      <h2>Deleting Movie...</h2>
    </div>
  );
};

export default DeleteMovie;
