import mongoose from 'mongoose';

const leaveApplicationSchema = mongoose.Schema(
  {
    fromDate: {
      type: Date,
      required: true
    },
    fromSession: {
      type: String,
      required: true
    },
    toDate: {
      type: Date,
      required: true
    },
    toSession: {
      type: String,
      required: true
    },
    leaveCount: {
      type: Number,
      required: true
    },
    leaveTypeId: {
      type: mongoose.Types.ObjectId,
      ref: 'leaveTypes',
      required: true
    },
    reportingManagerId: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: true
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: true
    },
    reason: {
      type: String,
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
