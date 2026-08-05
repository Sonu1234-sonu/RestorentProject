import jwt from 'jsonwebtoken'

export const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization || req.cookies.token
    const token = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader
    if (!token) return res.status(401).json({ error: 'Not authorized' })

    if (!process.env.JWT_SECRET) {
        return res.status(500).json({ error: 'JWT_SECRET is not defined' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' })
    }
}

export const requireAdmin = (req, res, next) => {
    if (req.user?.role !== 'admin') {
        return res.status(403).json({ error: 'Admin privileges required' })
    }
    next()
}
