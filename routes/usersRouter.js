const express = require('express');
const UserService = require('../services/userService');

const router = express.Router();
const service = new UserService();

router.get('/', (req, res) => {
  const users = service.find();
  res.json(users);
});

router.post('/', (req, res) => {
  const body = req.body;
  const newUser = service.create(body);
  res.json(newUser);
});

//////  id  ///////////

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const product = service.update(id, body)
  res.json(product);
});


router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const rta = service.delete(id);
  res.json(rta);
});


router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = service.findOne(id);
  res.json(user);
});

module.exports = router;
