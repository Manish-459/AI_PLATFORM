const { GoogleGenAI } = require("@google/genai");

const testAPI = async () => {
  try {
    const ai = new GoogleGenAI({apiKey: "AIzaSyDXCm1KBuYc_tFEVxE61mWJHR31pjMJd6M"});
    const result = await ai.models.generateContent({
      model: "gemini-flash-lite-latest",
      contents: "Are you working? Say yes.",
    });
    console.log("SUCCESS:", result.candidates[0].content.parts[0].text);
  } catch (err) {
    console.log("ERROR:", err.message);
  }
};
testAPI();
