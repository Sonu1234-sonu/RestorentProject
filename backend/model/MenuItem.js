import mongoose from 'mongoose'

const menuItemSchema = new mongoose.Schema({
    category: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    available: { type: Boolean, default: true },
})

const MenuItem = mongoose.model('MenuItem', menuItemSchema)
export default MenuItem
