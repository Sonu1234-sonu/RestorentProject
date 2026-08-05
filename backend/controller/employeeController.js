import Employee from '../model/Employee.js'

export const listEmployees = async (req, res, next) => {
    try {
        const employees = await Employee.find().sort('-createdAt')
        res.json({ employees })
    } catch (error) {
        next(error)
    }
}

export const createEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.create(req.body)
        res.status(201).json({ employee })
    } catch (error) {
        next(error)
    }
}

export const updateEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        })
        if (!employee) return res.status(404).json({ error: 'Employee not found' })
        res.json({ employee })
    } catch (error) {
        next(error)
    }
}

export const deleteEmployee = async (req, res, next) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id)
        if (!employee) return res.status(404).json({ error: 'Employee not found' })
        res.json({ message: 'Employee deleted' })
    } catch (error) {
        next(error)
    }
}
