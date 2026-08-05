import mongoose from 'mongoose'

const couponSchema = new mongoose.Schema({
    code: { type: String, required: true, unique: true },
    discountType: { type: String, enum: ['percentage', 'fixed'], default: 'percentage' },
    discountValue: { type: Number, required: true },
    expiresAt: { type: Date },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
})

const Coupon = mongoose.model('Coupon', couponSchema)
export default Coupon
