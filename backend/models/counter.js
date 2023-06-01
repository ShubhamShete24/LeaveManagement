import mongoose from 'mongoose';

const counterSchema = mongoose.Schema(
  {
    index: {
      type: Number,
      required: true
    },
    name: {
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
const Counter = mongoose.model('counters', counterSchema);
export default Counter;
