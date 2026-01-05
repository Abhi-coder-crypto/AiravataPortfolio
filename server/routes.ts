import type { Express } from "express";
import { createServer, type Server } from "http";
import { services, projects, getProjectsByServiceSlug, getProjectById, getServiceBySlug } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Get all services
  app.get("/api/services", (_req, res) => {
    res.json(services);
  });

  // Get service by slug
  app.get("/api/services/:slug", (req, res) => {
    const service = getServiceBySlug(req.params.slug);
    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }
    res.json(service);
  });

  // Get all projects
  app.get("/api/projects", (_req, res) => {
    res.json(projects);
  });

  // Get projects by service slug
  app.get("/api/projects/service/:slug", (req, res) => {
    const serviceProjects = getProjectsByServiceSlug(req.params.slug);
    res.json(serviceProjects);
  });

  // Get project by ID
  app.get("/api/projects/:id", (req, res) => {
    const project = getProjectById(req.params.id);
    if (!project) {
      return res.status(404).json({ error: "Project not found" });
    }
    res.json(project);
  });

  return httpServer;
}
