const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Inventory= new Schema({
//   author: ,
  inventory_id: ObjectId,
  inventory_type: String,
   item_name: String,
    available_quantity: Number
});

const createInventory = mongoose.model('createInventory', Inventory);
module.exports = createInventory;