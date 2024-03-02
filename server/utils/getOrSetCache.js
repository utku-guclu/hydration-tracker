const Redis = require("ioredis");
const redis = new Redis();

async function getOrSetCache(key, cb) {
  const DEFAULT_EXPIRATION = 600; // Expiration time in seconds
  return new Promise(async (resolve, reject) => {
    try {
      // Attempt to get the value from the cache
      const data = await redis.get(key);

      // If the value exists in the cache, return it
      if (data !== null && data !== undefined && data.trim() !== "") {
        console.log("Cache Hit! Retrieved data from Redis");
        // Decode the Base64 string back into the original image blob
        const imageBlob = new Blob([Buffer.from(data)], {
          type: "application/octet-stream",
        }); // Gives back the original blob
        resolve(imageBlob);
        return;
      }

      // If the value is not found in the cache, generate it using the callback function
      console.log(`Cache Miss - Generating fresh image data..`);
      const freshData = await cb();
      if (!freshData) {
        // Handle the case where the freshData is undefined or null
        console.log("Fresh data is undefined or null.");
        reject(new Error("Fresh data is undefined or null."));
        return;
      }
      // Encode the image blob into a Base64 string before storing it in Redis
      const encodedData = freshData.toString("base64");
      await redis.set(key, encodedData, "EX", DEFAULT_EXPIRATION);
      console.log("Data stored in Redis cache");
      resolve(freshData); // bufferJSON 
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = getOrSetCache;
