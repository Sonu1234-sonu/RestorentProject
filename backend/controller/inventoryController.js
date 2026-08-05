import Inventory from '../model/Inventory.js'

export const listInventory = async (req, res, next) => {
    try {
        const items = await Inventory.find().sort('-createdAt')
        res.json({ items })
    } catch (error) {
        next(error)
    }
}

export const createInventoryItem = async (req, res, next) => {
    try {
        const item = await Inventory.create(req.body)
        res.status(201).json({ item })
    } catch (error) {
        next(error)
    }
}

export const updateInventoryItem = async (req, res, next) => {
    try {
        const item = await Inventory.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        if (!item) return res.status(404).json({ error: 'Inventory item not found' })
        res.json({ item })
    } catch (error) {
        next(error)
    }
}

export const deleteInventoryItem = async (req, res, next) => {
    try {
        const item = await Inventory.findByIdAndDelete(req.params.id)
        if (!item) return res.status(404).json({ error: 'Inventory item not found' })
        res.json({ message: 'Inventory item deleted' })
    } catch (error) {
        next(error)
    }
}
