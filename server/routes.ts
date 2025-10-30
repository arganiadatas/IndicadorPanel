import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all economic indicators
  app.get("/api/indicators", async (_req, res) => {
    try {
      const indicators = await storage.getAllIndicators();
      res.json(indicators);
    } catch (error) {
      console.error("Error fetching indicators:", error);
      res.status(500).json({ error: "Failed to fetch indicators" });
    }
  });

  // Get a specific indicator by ID
  app.get("/api/indicators/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const indicator = await storage.getIndicatorById(id);
      
      if (!indicator) {
        return res.status(404).json({ error: "Indicator not found" });
      }
      
      res.json(indicator);
    } catch (error) {
      console.error("Error fetching indicator:", error);
      res.status(500).json({ error: "Failed to fetch indicator" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
