import mongoose from 'mongoose'

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String },
    phone: { type: String },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    joinedAt: { type: Date, default: Date.now },
    createdAt: { type: Date, default: Date.now },
})

const Employee = mongoose.model('Employee', employeeSchema)
export default Employee
