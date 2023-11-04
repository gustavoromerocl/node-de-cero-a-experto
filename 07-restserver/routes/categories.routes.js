const { Router } = require('express')
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validation-pipe');

const router = Router()

router.get('/', (req, res) => res.json({ msg: 'get' }))
router.get('/:id', (req, res) => res.json({ msg: 'get id' }))
router.post('/', (req, res) => res.json({ msg: 'post' }))
router.put('/:id', (req, res) => res.json({ msg: 'update id' }))
router.delete('/:id', (req, res) => res.json({ msg: 'delete id' }))




module.exports = router;