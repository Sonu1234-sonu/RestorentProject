import mongoose from 'mongoose'

const reservationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    guests: { type: Number, required: true },
    seating: { type: String, enum: ['Indoor', 'Outdoor'], default: 'Indoor' },
    tableNumber: { type: String },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Completed', 'Cancelled', 'Rejected'], default: 'Pending' },
    specialRequests: { type: String },
    createdAt: { type: Date, default: Date.now },
})

const Reservation = mongoose.model('Reservation', reservationSchema)
export default Reservation
