import orderModel from '../model/orderModel.js'
import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()
// Configure Nodemailer
// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'info.estheticsbynoemi@gmail.com',
    pass: 'jrjgbuayglgeibtd'
  }
})

// Function to send email new command
const sendBookingEmail = async orderDetails => {
  console.log(orderDetails)

  // Format the selected services into a list to send email
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
        <p style="font-size: 14px;"><strong>Appointment Date:</strong> ${new Date(orderDetails.date).toLocaleDateString('en-US')}</p>
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
    from: 'estheticsbynoemi@gmail.com',
    to: 'info.estheticsbynoemi@gmail.com',
    subject: 'New Order Received',
    html: emailHtml
  }

  try {
    // Send email to admin
    await transporter.sendMail(adminMailOptions)
    console.log('Booking email sent to admin.')

    // Send email to customer if email is provided
   
  } catch (error) {
    console.error('Error sending email:', error)
  }
}



// Function to send orderAccecpted
const sendAcceptedEmail = async updatedOrder => {
  console.log(updatedOrder)

  // Format the selected services into a list to send email
  const servicesList = updatedOrder.selectedServices?.length
    ? `<ul style="padding-left: 20px; color: #555;">
        ${updatedOrder.selectedServices
          .map(service => `<li>${service?.serviceName}</li>`)
          .join('')}
      </ul>`
    : "<p style='color: red;'>No services selected</p>"

  // Email content
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 10px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
      <div style="background: #008000; color: white; padding: 10px; text-align: center; font-size: 18px; font-weight: bold; border-radius: 8px 8px 0 0;">
        Your Appointment has been accepted
      </div>
      <div>
        <p style="font-size: 14px;"><strong>Name:</strong> ${
          updatedOrder.customerName
        }</p>
        <p style="font-size: 14px;"><strong>Phone:</strong> ${
          updatedOrder.phone
        }</p>
        <p style="font-size: 14px;"><strong>Email:</strong> ${
          updatedOrder.email || 'N/A'
        }</p>
        <p style="font-size: 14px;"><strong>Appointment Time:</strong> ${
          updatedOrder.time || 'N/A'
        }</p>
        <p style="font-size: 14px;"><strong>Appointment Date:</strong> ${new Date(updatedOrder.date).toLocaleDateString('en-US')}</p>
        <p style="font-size: 14px; font-weight: bold;">Selected Services:</p>
        ${servicesList}
        <p style="margin-top: 20px;">
          <a href="https://estheticsbynoemi.com/dashboard" style="background-color: #4B5563; color: white; padding: 10px 15px; margin-top: 20px;margin-bottom: 20px; text-decoration: none; border-radius: 5px; font-size: 14px;">See Appointment</a>
        </p>
      </div>
      <div style="background: #f4f4f4; margin-top: 30px; padding: 10px 5px; text-align: center; font-size: 12px; color: #777; border-radius: 0 0 8px 8px;">
        &copy; 2025 Esthetics by Noemi. All Rights Reserved.
      </div>
    </div>
  `

  // accepted Email Options
  const customerEmailOptions = {
    from: 'estheticsbynoemi@gmail.com',
    to: updatedOrder.email,
    subject: 'Your Appointment has been accepted',
    html: emailHtml
  }

  try {
    // Send email to admin
    await transporter.sendMail(customerEmailOptions)

  } catch (error) {
    console.error('Error sending email:', error)
  }
}

// fucntion to senc cancele bookings
const sendCancelEmail = async orderDetails => {
  // Format selected services into a list
  const servicesList = orderDetails.selectedServices?.length
    ? `<ul style="padding-left: 20px; color: #555;">
        ${orderDetails.selectedServices
          .map(service => `<li>${service?.serviceName}</li>`)
          .join('')}
      </ul>`
    : "<p style='color: red;'>No services selected</p>";

  // Email content for Admin
  const emailHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 10px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
      <div style="background: #B91C1C; color: white; padding: 10px; text-align: center; font-size: 18px; font-weight: bold; border-radius: 8px 8px 0 0;">
        Appointment Canceled
      </div>
      <div>
        <p style="font-size: 14px;"><strong>Name:</strong> ${orderDetails.customerName}</p>
        <p style="font-size: 14px;"><strong>Phone:</strong> ${orderDetails.phone}</p>
        <p style="font-size: 14px;"><strong>Email:</strong> ${orderDetails.email || 'N/A'}</p>
        <p style="font-size: 14px;"><strong>Appointment Time:</strong> ${orderDetails.time || 'N/A'}</p>
        <p style="font-size: 14px;"><strong>Appointment Date:</strong> ${new Date(orderDetails.date).toLocaleDateString('en-US')}</p>
        <p style="font-size: 14px; font-weight: bold;">Selected Services:</p>
        ${servicesList}
        <p style="margin-top: 20px;">
          <a href="https://estheticsbynoemi.com/adminDashboard" style="background-color: #B91C1C; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; font-size: 14px;">Manage Appointments</a>
        </p>
      </div>
      <div style="background: #f4f4f4; margin-top: 30px; padding: 10px 5px; text-align: center; font-size: 12px; color: #777; border-radius: 0 0 8px 8px;">
        &copy; 2025 Esthetics by Noemi. All Rights Reserved.
      </div>
    </div>
  `;

  // Admin Email Options
  const adminCancelMailOptions = {
    from: 'estheticsbynoemi@gmail.com',
    to: 'info.estheticsbynoemi@gmail.com',
    subject: 'Appointment Canceled',
    html: emailHtml
  };

  try {
    // Send email to admin
    await transporter.sendMail(adminCancelMailOptions);
    console.log('Cancellation email sent to admin.');

    if (orderDetails.email) {
      const customerMailOptions = {
        from: 'info.estheticsbynoemi@gmail.com',
        to: orderDetails.email,
        subject: 'Your Appointment Has Been Canceled',
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 10px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
            <div style="background: #B91C1C; color: white; padding: 10px; text-align: center; font-size: 18px; font-weight: bold; border-radius: 8px 8px 0 0;">
              Appointment Canceled
            </div>
            <div>
              <p style="font-size: 14px;">Dear ${orderDetails.customerName},</p>
              <p style="font-size: 14px;">We regret to inform you that your appointment scheduled for <strong>${new Date(
                orderDetails.date
              ).toLocaleDateString('en-US')}</strong> at <strong>${orderDetails.time}</strong> has been <span style="color: red;">canceled</span>.</p>
              <p style="font-size: 14px;">If this was a mistake or you’d like to reschedule, please contact us at <a href="mailto:info.estheticsbynoemi@gmail.com">info.estheticsbynoemi@gmail.com</a>.</p>
              <p style="font-size: 14px;"><strong>Selected Services:</strong></p>
              ${servicesList}
              <p style="margin-top: 20px;">
                <a href="https://estheticsbynoemi.com/book" style="background-color: #2563EB; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px; font-size: 14px;">Reschedule Appointment</a>
              </p>
            </div>
            <div style="background: #f4f4f4; margin-top: 30px; padding: 10px 5px; text-align: center; font-size: 12px; color: #777; border-radius: 0 0 8px 8px;">
              &copy; 2025 Esthetics by Noemi. All Rights Reserved.
            </div>
          </div>
        `
      };

      await transporter.sendMail(customerMailOptions);
      console.log('Cancellation confirmation email sent to customer.');
    }
  } catch (error) {
    console.error('Error sending email:', error);
  }
};







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

// get accepted order list
export const getCancelOrder = async (req, res) => {
  try {
    const getAllCancelOrders = await orderModel
      .find({ status: 'cancel' })
      .sort({ createdAt: -1 })
    if (getAllCancelOrders.length === 0) {
      return res.status(404).json({ message: 'user not found' })
    }
    res.status(200).json(getAllCancelOrders)
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

    await sendAcceptedEmail(updatedOrder)
    res.status(200).json(updatedOrder)
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' })
  }
}

// order cancel 
export const cancelOrder = async (req, res) => {
  try {
    const { id } = req.params
    console.log(id)

    // Check if the order exists
    const isOrderExists = await orderModel.findById(id)
    if (!isOrderExists) {
      return res.status(404).json({ message: 'Order not found' })
    }

    // Update only the status field to "accepted"
    const updatedCancelOrder = await orderModel.findByIdAndUpdate(
      id,
      { status: 'cancel' },
      { new: true } // Returns the updated document
    )
    await sendCancelEmail(updatedCancelOrder)
    res.status(200).json(updatedCancelOrder)
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
