import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini AI client lazily
let aiClient: GoogleGenAI | null = null;
function getGeminiClient() {
  if (!aiClient) {
    aiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// AI Jewelry Advisor / Stylist endpoint
app.post("/api/jewelry-advisor", async (req, res) => {
  try {
    const { query, userPreferences, occasion, budget, metalPreference } = req.body;

    const ai = getGeminiClient();
    
    const prompt = `You are "Madame Celeste", the Senior Fine Jewelry Concierge & Haute Horlogerie Stylist at STELLIFY FINE JEWELRY.
STELLIFY specializes in handcrafted 18K solid yellow gold, rose gold, platinum, conflict-free diamonds, and precious gemstone pieces (Necklaces, Rings, Tennis Bracelets, Drop Earrings, Heart & Petal Pendants).

User Query: "${query || "Please recommend jewelry styling advice"}"
Occasion: "${occasion || "Special Occasion / Daily Luxury"}"
Budget: "${budget || "Flexible"}"
Metal Preference: "${metalPreference || "18K Yellow Gold"}"

Provide an elegant, warm, sophisticated, and expert consultation tailored to the user.
Your response MUST be in JSON format matching this schema:
{
  "greeting": "A warm, high-end greeting",
  "stylingAdvice": "2-3 paragraphs of expert jewelry styling advice, metal pairing tips, neckline pairing, or gifting advice",
  "recommendedTypes": ["Necklaces", "Earrings", "Rings", "Bracelets", "Pendants"],
  "curatedTips": [
    "Tip 1 on layering, care, or proportions",
    "Tip 2 on skin-tone matching or diamond clarity",
    "Tip 3 on heirloom preservation"
  ],
  "suggestedKeywords": ["e.g. Diamond Petal", "Tennis Bracelet", "Solitaire Ring", "Teardrop"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.7-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        systemInstruction: "You are the head jewelry stylist at Stellify fine jewelry. You write with refined elegance, warmth, and deep jewelry expertise. Always return clean JSON.",
      },
    });

    const text = response.text || "{}";
    const parsed = JSON.parse(text);
    res.json({ success: true, data: parsed });
  } catch (error: any) {
    console.error("Gemini AI Jewelry Advisor error:", error);
    // Graceful fallback if API key is not configured yet or transient error
    res.json({
      success: true,
      data: {
        greeting: "Welcome to Stellify's Private Styling Suite.",
        stylingAdvice: "For a radiant and timeless presence, pairing warm 18K yellow gold with brilliant solitaire diamond accents creates harmonious balance across any neckline. Layering delicate 16-inch and 18-inch chains with a statement teardrop or petal pendant elongates the collarbone effortlessly.",
        recommendedTypes: ["Necklaces", "Earrings", "Rings"],
        curatedTips: [
          "Balance statement earrings with a delicate pendant rather than competing heavy chokers.",
          "Warm yellow gold naturally complements earthy tones, emerald silks, and crisp ivory whites.",
          "Clean natural gemstones with lukewarm water and a soft microfiber cloth to maintain optical brilliance."
        ],
        suggestedKeywords: ["Golden Petal", "Eternal Sparkle", "Diamond Teardrop"]
      }
    });
  }
});

// Health check
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", service: "STELLIFY FINE JEWELRY API" });
});

// Vite middleware for development vs static build in production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`✨ Stellify Jewelry Server running at http://localhost:${PORT}`);
  });
}

startServer();
