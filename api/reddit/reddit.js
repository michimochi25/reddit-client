export default async function handler(req, res) {
  console.log("=== Catch-all function called ===");
  console.log("Method:", req.method);
  console.log("URL:", req.url);
  console.log("Query:", JSON.stringify(req.query, null, 2));

  // Handle CORS
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
    res.status(200).end();
    return;
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    // Extract path from dynamic route
    const { path } = req.query;
    const redditPath = Array.isArray(path) ? path.join("/") : path;

    console.log("Reddit path:", redditPath);

    const response = await fetch(`https://www.reddit.com/${redditPath}`, {
      headers: {
        "User-Agent": "RedditClient/1.0",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Reddit API error: ${response.status}`);
    }

    const data = await response.json();

    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(data);
  } catch (error) {
    console.error("Proxy error:", error);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).json({
      error: "Failed to fetch data",
      message: error.message,
    });
  }
}
