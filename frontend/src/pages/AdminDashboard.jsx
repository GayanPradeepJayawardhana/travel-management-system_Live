import { useEffect, useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext.jsx";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [packages, setPackages] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Form state for adding new package
  const [newPackage, setNewPackage] = useState({
    title: "",
    description: "",
    location: "",
    price: "",
    imageUrl: "",
  });

  // Fetch packages and bookings
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const resPackages = await API.get("/packages");
        setPackages(resPackages.data);

        const resBookings = await API.get("/bookings");
        setBookings(resBookings.data);
      } catch (err) {
        setError("Failed to fetch data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Add new package
  const handleAddPackage = async (e) => {
    e.preventDefault();
    
    if (!newPackage.title || !newPackage.description || !newPackage.location || !newPackage.price) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      const res = await API.post("/packages", {
        ...newPackage,
        price: parseFloat(newPackage.price),
      });
      setPackages((prev) => [...prev, res.data]);
      setNewPackage({ title: "", description: "", location: "", price: "", imageUrl: "" });
      alert("Package added successfully");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add package");
    }
  };

  // Delete package
  const handleDeletePackage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) {
      return;
    }

    try {
      await API.delete(`/packages/${id}`);
      setPackages((prev) => prev.filter((p) => p._id !== id));
      alert("Package deleted successfully");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to delete package");
    }
  };

  if (loading) {
    return <div className="loading">Loading admin dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h2>Admin Dashboard</h2>
        <p>Welcome, {user?.name}! Manage travel packages and bookings</p>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Add Package Form */}
      <div className="admin-section">
        <h3>Add New Travel Package</h3>
        <form onSubmit={handleAddPackage} className="package-form">
          <div className="form-row">
            <div className="form-group">
              <input
                placeholder="Package Title"
                value={newPackage.title}
                onChange={(e) => setNewPackage({ ...newPackage, title: e.target.value })}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Location"
                value={newPackage.location}
                onChange={(e) => setNewPackage({ ...newPackage, location: e.target.value })}
                className="form-input"
                required
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <input
                placeholder="Price ($)"
                type="number"
                step="0.01"
                value={newPackage.price}
                onChange={(e) => setNewPackage({ ...newPackage, price: e.target.value })}
                className="form-input"
                required
              />
            </div>
            <div className="form-group">
              <input
                placeholder="Image URL"
                value={newPackage.imageUrl}
                onChange={(e) => setNewPackage({ ...newPackage, imageUrl: e.target.value })}
                className="form-input"
              />
            </div>
          </div>
          <div className="form-group">
            <textarea
              placeholder="Description"
              value={newPackage.description}
              onChange={(e) => setNewPackage({ ...newPackage, description: e.target.value })}
              className="form-input"
              rows="3"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Add Package</button>
        </form>
      </div>

      {/* Packages List */}
      <div className="admin-section">
        <h3>All Packages ({packages.length})</h3>
        {packages.length === 0 ? (
          <p className="empty-state">No packages available.</p>
        ) : (
          <div className="packages-admin-grid">
            {packages.map((p) => (
              <div key={p._id} className="package-admin-card">
                {p.imageUrl && <img src={p.imageUrl} alt={p.title} />}
                <div className="package-info">
                  <h4>{p.title}</h4>
                  <p className="location">📍 {p.location}</p>
                  <p className="description">{p.description}</p>
                  <p className="price">💵 ${parseFloat(p.price).toFixed(2)}</p>
                  <button
                    onClick={() => handleDeletePackage(p._id)}
                    className="btn btn-danger btn-small"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* All Bookings */}
      <div className="admin-section">
        <h3>All Bookings ({bookings.length})</h3>
        {bookings.length === 0 ? (
          <p className="empty-state">No bookings yet.</p>
        ) : (
          <div className="bookings-admin-table">
            {bookings.map((b) => (
              <div key={b._id} className="booking-row">
                <div className="booking-info">
                  <h4>{b.user?.name}</h4>
                  <p className="email">📧 {b.user?.email}</p>
                  <p className="package">📦 {b.package?.title}</p>
                </div>
                <div className="booking-status">
                  <span className={`status status-${b.status?.toLowerCase()}`}>
                    {b.status}
                  </span>
                  <p className="date">{new Date(b.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;