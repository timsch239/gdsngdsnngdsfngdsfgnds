const Commission = require('../models/commissionsModel')

const getCommissions = async (req, res) => {
    try {
        const user_id = req.user._id

        const commissions = await Commission.find({ user_id }).sort({ createdAt: -1 })

        res.status(200).json(commissions)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getCommission = async (req, res) => {
    const { id } = req.params

    try {
        const commission = await Commission.findById(id)

        if (!commission) return res.status(404).json({ error: 'No such commission' })

        res.status(200).json(commission)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const createCommission = async (req, res) => {
    const { name, mail, request, size, colorSet, detailSet } = req.body

    let emptyFields = []

    if (!name) {
        emptyFields.push('name')
    }
    if (!mail) {
        emptyFields.push('mail')
    }
    if (!request) {
        emptyFields.push('request')
    }
    if (!size) {
        emptyFields.push('size')
    }
    if (!colorSet) {
        emptyFields.push('colorSet')
    }
    if (!detailSet) {
        emptyFields.push('detailSet')
    }

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields })
    }

    try {
        const user_id = req.user._id

        const commission = await Commission.create({ name, mail, request, size, colorSet, detailSet, user_id })
        res.status(201).json(commission)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const deleteCommission = async (req, res) => {
    const { id } = req.params

    try {
        const deletedCommission = await Commission.findOneAndDelete({ _id: id })

        if (!deletedCommission) return res.status(404).json({ error: 'No such commission' })

        res.status(200).json(deletedCommission)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateCommission = async (req, res) => {
    const { id } = req.params

    try {
        const updatedCommission = await Commission.findOneAndUpdate({ _id: id }, { ...req.body })

        if (!updatedCommission) return res.status(404).json({ error: 'No such commission' })

        res.status(200).json(updatedCommission)
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

module.exports = {
    getCommissions,
    getCommission,
    createCommission,
    deleteCommission,
    updateCommission
}