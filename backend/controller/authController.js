import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../model/User.js'

const generateToken = (user) => {
    if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET is not defined')
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' })
}

export const registerUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) return res.status(400).json({ error: 'Missing required fields' })

        const existing = await User.findOne({ email })
        if (existing) return res.status(400).json({ error: 'Email already registered' })

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashedPassword })

        const token = generateToken(user)
        res.status(201).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token })
    } catch (error) {
        next(error)
    }
}

export const loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body
        if (!email || !password) return res.status(400).json({ error: 'Missing required fields' })

        const user = await User.findOne({ email })
        if (!user) return res.status(401).json({ error: 'Invalid credentials' })

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return res.status(401).json({ error: 'Invalid credentials' })

        const token = generateToken(user)
        res.json({ user: { id: user._id, name: user.name, email: user.email, role: user.role }, token })
    } catch (error) {
        next(error)
    }
}

export const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        if (!user) return res.status(404).json({ error: 'User not found' })
        res.json({ user })
    } catch (error) {
        next(error)
    }
}
