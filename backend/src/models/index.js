const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    index: true
  },
  brand: {
    type: String,
    required: true,
    index: true
  },
  category: {
    type: String,
    required: true,
    index: true
  },
  price: {
    type: Number,
    required: true,
    index: true
  },
  rating: {
    type: Number,
    default: 4.0
  },
  reviews: {
    type: Number,
    default: 0
  },
  inStock: {
    type: Boolean,
    default: true
  },
  quantity: {
    type: Number,
    default: 10
  },
  specs: {
    type: Map,
    of: String
  },
  warranty: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Order Schema
const orderSchema = new mongoose.Schema({
  orderId: {
    type: String,
    unique: true,
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  productName: String,
  quantity: {
    type: Number,
    required: true
  },
  unitPrice: Number,
  totalPrice: Number,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'shipped', 'delivered'],
    default: 'confirmed'
  },
  estimatedDelivery: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Review Schema
const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  comment: String,
  sentiment: {
    type: String,
    enum: ['positive', 'neutral', 'negative']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Product = mongoose.model('Product', productSchema);
const Order = mongoose.model('Order', orderSchema);
const Review = mongoose.model('Review', reviewSchema);

module.exports = {
  Product,
  Order,
  Review,
  productSchema,
  orderSchema,
  reviewSchema
};
