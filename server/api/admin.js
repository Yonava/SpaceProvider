const express = require('express');
const router = express.Router();
const Room = require('../schemas/rooms');

router.get('/', async (req, res) => {
  const rooms = await Room.find();
  res.json(rooms);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const room = await Room.findById(id);
  res.json(room);
});

router.post('/', async (req, res) => {
  const { body } = req;
  const room = new Room(body);
  await room.save();
  res.json(room);
});

router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const room = await Room.findByIdAndUpdate(id, body, {
    new: true
  });
  res.json(room);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Room.findByIdAndDelete(id);
  res.json({
    message: 'Room deleted'
  });
});

module.exports = router;