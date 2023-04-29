import mongoose from 'mongoose';

const bankSchema = mongoose.Schema({
  bankName: {
    type: String,
    required: true
  },
  accountNo: {
    type: String
  },
  branch: {
    type: String
  },
  accountType: {
    type: String
  }
});

const Bank = mongoose.model('bank', bankSchema);
export default Bank;
