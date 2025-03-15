const mongoose = require('mongoose');

const ComplaintSchema = new mongoose.Schema({
  username: String,
  contact: String,
  pincode: String,
  state: String,
  street: String,
  address: String,
  complaint: String,
  category: String,
  entities: [String],
  original_complaint: String,
  preprocessed_complaint: String,
  sentiment: String,
  sub_category: String,
}); 

const Complaint = mongoose.model('Complaint', ComplaintSchema);

module.exports = Complaint;
