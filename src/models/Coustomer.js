const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Customer= new Schema({
//   author: ,
  customer_Id: ObjectId,
  customer_Name: String,
  email: String,
  
});

const CustomerModel = mongoose.model('customer', Customer);
module.exports = CustomerModel;