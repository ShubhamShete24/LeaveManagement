import mongoose from 'mongoose';

const personalDetailsSchema = mongoose.Schema(
  {
    address: {
      type: String,
      required: true
    },
    nationality: {
      type: String,
      required: true
    },
    bloodGroup: {
      type: String
    },
    dob: {
      type: Date,
      required: true
    },
    maritalStatus: {
      type: String,
      required: true
    },
    marriageDate: {
      type: Date
    },
    fatherName: {
      type: String,
      required: true
    },
    emergencyContactName: {
      type: String,
      required: true
    },
    emergencyContactNo: {
      type: Number,
      required: true
    },
    PAN: {
      type: String,
      required: true
    },
    aadhaarNumber: {
      type: Number,
      required: true
    },
    physicallyChallenged: {
      type: Boolean,
      required: true
    },
    internationalEmployee: {
      type: Boolean,
      required: true
    },
    educationalDetails: {
      type: mongoose.Types.ObjectId,
      ref: 'educationDetails',
      required: false
    },
    bankDetails: {
      type: mongoose.Types.ObjectId,
      ref: 'banks',
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

const PersonalDetails = mongoose.model('personalDetails', personalDetailsSchema);
export default PersonalDetails;
