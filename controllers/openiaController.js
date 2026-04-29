const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
const dotenv = require("dotenv");
dotenv.config();
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
;

exports.summaryController = async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(401).json({ message: "Missing Gemini API Key. Please add it to your .env file." });
    }
    const { text } = req.body;
    // console.log('1',text)
    const result = await ai.models.generateContent({
      model: "gemini-flash-lite-latest",
      contents: `Summarize this:\n${text}`,
    });


    // console.log("2", result.candidates[0].content.parts[0].text);

    const summary = result.candidates[0].content.parts[0].text;
    if (summary) {
      return res.status(200).json(summary);
      // console.log("3");
    }
  } catch (err) {
    let msg = err.message;
    if (msg && (msg.includes("429") || msg.includes("quota"))) {
      msg = "Gemini API Quota Exceeded. Please try again later.";
    } else if (msg && (msg.includes("503") || msg.includes("UNAVAILABLE") || msg.includes("high demand") || msg.includes("500"))) {
      msg = "Google's AI servers are currently overloaded. Please try again in 5 seconds without refreshing.";
    }
    return res.status(500).json({ message: msg });
  }
};
exports.paragraphController = async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(401).json({ message: "Missing Gemini API Key. Please add it to your .env file." });
    }
    const { text } = req.body;
    const result = await ai.models.generateContent({
      model: "gemini-flash-lite-latest",
      contents: `create randome para about:\n${text}`,
    });

    const para = result.candidates[0].content.parts[0].text;
    if (para) {
      return res.status(200).json(para);
      // console.log("3");
    }
  } catch (err) {
    let msg = err.message;
    if (msg && (msg.includes("429") || msg.includes("quota"))) {
      msg = "Gemini API Quota Exceeded. Please try again later.";
    } else if (msg && (msg.includes("503") || msg.includes("UNAVAILABLE") || msg.includes("high demand") || msg.includes("500"))) {
      msg = "Google's AI servers are currently overloaded. Please try again in 5 seconds without refreshing.";
    }
    return res.status(500).json({ message: msg });
  }
};
exports.chatbotController = async (req, res) => {
  try {
    const { text, history = [] } = req.body;

    // Inject the ChatGPT instruction dynamically into the newest prompt
    const enhancedText = `Answer as a helpful assistant similar to ChatGPT.\nUser says: ${text}`;

    const requestContents = [
      ...history,
      { role: 'user', parts: [{ text: enhancedText }] }
    ];

    const result = await ai.models.generateContent({
      model: "gemini-flash-lite-latest",
      contents: requestContents,
    });

    const para = result.candidates[0].content.parts[0].text;
    if (para) {
      return res.status(200).json(para);
    }
  } catch (err) {
    let msg = err.message;
    if (msg && (msg.includes("429") || msg.includes("quota"))) {
      msg = "Gemini API Quota Exceeded. Please try again later.";
    } else if (msg && (msg.includes("503") || msg.includes("UNAVAILABLE") || msg.includes("high demand") || msg.includes("500"))) {
      msg = "Google's AI servers are currently overloaded. Please try again in 5 seconds without refreshing.";
    }
    return res.status(500).json({ message: msg });
  }
};

exports.jsconverterController = async (req, res) => {
  try {
    if (!process.env.GEMINI_API_KEY) {
      return res.status(401).json({ message: "Missing Gemini API Key. Please add it to your .env file." });
    }
    const { text } = req.body;
    const result = await ai.models.generateContent({
      model: "gemini-flash-lite-latest",
      contents: `/* convert these instruction into javascript code \n${text}`,
    });

    const para = result.candidates[0].content.parts[0].text;
    if (para) {
      return res.status(200).json(para);
    }

  } catch (err) {
    let msg = err.message;
    if (msg && (msg.includes("429") || msg.includes("quota"))) {
      msg = "Gemini API Quota Exceeded. Please try again later.";
    } else if (msg && (msg.includes("503") || msg.includes("UNAVAILABLE") || msg.includes("high demand") || msg.includes("500"))) {
      msg = "Google's AI servers are currently overloaded. Please try again in 5 seconds without refreshing.";
    }
    return res.status(500).json({ message: msg });
  }
};


exports.scifiImageController = async (req, res) => {
  try {
    const { text } = req.body;

    // Bypass Gemini API to save quota! Create the enhanced prompt manually
    const enhancedPrompt = `${text}, highly detailed Sci-Fi aesthetic, cyberpunk, neon lighting, futuristic, 8k cinematic resolution`;
    const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(enhancedPrompt)}?width=800&height=800&nologo=true`;

    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error("Failed to fetch image");
      const arrayBuffer = await response.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      const base64Image = `data:image/jpeg;base64,${buffer.toString('base64')}`;

      return res.status(200).json({ url: base64Image });
    } catch (fetchErr) {
      return res.status(200).json({ url: imageUrl }); // fallback to URL
    }
  } catch (err) {
    let msg = err.message;
    if (msg.includes("429") || msg.includes("quota")) {
      msg = "Gemini API Quota Exceeded. Please try again later.";
    }
    return res.status(500).json({ message: msg });
  }
};
