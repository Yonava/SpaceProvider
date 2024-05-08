/**
 * @module server/api/admin
 * @desc api endpoints for admin operations on rooms
 */

const express = require('express');
const router = express.Router();
const Room = require('../schemas/rooms');

router.get('/', async (req, res) => {
  try {
    const roomsWithoutImages = await Room.find({}, '-images');
    const rooms = roomsWithoutImages.map(room => ({
      ...room._doc,
      images: []
    }));
    res.json(rooms);
  } catch (error) {
    console.log('Error getting rooms', error);
    res.status(500).json({
      message: 'Error getting rooms'
    });
  }
});

router.get('/:id', async (req, res) => {
  console.log('GET /rooms/:id', req.params.id);
  const { id } = req.params;
  try {
    const room = await Room.findById(id);
    res.json(room);
  } catch (error) {
    res.status(404).json({
      message: 'Room not found'
    });
  }
});

router.post('/', async (req, res) => {
  console.log('POST /rooms', req.body.building, req.body.room);
  const { body } = req;
  try {
    const room = new Room(body);
    await room.save();
    res.json(room);
  } catch {
    console.log('Error creating room');
    res.status(500).json({
      message: 'Error creating room'
    });
  }
});

router.put('/:id', async (req, res) => {
  console.log('PUT /rooms/:id', req.body.building, req.body.room);
  const { id } = req.params;
  const { body } = req;
  try {
    const room = await Room.findByIdAndUpdate(id, { $set: body }, {
      new: true
    });
    res.json(room);
  } catch (error) {
    console.log('Error updating room');
    res.status(500).json({
      message: 'Error updating room'
    });
  }
});

router.delete('/:id', async (req, res) => {
  console.log('DELETE /rooms/:id', req.params.id);
  const { id } = req.params;
  await Room.findByIdAndDelete(id);
  res.json({
    message: 'Room deleted'
  });
});

module.exports = router;