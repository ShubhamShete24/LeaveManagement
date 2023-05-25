import mongoose from 'mongoose';

const holidaySchema = mongoose.Schema(
  {
    year: {
      type: Number,
      required: true
    },
    holidayList: [
      {
        holidayName: {
          type: String,
          required: true,
          unique: true
        },
        date: {
          type: Date,
          required: true
        }
      }
    ]
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);
const Holiday = mongoose.model('holiday', holidaySchema);
export default Holiday;
