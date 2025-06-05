import mongoose from 'mongoose';

export const connectDB = async() => {
  try {
    await mongoose.connect("mongodb+srv://revaztsitsvidze:revaztsitsvidze@thinkboard.k1ry3lm.mongodb.net/thinkboard_db?retryWrites=true&w=majority&appName=Thinkboard")
    console.log("MONGODB CONNECTED");
  } catch(error) {
    console.log(error);
  }
}