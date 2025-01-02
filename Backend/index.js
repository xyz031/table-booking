const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const Booking =require('./model/booking')
const dotenv =require('dotenv') 
// Middleware
app.use(cors());
app.use(express.json());
dotenv.config();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// MongoDB Connection Function
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Call the database connection
connectDB();

// Server route
app.get('/', (req, res) => {
  res.send('Server started');
});


// Create route
app.post('/api/create', async (req, res) => {
    const { date, time, guests, name, contact } = req.body;
  
    try {
      // Validate input
      if (!date || !time || !guests || !name || !contact) {
        return res.status(400).json({ message: 'All fields are required.' });
      }
  
      // Check for duplicate bookings at the same date and time
      const existingBooking = await Booking.findOne({ date, time });
      if (existingBooking) {
        return res.status(400).json({ message: 'Time slot already booked!' });
      }
  
      // Create a new booking
      const newBooking = new Booking({ date, time, guests, name, contact });
  
      // Save to database
      await newBooking.save();
  
      // Respond to client
      res.status(201).json({ message: 'Booking successful!', booking: newBooking });
    } catch (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).json({ message: 'Server error. Please try again later.' });
    }
  });


  //get all booking route


  app.get('/api/get-all-booking', async (req, res) => {
    try {
      // Fetch all bookings from the database
      const bookings = await Booking.find();
  
      // Send the bookings as a response
      res.status(200).json({ message: 'All bookings retrieved successfully', bookings });
    } catch (error) {
      console.error(`Error: ${error.message}`);
      res.status(500).json({ message: 'Server error. Unable to fetch bookings.' });
    }
  });


  // slot available



app.post('/api/availability', async (req, res) => {
  const { date } = req.body; // Client sends the date to check availability.

  try {
    // Define the total available time slots
    const allSlots = [
      "12:00 PM", "12:30 PM", "1:00 PM", "1:30 PM",
      "2:00 PM", "2:30 PM", "3:00 PM", "3:30 PM",
      "4:00 PM", "4:30 PM", "5:00 PM", "5:30 PM",
      "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM",
      "8:00 PM", "8:30 PM", "9:00 PM", "9:30 PM"
    ];

    // Fetch bookings for the given date
    const bookedSlots = await Booking.find({ date }).select('time -_id');
    const bookedTimes = bookedSlots.map((slot) => slot.time);

    // Calculate available slots by excluding booked times
    const availableSlots = allSlots.filter((slot) => !bookedTimes.includes(slot));

    res.status(200).json({
      message: 'Available slots retrieved successfully',
      availableSlots,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server error. Unable to fetch availability.' });
  }
});


// get by id

app.get('/api/booking/:id', async (req, res) => {
  const { id } = req.params; // Get the booking ID from the request parameters

  try {
    // Fetch the booking using findById
    const booking = await Booking.findById(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    res.status(200).json({
      message: 'Booking found successfully',
      booking, // Send the booking details in the response
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server error. Unable to fetch booking.' });
  }
});


// delete booking by id
app.delete('/api/delete/:id', async (req, res) => {
  const { id } = req.params; // Get the booking ID from the request parameters

  try {
    // Find and delete the booking by ID
    const booking = await Booking.findByIdAndDelete(id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found.' });
    }

    res.status(200).json({
      message: 'Booking deleted successfully',
      booking, // Send the deleted booking details in the response
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ message: 'Server error. Unable to delete booking.' });
  }
});


  

// Start the server

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
