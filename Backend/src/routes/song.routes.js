const express = require('express')

const router = express.Router()

router.post('/song', (req, res) => {
    console.log(req.body)
    res.send('Song received')
})

module.exports = router;