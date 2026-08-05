import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false },
    items: [
        {
            menuItem: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
            name: { type: String, required: true },
            quantity: { type: Number, required: true, default: 1 },
            price: { type: Number, required: true },
        },
    ],
    subtotal: { type: Number, required: true, default: 0 },
    discount: { type: Number, required: true, default: 0 },
    total: { type: Number, required: true, default: 0 },
    deliveryType: { type: String, enum: ['Pickup', 'Delivery'], default: 'Pickup' },
    coupon: { type: String },
    status: { type: String, enum: ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Completed', 'Cancelled'], default: 'Pending' },
    createdAt: { type: Date, default: Date.now },
})

const Order = mongoose.model('Order', orderSchema)
export default Order
