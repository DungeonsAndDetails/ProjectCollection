const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    addressLine1: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
    },
    monthlyRent: {
      type: Number,
      required: true,
      min: 0,
    },
    bedrooms: {
      type: Number,
      default: 0,
      min: 0,
    },
    bathrooms: {
      type: Number,
      default: 1,
      min: 0,
    },
    status: {
      type: String,
      enum: ['draft', 'available', 'leased'],
      default: 'draft',
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Property', propertySchema);
