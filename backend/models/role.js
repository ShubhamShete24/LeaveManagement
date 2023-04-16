import mongoose from 'mongoose';

const roleSchema = mongoose.Schema(
  {
    roleName: {
      type: String,
      required: true,
      unique: true,
      trim: true
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Role = mongoose.model('role', roleSchema);
export default Role;
