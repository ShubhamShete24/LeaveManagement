import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
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
    role: {
      type: mongoose.Types.ObjectId,
      ref: 'roles',
      required: false
    },
    reportingManager: {
      type: mongoose.Types.ObjectId,
      ref: 'users',
      required: false
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
