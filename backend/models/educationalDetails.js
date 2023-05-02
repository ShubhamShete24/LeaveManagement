import mongoose from 'mongoose';

const educationDetailsSchema = mongoose.Schema(
  {
    degree: {
      type: String,
      required: true
    },
    duration: {
      type: String,
      required: true
    },
    institute: {
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

const Education = mongoose.model('educationDetails', educationDetailsSchema);
export default Education;
