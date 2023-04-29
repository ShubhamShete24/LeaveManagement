import mongoose from 'mongoose';

const personalDetailsSchema = mongoose.Schema(
  {
    FullName: {
      type: String,
      required: true
    },
    address: {
      type: String
    },
    nationality: {
      type: String
    },
    bloodGroup: {
      type: String
    },
    dob: {
      type: Date
    },
    maritalStatus: {
      type: String
    },
    marriageDate: {
      type: Date
    },
    fatherName: {
      type: String
    },
    emergencyContactName: {
      type: String
    },
    emergencyContactNo: {
      type: Number
    },
    PAN: {
      type: String
    },
    physicallyChallenged: {
      type: Boolean
    },
    internationalEmployee: {
      type: Boolean
    },
    educationalDetails: {
      type: mongoose.Types.ObjectId,
      ref: 'educations',
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
