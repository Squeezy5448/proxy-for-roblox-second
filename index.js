import express from "express";
import fetch from "node-fetch";

const app = express();

app.get("/", (req, res) => {
  res.send("Proxy is running!");
});

app.get("/catalog", async (req, res) => {
  try {
    const category = req.query.category || "Clothing";
    const subcategory = req.query.subcategory || "Shirts";
    const limit = req.query.limit || 30;
    const cursor = req.query.cursor || "";

    const url = `https://catalog.roblox.com/v1/search/items?category=${category}&subcategory=${subcategory}&limit=${limit}&cursor=${cursor}`;
    const response = await fetch(url);
    const data = await response.json();

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
