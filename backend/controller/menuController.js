import MenuItem from '../model/MenuItem.js'

const starterMenu = [
    { name: 'Espresso Martini', category: 'Cocktails', description: 'Vodka, espresso, coffee liqueur and a velvet crema.', price: 16, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=85' },
    { name: 'Citrus Smash', category: 'Cocktails', description: 'Gin, fresh citrus, mint and sparkling soda.', price: 14, image: 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=900&q=85' },
    { name: 'Dangi Burrata', category: 'Small plates', description: 'Charred peaches, basil oil and grilled sourdough.', price: 15, image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=900&q=85' },
    { name: 'Truffle Fries', category: 'Small plates', description: 'Crisp fries, parmesan, herbs and truffle aioli.', price: 12, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85' },
    { name: 'Smoked Chicken Sliders', category: 'Mains', description: 'Buttermilk buns, smoked chicken and house slaw.', price: 18, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85' },
    { name: 'Midnight Tiramisu', category: 'Sweet', description: 'Espresso-soaked layers, mascarpone and cocoa.', price: 11, image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=900&q=85' },
]

export const listMenu = async (req, res, next) => {
    try {
        const totalItems = await MenuItem.countDocuments()
        if (totalItems === 0) await MenuItem.insertMany(starterMenu)
        const items = await MenuItem.find({ available: true })
        res.json({ items })
    } catch (error) {
        next(error)
    }
}

export const createMenuItem = async (req, res, next) => {
    try {
        const item = await MenuItem.create(req.body)
        res.status(201).json({ item })
    } catch (error) {
        next(error)
    }
}

export const updateMenuItem = async (req, res, next) => {
    try {
        const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        if (!item) return res.status(404).json({ error: 'Menu item not found' })
        res.json({ item })
    } catch (error) {
        next(error)
    }
}

export const deleteMenuItem = async (req, res, next) => {
    try {
        const item = await MenuItem.findByIdAndDelete(req.params.id)
        if (!item) return res.status(404).json({ error: 'Menu item not found' })
        res.json({ message: 'Menu item deleted' })
    } catch (error) {
        next(error)
    }
}
