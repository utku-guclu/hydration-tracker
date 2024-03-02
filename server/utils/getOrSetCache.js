const Redis = require("ioredis");
const redis = new Redis();

// Define the getOrSetCache function
async function getOrSetCache(key, cb) {
  const DEFAULT_EXPIRATION = 600; // Expiration time in seconds
  return new Promise(async (resolve, reject) => {
    try {
      // Attempt to get the value from the cache
      const data = await redis.get(key);

      // If the value exists in the cache, return it
      if (data !== null && data !== undefined && data.trim() !== "") {
        console.log("Cache Hit! Retrieved data from cache:", data);
        const parsedData = JSON.parse(data);
        if (parsedData && parsedData.type === "ArrayBuffer") {
          // Convert base64 string back to ArrayBuffer
          const arrayBuffer = base64ToArrayBuffer(parsedData.value);
          resolve(arrayBuffer);
        } else {
          resolve(parsedData);
        }
        return;
      }

      // If the value is not found in the cache, generate it using the callback function
      const freshData = await cb();

      // Check if fresh data is an ArrayBuffer
      if (freshData instanceof ArrayBuffer) {
        // Convert ArrayBuffer to base64 string
        const base64Data = arrayBufferToBase64(freshData);
        // Store the newly generated value in the cache with expiration time
        await redis.set(
          key,
          JSON.stringify({ type: "ArrayBuffer", value: base64Data }),
          "EX",
          DEFAULT_EXPIRATION
        );
      } else {
        // Store other types of data directly in the cache
        await redis.set(
          key,
          JSON.stringify(freshData),
          "EX",
          DEFAULT_EXPIRATION
        );
      }

      // Log expiration time
      setTimeout(() => {
        console.log(`Expiration time for key '${key}' has been reached.`);
      }, DEFAULT_EXPIRATION * 1000); // Convert seconds to milliseconds

      resolve(freshData);
    } catch (error) {
      reject(error);
    }
  });
}

// Function to convert ArrayBuffer to base64 string
function arrayBufferToBase64(buffer) {
  const bytes = new Uint8Array(buffer);
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

// Function to convert base64 string to ArrayBuffer
function base64ToArrayBuffer(base64) {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

module.exports = getOrSetCache;
