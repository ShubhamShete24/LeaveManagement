import mongoose from 'mongoose';

const leaveApplicationSchema = mongoose.Schema(
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
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);
const LeaveApplication = mongoose.model('leaveApplication', leaveApplicationSchema);
export default LeaveApplication;
