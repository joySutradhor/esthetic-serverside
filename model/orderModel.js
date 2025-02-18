import mongoose from 'mongoose'

const odersSchema = new mongoose.Schema({

  customerName: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },

  time : {
    type : String ,
    required :true
  } ,

  email: {
    type: String,
    required: false
  },

  selectedServices: {
    type: Array,
    required: false
  },
  
  subtotal: {
    type: Number,
    required: true
  },

},
{ timestamps: true })

export default mongoose.model("AllOrders" ,odersSchema)
