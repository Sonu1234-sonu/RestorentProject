import bcrypt from 'bcryptjs'
import User from '../model/User.js'

export const listUsers = async (req, res, next) => {
    try {
        const users = await User.find().sort('-createdAt').select('-password')
        res.json({ users })
    } catch (error) {
        next(error)
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password')
        if (!user) return res.status(404).json({ error: 'User not found' })
        res.json({ user })
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res, next) => {
    try {
        const updates = { ...req.body }
        if (updates.password) {
            updates.password = await bcrypt.hash(updates.password, 10)
        }
        const user = await User.findByIdAndUpdate(req.params.id, updates, {
            new: true,
        }).select('-password')
        if (!user) return res.status(404).json({ error: 'User not found' })
        res.json({ user })
    } catch (error) {
        next(error)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if (!user) return res.status(404).json({ error: 'User not found' })
        res.json({ message: 'User deleted' })
    } catch (error) {
        next(error)
    }
}

export const blockUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { status: 'blocked' },
            { new: true },
        ).select('-password')
        if (!user) return res.status(404).json({ error: 'User not found' })
        res.json({ user })
    } catch (error) {
        next(error)
    }
}

export const unblockUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            { status: 'active' },
            { new: true },
        ).select('-password')
        if (!user) return res.status(404).json({ error: 'User not found' })
        res.json({ user })
    } catch (error) {
        next(error)
    }
}
