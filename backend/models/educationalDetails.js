import mongoose from 'mongoose';

const educationSchema = mongoose.Schema(
  {
    degree: {
      type: String
    },
    duration: {
      type: String
    },
    institute: {
      type: String
    }
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    }
  }
);

const Education = mongoose.model('education', educationSchema);
export default Education;
