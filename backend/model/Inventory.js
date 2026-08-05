import mongoose from 'mongoose'

const inventorySchema = new mongoose.Schema({
    item: { type: String, required: true },
    category: { type: String },
    quantity: { type: Number, default: 0 },
    unit: { type: String, default: 'pcs' },
    threshold: { type: Number, default: 0 },
    status: { type: String, enum: ['available', 'low', 'out'], default: 'available' },
    createdAt: { type: Date, default: Date.now },
})

const Inventory = mongoose.model('Inventory', inventorySchema)
export default Inventory
