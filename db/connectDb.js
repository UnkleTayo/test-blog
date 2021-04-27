import mongoose from 'mongoose';
import dotenv from 'dotenv'



dotenv.config()

const  dbURI = `mongodb+srv://pandaBlogAdmin:${process.env.DB_PASSWORD}@cluster0.odxtu.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
}

export const connectDB = async (portListen) => {
  try {
    const conn = await mongoose.connect(dbURI, options);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
    portListen()
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

