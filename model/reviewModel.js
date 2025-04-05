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
      required: false
    }
  },
  { timestamps: true }
)

export default mongoose.model('AllReviews', reviewSchema)
