import mongoose from 'mongoose';

const employmentDetailsSchema = mongoose.Schema(
  {
    joiningDate: {
      type: Date,
      required: true
    },
    department: {
      type: String,
      required: false
    },
    designation: {
      type: String,
      required: false
    },
    project: {
      type: String,
      required: false
    },
    employeeType: {
      type: String,
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

const Role = mongoose.model('employmentDetails', employmentDetailsSchema);
export default Role;
