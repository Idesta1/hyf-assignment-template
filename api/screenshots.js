module.exports = async function handler(req, res) {
  const baseUrl = process.env.CRUDCRUD_API_URL;

  if (!baseUrl) {
    res
      .status(500)
      .json({ error: "Missing CRUDCRUD_API_URL environment variable" });
    return;
  }

  if (!baseUrl.includes("crudcrud.com/api/")) {
    res.status(500).json({
      error:
        "CRUDCRUD_API_URL is invalid. It should look like https://crudcrud.com/api/<token>/<collection>",
    });
    return;
  }

  function parseJsonSafely(text, fallbackValue) {
    if (!text) {
      return fallbackValue;
    }

    try {
      return JSON.parse(text);
    } catch {
      return fallbackValue;
    }
  }

  try {
    if (req.method === "GET") {
      const response = await fetch(baseUrl);
      const text = await response.text();
      const data = parseJsonSafely(text, null);

      if (!response.ok) {
        const errorMessage =
          (data && (data.error || data.message)) ||
          text ||
          "Could not load saved screenshots";
        res.status(response.status).json({ error: errorMessage });
        return;
      }

      res.status(200).json(Array.isArray(data) ? data : []);
      return;
    }

    if (req.method === "POST") {
      const body =
        typeof req.body === "string"
          ? JSON.parse(req.body || "{}")
          : req.body || {};

      if (!body.websiteUrl || !body.screenshotUrl) {
        res
          .status(400)
          .json({ error: "websiteUrl and screenshotUrl are required" });
        return;
      }

      const response = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          websiteUrl: body.websiteUrl,
          screenshotUrl: body.screenshotUrl,
          createdAt: body.createdAt || new Date().toISOString(),
        }),
      });

      const text = await response.text();
      const data = parseJsonSafely(text, null);

      if (!response.ok) {
        const errorMessage =
          (data && (data.error || data.message)) ||
          text ||
          "Could not save screenshot";
        res.status(response.status).json({ error: errorMessage });
        return;
      }

      res.status(201).json(data || {});
      return;
    }

    if (req.method === "DELETE") {
      const screenshotId =
        typeof req.query?.id === "string"
          ? req.query.id
          : Array.isArray(req.query?.id)
            ? req.query.id[0]
            : "";

      if (!screenshotId) {
        res.status(400).json({ error: "id is required" });
        return;
      }

      const response = await fetch(
        `${baseUrl}/${encodeURIComponent(screenshotId)}`,
        {
          method: "DELETE",
        },
      );

      const text = await response.text();
      const data = parseJsonSafely(text, null);

      if (!response.ok) {
        const errorMessage =
          (data && (data.error || data.message)) ||
          text ||
          "Could not delete screenshot";
        res.status(response.status).json({ error: errorMessage });
        return;
      }

      res.status(204).end();
      return;
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    res.status(500).json({ error: error.message || "Unexpected server error" });
  }
};
