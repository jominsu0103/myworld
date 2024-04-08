const redis = require("redis");

const REDIS_HOST = process.env.REDIS_HOST;
const REDIS_PORT = parseInt(process.env.REDIS_PORT);
const REDIS_PASSWORD = process.env.REDIS_PASSWORD;

// Redis 클라이언트 생성
const redisClient = redis.createClient({
  host: REDIS_HOST,
  port: REDIS_PORT, // .env 파일에서 가져오는 옵션
  password: REDIS_PASSWORD,
});

redisClient.connect();

redisClient.on("ready", () => {
  console.log("ready for redis");
});

redisClient.on("error", (error) => {
  console.error(error);
});

module.exports = redisClient;
