import express from "express";
import cors from "cors";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();
const PORT = 3000;
const JWT_SECRET = "your_super_secret_key";

// ------------------ MIDDLEWARE ------------------
app.use(cors());
app.use(express.json());

// Middleware to verify JWT (admin only)
const authenticateAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    req.isAdmin = false; // user request
    return next();
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.adminId = decoded.adminId;
    req.isAdmin = true;
    next();
  } catch {
    req.isAdmin = false;
    next();
  }
};

// ------------------ AUTH ------------------

// Admin registration
app.post("/admin/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const admin = await prisma.admin.create({
      data: { username, password: hashedPassword },
    });
    res.json({ message: "Admin registered", adminId: admin.id });
  } catch (err) {
    res.status(400).json({ error: "Username already exists" });
  }
});

// Admin login
app.post("/admin/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await prisma.admin.findUnique({ where: { username } });

  if (!admin) return res.status(401).json({ error: "Invalid credentials" });

  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign({ adminId: admin.id }, JWT_SECRET, { expiresIn: "1d" });

  // Send token and message
  res.json({
    message: "Admin", // frontend can check if "Admin" in message
    token,
    admin: {
      id: admin.id,
      username: admin.username,
    },
  });
});

// ------------------ BOOKINGS ------------------

// Create booking (any user)
app.post("/bookings", async (req, res) => {
  try {
    const booking = await prisma.booking.create({
      data: { ...req.body, status: "upcoming" },
    });
    console.log("New booking created:", booking);
    res.json(booking);
  } catch (err) {
    res.status(500).json({ error: "Failed to create booking" });
  }
});

// Get all bookings (admin sees all, user sees only theirs)
app.get("/bookings", authenticateAdmin, async (req, res) => {
  if (req.isAdmin) {
    const bookings = await prisma.booking.findMany();
    return res.json({ message: "Admin logged in", bookings });
  }
  res.json({ message: "User request, no admin access" });
});

// Admin accepts booking
app.put("/bookings/:id/accept", authenticateAdmin, async (req, res) => {
  if (!req.isAdmin) return res.status(401).json({ error: "Admin only" });
  const { id } = req.params;

  const updatedBooking = await prisma.booking.update({
    where: { id },
    data: { status: "completed" },
  });

  console.log("Booking accepted:", updatedBooking);
  res.json(updatedBooking);
});

// Admin rejects booking
app.put("/bookings/:id/reject", authenticateAdmin, async (req, res) => {
  if (!req.isAdmin) return res.status(401).json({ error: "Admin only" });
  const { id } = req.params;

  const updatedBooking = await prisma.booking.update({
    where: { id },
    data: { status: "cancelled" },
  });

  console.log("Booking rejected:", updatedBooking);
  res.json(updatedBooking);
});

// Reschedule booking (user or admin)
app.put("/bookings/:id/reschedule", async (req, res) => {
  const { id } = req.params;
  const { date, time } = req.body;

  try {
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { date, time },
    });
    console.log("Booking rescheduled:", updatedBooking);
    res.json(updatedBooking);
  } catch {
    res.status(500).json({ error: "Failed to reschedule booking" });
  }
});

// Delete booking (user or admin)
app.delete("/bookings/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBooking = await prisma.booking.delete({ where: { id } });
    console.log("Booking deleted:", deletedBooking);
    res.json(deletedBooking);
  } catch {
    res.status(500).json({ error: "Failed to delete booking" });
  }
});



// Get bookings by user contact (phone number)
app.get("/bookings/user/:contact", async (req, res) => {
  const { contact } = req.params;
  
  try {
    const bookings = await prisma.booking.findMany({
      where: { contact },
      orderBy: { date: 'desc' }
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch bookings" });
  }
});

// Update booking status
app.patch("/bookings/:id/status", async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: { status },
    });
    res.json(updatedBooking);
  } catch (error) {
    res.status(400).json({ error: "Failed to update booking status" });
  }
});

// // ------------------ START SERVER ------------------
// app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
