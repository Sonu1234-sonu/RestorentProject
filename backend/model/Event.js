import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    date: { type: String, required: true },
    category: { type: String },
    imageUrl: { type: String },
    videoUrl: { type: String },
    createdAt: { type: Date, default: Date.now },
})

const Event = mongoose.model('Event', eventSchema)
export default Event
