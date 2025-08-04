// Vercel serverless function – unavatar CORS proxy

export default async function handler(req: any, res: any) {
  const { handle } = req.query;

  if (!handle) {
    return res.status(400).json({ error: "Missing handle" });
  }

  try {
    const response = await fetch(`https://unavatar.io/twitter/${handle}`);
    if (!response.ok) {
      return res.status(response.status).json({ error: "Failed to fetch image" });
    }

    const contentType = response.headers.get("content-type") || "image/png";
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "s-maxage=86400");
    res.status(200).send(buffer);
  } catch (error) {
    res.status(500).json({ error: "Internal error" });
  }
}
