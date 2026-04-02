module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  let body = {};

  try {
    body =
      typeof req.body === "string"
        ? JSON.parse(req.body || "{}")
        : req.body || {};
  } catch {
    res.status(400).json({ error: "Invalid JSON request body" });
    return;
  }

  const websiteUrl = body.websiteUrl;

  if (!websiteUrl || typeof websiteUrl !== "string") {
    res.status(400).json({ error: "websiteUrl is required" });
    return;
  }

  const rapidApiKey = process.env.RAPIDAPI_KEY;
  const rapidApiHost =
    process.env.RAPIDAPI_HOST || "website-screenshot6.p.rapidapi.com";

  if (!rapidApiKey) {
    res
      .status(500)
      .json({ error: "Missing RAPIDAPI_KEY environment variable" });
    return;
  }

  const encodedUrl = encodeURIComponent(websiteUrl);
  const apiUrl = `https://${rapidApiHost}/screenshot?url=${encodedUrl}&width=1920&height=1080`;

  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "x-rapidapi-key": rapidApiKey,
        "x-rapidapi-host": rapidApiHost,
        "Content-Type": "application/json",
      },
    });

    const text = await response.text();
    let data = {};

    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      data = {};
    }

    if (!response.ok) {
      res
        .status(response.status)
        .json({ error: data.error || data.message || "RapidAPI error" });
      return;
    }

    res.status(200).json({ screenshotUrl: data.screenshotUrl });
  } catch (error) {
    res.status(500).json({ error: error.message || "Unexpected server error" });
  }
};
