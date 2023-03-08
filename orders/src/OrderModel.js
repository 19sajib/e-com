const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  products: [{ type: String, required: true }],
  status: { type: String, required: true },
  totalPrice: { type: Number, required: true },
},{timestamps: true});

const OrderModel = mongoose.model('Order', OrderSchema);

module.exports = OrderModel

