import Order from '../model/Order.js'
import MenuItem from '../model/MenuItem.js'
import Coupon from '../model/Coupon.js'
import mongoose from 'mongoose'

export const createOrder = async (req, res, next) => {
    try {
        const requestedItems = req.body.items
        const deliveryType = req.body.deliveryType || 'Pickup'
        const couponCode = typeof req.body.coupon === 'string' ? req.body.coupon.trim().toUpperCase() : ''

        if (!Array.isArray(requestedItems) || requestedItems.length === 0) {
            return res.status(400).json({ error: 'Add at least one item to your order' })
        }
        if (!['Pickup', 'Delivery'].includes(deliveryType)) {
            return res.status(400).json({ error: 'Invalid delivery type' })
        }

        const quantities = new Map()
        for (const item of requestedItems) {
            const quantity = Number(item.quantity)
            if (!item.menuItem || !mongoose.isValidObjectId(item.menuItem) || !Number.isInteger(quantity) || quantity < 1) {
                return res.status(400).json({ error: 'Each order item needs a menu item and a valid quantity' })
            }
            quantities.set(String(item.menuItem), (quantities.get(String(item.menuItem)) || 0) + quantity)
        }

        const menuItems = await MenuItem.find({ _id: { $in: [...quantities.keys()] }, available: true })
        if (menuItems.length !== quantities.size) {
            return res.status(400).json({ error: 'One or more selected menu items are unavailable' })
        }

        const items = menuItems.map((menuItem) => ({
            menuItem: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: quantities.get(String(menuItem._id)),
        }))
        const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
        let discount = 0

        if (couponCode) {
            const coupon = await Coupon.findOne({
                code: couponCode,
                active: true,
                $or: [{ expiresAt: { $exists: false } }, { expiresAt: null }, { expiresAt: { $gte: new Date() } }],
            })
            if (!coupon) return res.status(400).json({ error: 'Coupon is invalid or expired' })
            discount = coupon.discountType === 'percentage'
                ? subtotal * (coupon.discountValue / 100)
                : coupon.discountValue
            discount = Math.min(discount, subtotal)
        }

        const order = await Order.create({
            user: req.user.id,
            items,
            subtotal,
            discount,
            total: subtotal - discount,
            deliveryType,
            coupon: couponCode || undefined,
        })
        res.status(201).json({ order })
    } catch (error) {
        next(error)
    }
}

export const listMyOrders = async (req, res, next) => {
    try {
        const orders = await Order.find({ user: req.user.id }).sort('-createdAt')
        res.json({ orders })
    } catch (error) {
        next(error)
    }
}

export const listOrders = async (req, res, next) => {
    try {
        const orders = await Order.find().sort('-createdAt')
        res.json({ orders })
    } catch (error) {
        next(error)
    }
}

export const updateOrder = async (req, res, next) => {
    try {
        const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, {
            new: true,
            runValidators: true,
        })
        if (!order) return res.status(404).json({ error: 'Order not found' })
        res.json({ order })
    } catch (error) {
        next(error)
    }
}
