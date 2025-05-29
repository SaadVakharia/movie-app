import React from "react";

const IMAGE_BASE_URL = import.meta.env.VITE_TMDB_IMAGE_URL;

const MovieCard = ({
  movie: { title, vote_average, poster_path, release_date },
}) => {
  return (
    <div className="movie-card">
      <img src={poster_path ? IMAGE_BASE_URL + `/${poster_path}` : "./no-poster.png"} alt="" />

      <div className="mt-4">
        <h3>{title}</h3>

        <div className="content">
            <div className="rating">
                <img src="./star.svg" alt="Star" />
                <p>{vote_average ? vote_average.toFixed(1) : 'N/A'}</p>
            </div>
            
            <span>•</span>
            <p className="year">
              {release_date ? new Date(release_date).getFullYear() : 'N/A'}
            </p>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
