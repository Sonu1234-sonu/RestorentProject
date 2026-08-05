import Review from '../model/Review.js'

export const listReviews = async (req, res, next) => {
    try {
        const reviews = await Review.find().sort('-createdAt')
        res.json({ reviews })
    } catch (error) {
        next(error)
    }
}

export const updateReviewStatus = async (req, res, next) => {
    try {
        const review = await Review.findByIdAndUpdate(
            req.params.id,
            { status: req.body.status },
            { new: true },
        )
        if (!review) return res.status(404).json({ error: 'Review not found' })
        res.json({ review })
    } catch (error) {
        next(error)
    }
}

export const deleteReview = async (req, res, next) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id)
        if (!review) return res.status(404).json({ error: 'Review not found' })
        res.json({ message: 'Review deleted' })
    } catch (error) {
        next(error)
    }
}
