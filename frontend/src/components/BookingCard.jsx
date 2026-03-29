const BookingCard = ({ booking, onCancel }) => {
  return (
    <div className="booking-card">
      <div className="booking-header">
        <h3>{booking.package?.title}</h3>
        <span className={`status status-${booking.status?.toLowerCase()}`}>
          {booking.status}
        </span>
      </div>
      <div className="booking-details">
        <p><strong>Location:</strong> {booking.package?.location}</p>
        <p><strong>Price:</strong> ${booking.package?.price}</p>
        <p><strong>Booked on:</strong> {new Date(booking.createdAt).toLocaleDateString()}</p>
      </div>
      {booking.status !== "Cancelled" && onCancel && (
        <button onClick={() => onCancel(booking._id)} className="btn btn-danger btn-small">
          Cancel Booking
        </button>
      )}
    </div>
  );
};

export default BookingCard;