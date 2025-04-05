import mongoose from 'mongoose'

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    rating: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

export default mongoose.model('AllReviews', reviewSchema)
