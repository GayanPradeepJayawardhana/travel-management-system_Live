import Package from "../models/Package.js";

// GET ALL PACKAGES
export const getPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// CREATE PACKAGE (ADMIN)
export const createPackage = async (req, res) => {
  try {
    const { title, description, location, price } = req.body;

    if (!title || !description || !location || !price) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Generate random image with numeric ID for variety
    const randomId = Math.floor(Math.random() * 1000) + 1;
    const imageUrl = `https://picsum.photos/400/300?random=${randomId}`;

    const newPackage = new Package({
      title,
      description,
      location,
      price: parseFloat(price),
      imageUrl
    });

    await newPackage.save();
    res.json(newPackage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE PACKAGE (ADMIN)
export const deletePackage = async (req, res) => {
  try {
    const deletedPackage = await Package.findByIdAndDelete(req.params.id);
    if (!deletedPackage) {
      return res.status(404).json({ error: "Package not found" });
    }
    res.json({ message: "Package deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};