import { GoogleGenerativeAI } from "@google/generative-ai";
import { MASTER_BOARDROOM_PROMPT } from "./prompts";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

export async function analyzeFullBoardroom(
  projectContext: string,
  reportContent: string,
  history: string,
  retryCount = 0
): Promise<any> {
  const prompt = `
    ${MASTER_BOARDROOM_PROMPT}
    
    PROJECT CONTEXT:
    ${projectContext}
    
    HISTORICAL PROGRESS:
    ${history}
    
    LATEST WEEKLY REPORT:
    ${reportContent}
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from potential markdown formatting
    const jsonStr = text.match(/\{[\s\S]*\}/)?.[0] || text;
    return JSON.parse(jsonStr);
  } catch (error: any) {
    console.error(`Error in analyzeFullBoardroom (Attempt ${retryCount + 1}):`, error);

    // Retry logic: If 503 and retryCount < 1
    if ((error.status === 503 || error.message?.includes("503")) && retryCount < 1) {
      console.log("Gemini 503 detected. Retrying in 3 seconds...");
      await new Promise(resolve => setTimeout(resolve, 3000));
      return analyzeFullBoardroom(projectContext, reportContent, history, retryCount + 1);
    }

    // Fallback logic
    console.warn("Gemini failed after retries or non-503 error. Returning fallback advice.");
    return generateFallbackAdvice();
  }
}

function generateFallbackAdvice() {
  const departments = ["MARKETING", "SALES", "PRODUCT", "UX", "DEVELOPMENT", "FINANCE", "CEO"];
  const fallback: any = {};
  
  departments.forEach(dept => {
    fallback[dept] = {
      assessment: "The board was unable to reach a consensus this week due to a technical interruption.",
      problems: ["Technical communication bottleneck with the AI advisors."],
      opportunities: ["Maintain current course until the next boardroom meeting."],
      recommendations: ["Review manual metrics and proceed with caution."],
      priority: "MEDIUM"
    };
  });
  
  return fallback;
}
