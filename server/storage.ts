import { type User, type InsertUser, type Service, type Project, ServiceModel, ProjectModel } from "@shared/schema";
import mongoose from "mongoose";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Service methods
  getServices(): Promise<Service[]>;
  getServiceBySlug(slug: string): Promise<Service | null>;
  
  // Project methods
  getProjects(): Promise<Project[]>;
  getProjectsByServiceId(serviceId: string): Promise<Project[]>;
  getProjectById(id: string): Promise<Project | null>;
}

export class MongoStorage implements IStorage {
  constructor() {
    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI is not defined");
    mongoose.connect(uri);
  }

  async getUser(id: string): Promise<User | undefined> {
    return undefined; // Auth not fully implemented for Mongo yet
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async getServices(): Promise<Service[]> {
    const services = await ServiceModel.find().lean();
    return services.map((s: any) => ({ ...s, id: s._id.toString() }));
  }

  async getServiceBySlug(slug: string): Promise<Service | null> {
    const service = await ServiceModel.findOne({ slug }).lean();
    if (!service) return null;
    return { ...service, id: (service as any)._id.toString() } as Service;
  }

  async getProjects(): Promise<Project[]> {
    const projects = await ProjectModel.find().lean();
    return projects.map((p: any) => ({ ...p, id: p._id.toString() }));
  }

  async getProjectsByServiceId(serviceId: string): Promise<Project[]> {
    const projects = await ProjectModel.find({ serviceId }).lean();
    return projects.map((p: any) => ({ ...p, id: p._id.toString() }));
  }

  async getProjectById(id: string): Promise<Project | null> {
    if (!mongoose.Types.ObjectId.isValid(id)) return null;
    const project = await ProjectModel.findById(id).lean();
    if (!project) return null;
    return { ...project, id: (project as any)._id.toString() } as Project;
  }
}

export const storage = new MongoStorage();
