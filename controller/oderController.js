import orderModel from '../model/orderModel.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()
// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'joysutradhorcmt@gmail.com',
    pass: 'fysegybjglucpyit'
  }
})

// Format the selected services into a list
// const servicesList = orderDetails.selectedServices?.length
//   ? `<ul>${orderDetails.selectedServices
//       .map(service => `<li>${service}</li>`)
//       .join('')}</ul>`
//   : '<p>No services selected</p>'

// Function to send email
const sendBookingEmail = async orderDetails => {
  console.log(orderDetails)
  const mailOptions = {
    from: 'joysutradhorcmt@gmail.com',
    to: 'clientcredentialsmain@gmail.com',
    subject: 'New Order Received',
    html: `
      <h2>New Order Details</h2>
      <p><strong>Name:</strong> ${orderDetails.customerName}</p>
      <p><strong>Phone:</strong> ${orderDetails.phone}</p>
      <p><strong>Email:</strong> ${orderDetails.email || 'N/A'}</p>
     
    `
  }

  try {
    await transporter.sendMail(mailOptions)
    console.log('Booking email sent to admin.')
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

export const getOrders = async (req, res) => {
  try {
    const getAllOrders = await orderModel
      .find({ status: 'pending' })
      .sort({ createdAt: -1 })
    if (getAllOrders.length === 0) {
      return res.status(404).json({ message: 'user not found' })
    }
    res.status(200).json(getAllOrders)
  } catch (error) {
    res.status(500).json({ error: 'Orders not found or empty' })
  }
}

// get accepted order list
export const getAcceptedOrder = async (req, res) => {
  try {
    const getAllAcceptOrders = await orderModel
      .find({ status: 'accepted' })
      .sort({ createdAt: -1 })
    if (getAllAcceptOrders.length === 0) {
      return res.status(404).json({ message: 'user not found' })
    }
    res.status(200).json(getAllAcceptOrders)
  } catch (error) {
    res.status(500).json({ error: 'Orders not found or empty' })
  }
}

export const multipleOrders = async (req, res) => {
  const getUserPhone = req.params.phone

  try {
    const userOrders = await orderModel
      .find({ phone: getUserPhone })
      .sort({ createdAt: -1 })

    if (userOrders.length === 0) {
      return res.status(404).json({ message: 'No Bookings Found' })
    }

    res.status(200).json(userOrders)
  } catch (error) {
    res.status(500).json({ message: 'Server error' })
  }
}

export const create = async (req, res) => {
  try {
    const orderData = new orderModel(req.body)

    const saveOrder = await orderData.save()
    await sendBookingEmail(saveOrder)

    res.status(200).json(saveOrder)
  } catch (error) {
    res.status(500).json({ error: 'Internal server error .' })
  }
}

export const updateOrder = async (req, res) => {
  try {
    const { id } = req.params
    console.log(id)

    // Check if the order exists
    const isOrderExists = await orderModel.findById(id)
    if (!isOrderExists) {
      return res.status(404).json({ message: 'Order not found' })
    }

    // Update only the status field to "accepted"
    const updatedOrder = await orderModel.findByIdAndUpdate(
      id,
      { status: 'accepted' },
      { new: true } // Returns the updated document
    )

    res.status(200).json(updatedOrder)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id
    const checkOrder = await orderModel.findOne({ _id: id })

    if (!checkOrder) {
      return res.status(404).json({ error: 'Order item not found' })
    }

    await orderModel.findByIdAndDelete(id)
    res.status(200).json({ message: 'user delete successfully' })
  } catch (error) {
    res.json(500).json({ error: 'Internal server error' })
  }
}

export const fetch = async (req, res) => {
  try {
    return res.json('Hello')
  } catch (error) {
    res.status(500).json({ error: 'Internal server error .' })
  }
}
