import Coupon from '../model/Coupon.js'

export const listCoupons = async (req, res, next) => {
    try {
        const coupons = await Coupon.find().sort('-createdAt')
        res.json({ coupons })
    } catch (error) {
        next(error)
    }
}

export const createCoupon = async (req, res, next) => {
    try {
        const coupon = await Coupon.create(req.body)
        res.status(201).json({ coupon })
    } catch (error) {
        next(error)
    }
}

export const updateCoupon = async (req, res, next) => {
    try {
        const coupon = await Coupon.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        if (!coupon) return res.status(404).json({ error: 'Coupon not found' })
        res.json({ coupon })
    } catch (error) {
        next(error)
    }
}

export const deleteCoupon = async (req, res, next) => {
    try {
        const coupon = await Coupon.findByIdAndDelete(req.params.id)
        if (!coupon) return res.status(404).json({ error: 'Coupon not found' })
        res.json({ message: 'Coupon deleted' })
    } catch (error) {
        next(error)
    }
}
