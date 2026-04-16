import mongoose from 'mongoose';

const lessonSchema = new mongoose.Schema({
  id: Number,
  title: String,
  description: String,
  videoUrl: String,
  resources: [String],
});

const moduleSchema = new mongoose.Schema({
  id: Number,
  title: String,
  lessons: [lessonSchema],
});

const courseSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: true,
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Please provide a course title'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a course description'],
    },
    category: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: true,
    },
    instructor_id: {
      type: Number,
      required: true,
    },
    duration: String,
    rating: Number,
    reviews: Number,
    image: String,
    keyPoints: [String],
    prerequisites: [String],
    learnings: [String],
    modules: [moduleSchema],
  },
  { timestamps: true }
);

export default mongoose.model('Course', courseSchema);
