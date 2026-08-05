import Event from '../model/Event.js'

export const listEvents = async (req, res, next) => {
    try {
        const events = await Event.find().sort('date')
        res.json({ events })
    } catch (error) {
        next(error)
    }
}

export const createEvent = async (req, res, next) => {
    try {
        const event = await Event.create(req.body)
        res.status(201).json({ event })
    } catch (error) {
        next(error)
    }
}

export const updateEvent = async (req, res, next) => {
    try {
        const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        if (!event) return res.status(404).json({ error: 'Event not found' })
        res.json({ event })
    } catch (error) {
        next(error)
    }
}

export const deleteEvent = async (req, res, next) => {
    try {
        const event = await Event.findByIdAndDelete(req.params.id)
        if (!event) return res.status(404).json({ error: 'Event not found' })
        res.json({ message: 'Event deleted' })
    } catch (error) {
        next(error)
    }
}
