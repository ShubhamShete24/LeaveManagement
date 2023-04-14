import mongoose from 'mongoose';

const connectDB = async (DB_URL, DB_NAME) => {
  try {
    const DB_OPTION = {
      dbName: DB_NAME
    };
    await mongoose.connect(DB_URL, DB_OPTION);
    // eslint-disable-next-line no-console
    console.log('Connected to database successfully.');
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(err);
  }
};
export default connectDB;
