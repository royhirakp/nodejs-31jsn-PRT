const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const OrderTable= new Schema({
  coustomer_Id: String,
  inventory_id: String,
  item_name: String,
  Quantity: String
  
});

const OrderTableModel = mongoose.model('order', OrderTable);
module.exports = OrderTableModel;