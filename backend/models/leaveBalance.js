import mongoose from 'mongoose';

const leaveBalanceSchema = mongoose.Schema(
  {
    leaveTypeId: {
      type: mongoose.Types.ObjectId,
      ref: 'leavetypes',
      required: true
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: true
    },
    leaveBalance: {
      type: Number,
      required: true
    },
    leaveBalanceUpdatedForMonth: {
      type: Number,
      required: true
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);
const LeaveBalance = mongoose.model('leavebalance', leaveBalanceSchema);
export default LeaveBalance;
