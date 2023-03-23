import mongoose from "mongoose";
const leaveTypeSchema = mongoose.Schema({
    leaveType: {
        type: String,
        required: true,
        unique: true,
    },
    leavesAllowed: {
        type: Number,
        required: true
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
})
const LeaveType = mongoose.model('leaveType', leaveTypeSchema);
export default LeaveType; 