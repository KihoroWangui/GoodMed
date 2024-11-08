const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const app = express();
const QRCode = require("qrcode");

app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout");

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

// Global list of medicines
const medicines = [
  { id: 1, name: "Panadol Advance", price: 100, image: "/images/1.png" },
  { id: 2, name: "Panadol Extra", price: 200, image: "/images/2.png" },
  { id: 3, name: "Panadol Pain Reliever", price: 300, image: "/images/3.png" },
  { id: 4, name: "Panadol Cold&Flu", price: 400, image: "/images/4.png" },
  { id: 5, name: "Paracetamol Tablets", price: 150, image: "/images/5.png" },
  { id: 6, name: "Paracetamol 500mg", price: 250, image: "/images/6.png" },
  {
    id: 7,
    name: "Paracetamol Value Choice",
    price: 350,
    image: "/images/7.png",
  },
  {
    id: 8,
    name: "Paracetamol Value Choice",
    price: 450,
    image: "/images/8.png",
  },
  {
    id: 9,
    name: "Essentials Paracetamol 500mg",
    price: 120,
    image: "/images/9.png",
  },
  { id: 10, name: "Pfizer Paracetamol", price: 220, image: "/images/10.png" },
];

// Routes
app.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

app.get("/medicines", (req, res) => {
  res.render("medicine-list", { title: "Medicines", medicines });
});

// Cart (stored in memory)
let cart = [];

// Add to cart route
app.post("/cart/add/:id", (req, res) => {
  const medicineId = parseInt(req.params.id, 10);
  const medicine = medicines.find((m) => m.id === medicineId);
  if (medicine) {
    cart.push(medicine);
    res.redirect("/cart");
  } else {
    res.status(404).send("Medicine not found");
  }
});

// Cart page route
app.get("/cart", (req, res) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  res.render("cart", { title: "Your Cart", cart, total });
});

// Remove from cart route
app.post("/cart/remove/:id", (req, res) => {
  const medicineId = parseInt(req.params.id, 10);
  cart = cart.filter((item) => item.id !== medicineId);
  res.redirect("/cart");
});

// Route to generate QR code with payment details
app.post("/generate-qr", (req, res) => {
  const { total, reference } = req.body;

  const paymentDetails = {
    amount: total,
    reference: reference,
    message: "Pay to Till Number 0746554496",
  };

  // Create a QR code with the payment details
  const qrData = JSON.stringify(paymentDetails);

  QRCode.toDataURL(qrData, (err, url) => {
    if (err) {
      return res.status(500).send("Error generating QR Code");
    }

    // Send the generated QR code as a JSON response
    res.json({ qrCodeUrl: url });
  });
});
// app.js
app.get("/medicines", (req, res) => {
  res.render("medicine-list", { title: "Medicines", medicines });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
