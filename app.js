const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const app = express();
app.set("view engine", "ejs");
app.use(expressLayouts);
app.set("layout", "layout");

// Middleware
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));
const medicines = [
  {
    id: 1,
    name: "Aspirin",
    price: 10,
    description: "Pain reliever",
    image: "aspirin.jpg",
  },
  {
    id: 2,
    name: "Ibuprofen",
    price: 15,
    description: "Anti-inflammatory",
    image: "ibuprofen.jpg",
  },
  {
    id: 3,
    name: "Paracetamol",
    price: 12,
    description: "Fever reducer",
    image: "paracetamol.jpg",
  },
  {
    id: 4,
    name: "Paracetamol",
    price: 12,
    description: "Fever reducer",
    image: "paracetamol.jpg",
  },
  {
    id: 5,
    name: "Paracetamol",
    price: 12,
    description: "Fever reducer",
    image: "paracetamol.jpg",
  },
  {
    id: 6,
    name: "Paracetamol",
    price: 12,
    description: "Fever reducer",
    image: "paracetamol.jpg",
  },
  {
    id: 7,
    name: "Paracetamol",
    price: 12,
    description: "Fever reducer",
    image: "paracetamol.jpg",
  },
  {
    id: 8,
    name: "Paracetamol",
    price: 12,
    description: "Fever reducer",
    image: "paracetamol.jpg",
  },
  {
    id: 9,
    name: "Paracetamol",
    price: 12,
    description: "Fever reducer",
    image: "paracetamol.jpg",
  },
  {
    id: 3,
    name: "Paracetamol",
    price: 12,
    description: "Fever reducer",
    image: "paracetamol.jpg",
  },
  {
    id: 3,
    name: "Paracetamol",
    price: 12,
    description: "Fever reducer",
    image: "paracetamol.jpg",
  },
  {
    id: 3,
    name: "Paracetamol",
    price: 12,
    description: "Fever reducer",
    image: "paracetamol.jpg",
  },
  {
    id: 3,
    name: "Paracetamol",
    price: 12,
    description: "Fever reducer",
    image: "paracetamol.jpg",
  },
  {
    id: 3,
    name: "Paracetamol",
    price: 12,
    description: "Fever reducer",
    image: "paracetamol.jpg",
  },
  {
    id: 3,
    name: "Paracetamol",
    price: 12,
    description: "Fever reducer",
    image: "paracetamol.jpg",
  },
  {
    id: 3,
    name: "Paracetamol",
    price: 12,
    description: "Fever reducer",
    image: "paracetamol.jpg",
  },
];

// Cart (stored in memory)
let cart = [];

// Routes
// Home route
app.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

// Medicines listing route
app.get("/medicines", (req, res) => {
  res.render("medicine-list", { title: "Medicines", medicines });
});

// Medicine detail route
app.get("/medicines/:id", (req, res) => {
  const medicineId = parseInt(req.params.id, 10);
  const medicine = medicines.find((m) => m.id === medicineId);
  if (medicine) {
    res.render("medicine-detail", { title: "Medicine Detail", medicine });
  } else {
    res.status(404).send("Medicine not found");
  }
});

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

// Cart route
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

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
