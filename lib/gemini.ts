import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.API_KEY!);

export async function analyzeReport(fileContent: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `
      Task: Analyze medical report for abnormal biomarkers
      Requirements:
      - Focus on abnormal values and significant findings
      - Include numerical values and reference ranges
      - Exclude patient identifiable information
      - Format in markdown
      
      Report content:
      ${fileContent}
      
      Response format:
      ## Summary
      [Brief overview of key findings]
      
      ## Abnormal Biomarkers
      - [Biomarker]: [Value] (Reference range: [range])
      
      ## Recommendations
      [Clinical implications and suggested follow-ups]
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error analyzing report:', error);
    throw new Error('Failed to analyze report');
  }
}