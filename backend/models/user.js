import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    mobileNumber: {
      type: Number,
      required: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },
    hash: {
      type: String,
      required: true
    },
    salt: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    employeeId: {
      type: String,
      required: true
    },
    reportingManager: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: true
    },
    role: {
      type: mongoose.Types.ObjectId,
      ref: 'roles',
      required: true
    },
    personalDetails: {
      type: mongoose.Types.ObjectId,
      ref: 'personalDetails',
      required: false
    },
    employmentDetails: {
      type: mongoose.Types.ObjectId,
      ref: 'employmentDetails',
      required: false
    },
    status: {
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
const User = mongoose.model('user', userSchema);
export default User;
