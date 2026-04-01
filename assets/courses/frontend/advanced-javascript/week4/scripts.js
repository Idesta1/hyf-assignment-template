/** Added variables for DOM elements */
const form = document.getElementById("form");
const urlInput = document.getElementById("urlInput");
const screenshotImage = document.getElementById("screenshot");
const captureButton = document.getElementById("CaptureBtn");
const CACHE_STORAGE_KEY = "screenshot-cache";
const REQUEST_COOLDOWN_MS = 15000;

let lastRequestAt = 0;

const screenshotCache = new Map(
  Object.entries(
    JSON.parse(window.localStorage.getItem(CACHE_STORAGE_KEY) || "{}"),
  ),
);

function persistCache() {
  window.localStorage.setItem(
    CACHE_STORAGE_KEY,
    JSON.stringify(Object.fromEntries(screenshotCache)),
  );
}

function setCaptureButtonState(isLoading) {
  captureButton.disabled = isLoading;
  captureButton.textContent = isLoading ? "Generating..." : "Generate Screenshot";
}

function setScreenshotAndCache(websiteUrl, screenshotUrl) {
  screenshotImage.src = screenshotUrl;
  screenshotCache.set(websiteUrl, screenshotUrl);
  persistCache();
}

function getFallbackScreenshotUrl(websiteUrl) {
  return `https://image.thum.io/get/width/1200/noanimate/${websiteUrl}`;
}

screenshotImage.addEventListener("error", () => {
  window.alert(
    "Could not load screenshot for this website. Try another URL like https://example.com.",
  );
  setCaptureButtonState(false);
});

/** Normalizes the user input to ensure it is a valid URL format for the API*/
function normalizeWebsiteUrl(input) {
  const trimmedInput = input.trim();

  if (!trimmedInput) {
    return "";
  }

  if (/^https?:\/\//i.test(trimmedInput)) {
    return trimmedInput;
  }

  return `https://${trimmedInput}`;
}

/** Fetches screenshot metadata from API and returns the image URL */
async function fetchScreenshotUrl(websiteUrl) {
  const encodedUrl = encodeURIComponent(websiteUrl);
  const apiUrl = `https://website-screenshot6.p.rapidapi.com/screenshot?url=${encodedUrl}&width=1920&height=1080`;
  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      x_rapidapi_key: "7b0e412a72msh38f49f945ca2187p11bba6jsnc353b75a2004",
      "x-rapidapi-host": "website-screenshot6.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  });

  const result = await response.json();

  if (!response.ok) {
    const error = new Error(
      result.error || "Could not generate the screenshot.",
    );
    error.status = response.status;

    if (response.status === 429) {
      error.message = "Rate limit reached (429). Please try again later.";
    }

    throw error;
  }

  if (!result?.screenshotUrl) {
    throw new Error("No screenshot was returned by the API.");
  }

  return result.screenshotUrl;
}
// Event listener for form submission to handle the screenshot generation process
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const websiteUrl = normalizeWebsiteUrl(urlInput.value);
  const cachedScreenshotUrl = screenshotCache.get(websiteUrl);

  if (!websiteUrl) {
    window.alert("Please enter a website URL.");
    return;
  }

  if (cachedScreenshotUrl) {
    setScreenshotAndCache(websiteUrl, cachedScreenshotUrl);
    return;
  }

  const now = Date.now();
  const elapsedSinceLastRequest = now - lastRequestAt;

  if (elapsedSinceLastRequest < REQUEST_COOLDOWN_MS) {
    const waitSeconds = Math.ceil(
      (REQUEST_COOLDOWN_MS - elapsedSinceLastRequest) / 1000,
    );
    window.alert(
      `Please wait ${waitSeconds}s before requesting another screenshot to avoid API rate limits.`,
    );
    return;
  }

  try {
    lastRequestAt = Date.now();
    setCaptureButtonState(true);

    const screenshotUrl = await fetchScreenshotUrl(websiteUrl);
    setScreenshotAndCache(websiteUrl, screenshotUrl);
  } catch (error) {
    console.error("Screenshot request failed:", error);

    if (error.status === 429) {
      const fallbackScreenshotUrl = getFallbackScreenshotUrl(websiteUrl);
      setScreenshotAndCache(websiteUrl, fallbackScreenshotUrl);
      window.alert(
        "RapidAPI limit reached (429). Showing fallback screenshot service for now.",
      );
      return;
    }

    window.alert(error.message);
  } finally {
    setCaptureButtonState(false);
  }
});
