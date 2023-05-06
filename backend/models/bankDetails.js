import mongoose from 'mongoose';

const bankDetailsSchema = mongoose.Schema({
  bankName: {
    type: String,
    required: true
  },
  accountNo: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true
  },
  IFSC: {
    type: String,
    required: true
  },
  accountType: {
    type: String,
    required: true
  }
});

const Bank = mongoose.model('bankDetails', bankDetailsSchema);
export default Bank;
