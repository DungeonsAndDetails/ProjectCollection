const express = require('express');
const mongoose = require('mongoose');

const Property = require('../models/Property');

const router = express.Router();

function isValidObjectId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

router.get('/', async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 }).lean();
    res.json(properties);
  } catch {
    res.status(500).json({ message: 'Failed to fetch properties.' });
  }
});

router.get('/:id', async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid property id.' });
  }

  try {
    const property = await Property.findById(req.params.id).lean();

    if (!property) {
      return res.status(404).json({ message: 'Property not found.' });
    }

    return res.json(property);
  } catch {
    return res.status(500).json({ message: 'Failed to fetch property.' });
  }
});

router.post('/', async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json(property);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Failed to create property.' });
  }
});

router.patch('/:id', async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid property id.' });
  }

  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!property) {
      return res.status(404).json({ message: 'Property not found.' });
    }

    return res.json(property);
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: 'Failed to update property.' });
  }
});

router.delete('/:id', async (req, res) => {
  if (!isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid property id.' });
  }

  try {
    const property = await Property.findByIdAndDelete(req.params.id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found.' });
    }

    return res.status(204).send();
  } catch {
    return res.status(500).json({ message: 'Failed to delete property.' });
  }
});

module.exports = router;
