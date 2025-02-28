import orderModel from '../model/orderModel.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()
// Configure Nodemailer
// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'joysutradhorcmt@gmail.com',
    pass: 'fysegybjglucpyit'
  }
})

// Function to send email new command
const sendBookingEmail = async orderDetails => {
  console.log(orderDetails)

  // Format the selected services into a list
  const servicesList = orderDetails.selectedServices?.length
    ? `<ul style="padding-left: 20px; color: #555;">
        ${orderDetails.selectedServices
          .map(service => `<li>${service?.serviceName}</li>`)
          .join('')}
      </ul>`
    : "<p style='color: red;'>No services selected</p>"

  // Email content
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 10px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
      <div style="background: #4B5563; color: white; padding: 10px; text-align: center; font-size: 18px; font-weight: bold; border-radius: 8px 8px 0 0;">
        New Order Details
      </div>
      <div>
        <p style="font-size: 14px;"><strong>Name:</strong> ${
          orderDetails.customerName
        }</p>
        <p style="font-size: 14px;"><strong>Phone:</strong> ${
          orderDetails.phone
        }</p>
        <p style="font-size: 14px;"><strong>Email:</strong> ${
          orderDetails.email || 'N/A'
        }</p>
        <p style="font-size: 14px;"><strong>Appointment Time:</strong> ${
          orderDetails.time || 'N/A'
        }</p>
        <p style="font-size: 14px;"><strong>Appointment Date:</strong> ${
          orderDetails.date || 'N/A'
        }</p>
        <p style="font-size: 14px; font-weight: bold;">Selected Services:</p>
        ${servicesList}
        <p style="margin-top: 20px;">
          <a href="https://estheticsbynoemi.com/adminDashboard" style="background-color: #4B5563; color: white; padding: 10px 15px; margin-top: 20px;margin-bottom: 20px; text-decoration: none; border-radius: 5px; font-size: 14px;">See Appointment</a>
        </p>
      </div>
      <div style="background: #f4f4f4; margin-top: 30px; padding: 10px 5px; text-align: center; font-size: 12px; color: #777; border-radius: 0 0 8px 8px;">
        &copy; 2025 Esthetics by Noemi. All Rights Reserved.
      </div>
    </div>
  `

  // Admin Email Options
  const adminMailOptions = {
    from: 'Noemidlrosario@hotmail.com',
    to: 'clientcredentialsmain@gmail.com',
    subject: 'New Order Received',
    html: emailHtml
  }

  try {
    // Send email to admin
    await transporter.sendMail(adminMailOptions)
    console.log('Booking email sent to admin.')

    // Send email to customer if email is provided
    if (orderDetails.email) {
      const customerMailOptions = {
        from: 'Noemidlrosario@hotmail.com',
        to: orderDetails.email,
        subject: 'Booking Confirmation - Esthetics by Noemi',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 10px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
            <div style="background: #4B5563; color: white; padding: 10px; text-align: center; font-size: 18px; font-weight: bold; border-radius: 8px 8px 0 0;">
              Booking Confirmation
            </div>
            <div>
              <p style="font-size: 14px;">Dear ${orderDetails.customerName},</p>
              <p style="font-size: 14px;">Thank you for booking with us! Here are your appointment details:</p>
              <p style="font-size: 14px;"><strong>Appointment Date:</strong> ${orderDetails.date}</p>
              <p style="font-size: 14px;"><strong>Appointment Time:</strong> ${orderDetails.time}</p>
              <p style="font-size: 14px;"><strong>Services:</strong></p>
              ${servicesList}
              <p style="margin-top: 20px;">We look forward to seeing you!</p>
            </div>
            <div style="background: #f4f4f4; margin-top: 30px; padding: 10px 5px; text-align: center; font-size: 12px; color: #777; border-radius: 0 0 8px 8px;">
              &copy; 2025 Esthetics by Noemi. All Rights Reserved.
            </div>
          </div>
        `
      }

      await transporter.sendMail(customerMailOptions)
      console.log('Booking confirmation email sent to customer.')
    }
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
    console.log(saveOrder)
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
