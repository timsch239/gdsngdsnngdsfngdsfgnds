const express = require('express')
const {
    createCommission,
    getCommissions,
    getCommission,
    deleteCommission,
    updateCommission
} = require('../controllers/commissionController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

router.use(requireAuth)

// TEST
const logger = (req, res, next) => {
    console.log("Blub")
    next()
}
// TEST

router.get('/', logger, getCommissions)

router.get('/:id', getCommission)

router.post('/', createCommission)

router.delete('/:id', deleteCommission)

router.patch('/:id', updateCommission)

module.exports = router