module.exports = async function handler(req, res) {
  if (req.method !== "DELETE") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const baseUrl = process.env.CRUDCRUD_API_URL;
  const screenshotId = req.query.id;

  if (!baseUrl) {
    res
      .status(500)
      .json({ error: "Missing CRUDCRUD_API_URL environment variable" });
    return;
  }

  if (!screenshotId) {
    res.status(400).json({ error: "id is required" });
    return;
  }

  try {
    const response = await fetch(`${baseUrl}/${screenshotId}`, {
      method: "DELETE",
    });

    const text = await response.text();

    if (!response.ok) {
      res
        .status(response.status)
        .json({ error: text || "Could not delete screenshot" });
      return;
    }

    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: error.message || "Unexpected server error" });
  }
};
