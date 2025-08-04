import express from "express";
import cors from "cors";
import fetch from "node-fetch"; // v2 kullan, yoksa ESM sorun çıkar

const app = express();
const PORT = 3001;

app.use(cors());

app.get("/avatar/:handle", async (req, res) => {
  const { handle } = req.params;
  const imageUrl = `https://unavatar.io/twitter/${handle}`;

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      return res.status(404).send("Image not found");
    }

    const contentType = response.headers.get("content-type");
    const buffer = await response.arrayBuffer();

    res.set("Content-Type", contentType);
    res.send(Buffer.from(buffer));
  } catch (error) {
    console.error("Proxy error:", error);
    res.status(500).send("Error fetching image");
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy running on http://localhost:${PORT}`);
});
