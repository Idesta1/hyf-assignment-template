/** Added variables for DOM elements */
const form = document.getElementById("form");
const urlInput = document.getElementById("urlInput");
const screenshotImage = document.getElementById("screenshot");
const captureButton = document.getElementById("CaptureBtn");
const saveButton = document.getElementById("saveBtn");
const savedScreenshotsList = document.getElementById("savedScreenshots");
const CACHE_STORAGE_KEY = "screenshot-cache";
const REQUEST_COOLDOWN_MS = 15000;
const SCREENSHOT_API_ENDPOINT = "/api/screenshot";
const SAVED_SCREENSHOTS_API_ENDPOINT = "/api/screenshots";

let lastRequestAt = 0;
let latestScreenshot = null;

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
  captureButton.textContent = isLoading
    ? "Generating..."
    : "Generate Screenshot";
}

function setScreenshotAndCache(websiteUrl, screenshotUrl) {
  screenshotImage.src = screenshotUrl;
  latestScreenshot = { websiteUrl, screenshotUrl };
  screenshotCache.set(websiteUrl, screenshotUrl);
  persistCache();
}

function renderSavedScreenshots(savedItems) {
  savedScreenshotsList.innerHTML = "";

  if (savedItems.length === 0) {
    const emptyState = document.createElement("li");
    emptyState.textContent = "No saved screenshots yet.";
    savedScreenshotsList.appendChild(emptyState);
    return;
  }

  savedItems.forEach((item) => {
    const listItem = document.createElement("li");
    listItem.className = "saved-item";

    const link = document.createElement("a");
    link.href = item.websiteUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = item.websiteUrl;

    const thumbnail = document.createElement("img");
    thumbnail.src = item.screenshotUrl;
    thumbnail.alt = `Saved screenshot for ${item.websiteUrl}`;
    thumbnail.width = 160;

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", async () => {
      await deleteSavedScreenshot(item._id);
    });

    listItem.appendChild(link);
    listItem.appendChild(thumbnail);
    listItem.appendChild(deleteButton);
    savedScreenshotsList.appendChild(listItem);
  });
}

async function readCrudCrudError(response, fallbackMessage) {
  const responseText = await response.text();

  try {
    const parsed = responseText ? JSON.parse(responseText) : null;
    if (parsed?.error) {
      return parsed.error;
    }
  } catch {
    // Ignore JSON parse issues and fall back to raw text.
  }

  return responseText || fallbackMessage;
}

async function loadSavedScreenshots() {
  try {
    const response = await fetch(SAVED_SCREENSHOTS_API_ENDPOINT);

    if (!response.ok) {
      throw new Error(
        await readCrudCrudError(response, "Could not load saved screenshots."),
      );
    }

    const savedItems = await response.json();
    renderSavedScreenshots(savedItems);
  } catch (error) {
    console.error("Loading saved screenshots failed:", error);
    window.alert(error.message);
  }
}

async function saveCurrentScreenshot() {
  if (!latestScreenshot) {
    window.alert("Generate a screenshot first, then save it.");
    return;
  }

  try {
    const response = await fetch(SAVED_SCREENSHOTS_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        websiteUrl: latestScreenshot.websiteUrl,
        screenshotUrl: latestScreenshot.screenshotUrl,
        createdAt: new Date().toISOString(),
      }),
    });

    if (!response.ok) {
      throw new Error(
        await readCrudCrudError(response, "Could not save screenshot."),
      );
    }

    await loadSavedScreenshots();
  } catch (error) {
    console.error("Saving screenshot failed:", error);
    window.alert(error.message);
  }
}

async function deleteSavedScreenshot(screenshotId) {
  try {
    const response = await fetch(
      `${SAVED_SCREENSHOTS_API_ENDPOINT}?id=${encodeURIComponent(screenshotId)}`,
      {
        method: "DELETE",
      },
    );

    if (!response.ok) {
      throw new Error(
        await readCrudCrudError(response, "Could not delete screenshot."),
      );
    }

    await loadSavedScreenshots();
  } catch (error) {
    console.error("Deleting screenshot failed:", error);
    window.alert(error.message);
  }
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
  const response = await fetch(SCREENSHOT_API_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ websiteUrl }),
  });

  const responseText = await response.text();
  let result = {};

  try {
    result = responseText ? JSON.parse(responseText) : {};
  } catch {
    result = {};
  }

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

saveButton.addEventListener("click", saveCurrentScreenshot);
loadSavedScreenshots();
