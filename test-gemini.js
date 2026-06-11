const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require("fs");
const path = require("path");

// Manually load .env for plain node execution
const envPath = path.resolve(process.cwd(), ".env");
if (fs.existsSync(envPath)) {
  const envConfig = fs.readFileSync(envPath, "utf-8");
  envConfig.split("\n").forEach((line) => {
    const [key, ...value] = line.split("=");
    if (key && value.length > 0) {
      process.env[key.trim()] = value.join("=").trim().replace(/^["']|["']$/g, "");
    }
  });
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function test() {
  if (!process.env.GEMINI_API_KEY) {
    console.error("Error: GEMINI_API_KEY not found in .env file");
    return;
  }

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    console.log("Testing model: gemini-2.5-flash...");
    const result = await model.generateContent("Say hello");
    console.log("Response:", result.response.text());
  } catch (error) {
    console.error("Error executing test:", error.message || error);
  }
}

test();