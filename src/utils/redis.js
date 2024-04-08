const redis = require("redis");

const REDIS_PORT = parseInt(process.env.REDIS_PORT);

// Redis 클라이언트 생성
const redisClient = redis.createClient({
  host: "127.0.0.1",
  port: 6379, // .env 파일에서 가져오는 옵션
  password: "123456",
});

redisClient.connect();

redisClient.on("ready", () => {
  console.log("ready for redis");
});

redisClient.on("error", (error) => {
  console.error(error);
});

module.exports = redisClient;
