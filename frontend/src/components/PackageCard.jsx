import React from "react";

const PackageCard = ({ pkg, onBook }) => {
  return (
    <div className="package-card">
      {pkg.imageUrl ? (
        <img src={pkg.imageUrl} alt={pkg.title} className="package-image" onError={(e) => e.target.src = "https://via.placeholder.com/300x200?text=No+Image"} />
      ) : (
        <div className="package-image-placeholder">📸 No Image</div>
      )}
      <div className="package-content">
        <h3>{pkg.title}</h3>
        <div className="package-meta">
          <p className="location">📍 {pkg.location}</p>
          <p className="description">{pkg.description}</p>
          <p className="price">💵 ${parseFloat(pkg.price).toFixed(2)}</p>
        </div>
        <button onClick={() => onBook(pkg._id)} className="btn btn-book">
          Book Now
        </button>
      </div>
    </div>
  );
};

export default PackageCard;