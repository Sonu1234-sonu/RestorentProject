import Contact from '../model/Contact.js'

export const listContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find().sort('-createdAt')
        res.json({ contacts })
    } catch (error) {
        next(error)
    }
}

export const createContact = async (req, res, next) => {
    try {
        const contact = await Contact.create(req.body)
        res.status(201).json({ contact })
    } catch (error) {
        next(error)
    }
}

export const updateContact = async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        if (!contact) return res.status(404).json({ error: 'Contact not found' })
        res.json({ contact })
    } catch (error) {
        next(error)
    }
}

export const deleteContact = async (req, res, next) => {
    try {
        const contact = await Contact.findByIdAndDelete(req.params.id)
        if (!contact) return res.status(404).json({ error: 'Contact not found' })
        res.json({ message: 'Contact deleted' })
    } catch (error) {
        next(error)
    }
}
