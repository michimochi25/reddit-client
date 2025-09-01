export default async function handler(req, res) {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Accept");
    res.status(200).end();
    return;
  }

  // Only allow GET requests
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    // Extract the path from the dynamic route
    const { path } = req.query;

    // Handle both single path and array of paths
    const redditPath = Array.isArray(path) ? path.join("/") : path;

    console.log("Proxying request to Reddit:", redditPath);

    // Make the request to Reddit's API
    const response = await fetch(`https://www.reddit.com/${redditPath}`, {
      headers: {
        "User-Agent": "YourRedditClient/1.0 by YourUsername",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Reddit API returned ${response.status}: ${response.statusText}`
      );
    }

    const data = await response.json();

    // Set CORS headers and return data
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET");
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(data);
  } catch (error) {
    console.error("Reddit API proxy error:", error);
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(500).json({
      error: "Failed to fetch from Reddit API",
      message: error.message,
    });
  }
}
