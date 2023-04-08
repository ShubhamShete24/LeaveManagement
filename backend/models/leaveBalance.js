import mongoose from 'mongoose';

const leaveBalanceSchema = mongoose.Schema({
    leaveType: {
        type: mongoose.Types.ObjectId, 
        ref: 'leaveTypes',
        required : true
    },
    leaveBalance : {
        type : Number,
        required : true,
    },
    user:{
        type : mongoose.Types.ObjectId,
        ref: 'users'
    },
    leaveBalanceUpdatedForMonth: {
        type: Number,
        required: true
    }
},{
    timestamps : {
        createdAt: true,
        updatedAt: true
    }
});

const LeaveBalance = mongoose.model('leaveBalance', leaveBalanceSchema);

export default LeaveBalance;