import Reservation from '../model/Reservation.js'

export const createReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.create(req.body)
        res.status(201).json({ reservation })
    } catch (error) {
        next(error)
    }
}

export const listReservations = async (req, res, next) => {
    try {
        const reservations = await Reservation.find().sort('-date')
        res.json({ reservations })
    } catch (error) {
        next(error)
    }
}

export const updateReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        if (!reservation) return res.status(404).json({ error: 'Reservation not found' })
        res.json({ reservation })
    } catch (error) {
        next(error)
    }
}

export const deleteReservation = async (req, res, next) => {
    try {
        const reservation = await Reservation.findByIdAndDelete(req.params.id)
        if (!reservation) return res.status(404).json({ error: 'Reservation not found' })
        res.json({ message: 'Reservation deleted' })
    } catch (error) {
        next(error)
    }
}
