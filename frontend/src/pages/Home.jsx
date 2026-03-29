import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import PackageCard from "../components/PackageCard";
import { AuthContext } from "../context/AuthContext.jsx";

const Home = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true);
        const res = await API.get("/packages");
        setPackages(res.data);
      } catch (err) {
        setError("Failed to load packages. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  // Book package function
  const handleBook = async (packageId) => {
    if (!user) {
      alert("Please login to book a package");
      return;
    }

    try {
      await API.post("/bookings", { packageId });
      alert("Package booked successfully!");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Booking failed. Please try again.");
    }
  };

  if (loading) {
    return <div className="loading">Loading packages...</div>;
  }

  return (
    <div className="home-container">
      <div className="home-header">
        <h2>Explore Our Travel Packages</h2>
        <p>Discover amazing destinations and book your next adventure</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {packages.length === 0 ? (
        <div className="empty-state">
          <p>No packages available at the moment.</p>
        </div>
      ) : (
        <div className="packages-grid">
          {packages.map((pkg) => (
            <PackageCard key={pkg._id} pkg={pkg} onBook={handleBook} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;