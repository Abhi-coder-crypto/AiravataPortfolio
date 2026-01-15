import mongoose from "mongoose";
import { services, projects, ServiceModel, ProjectModel } from "../shared/schema";
import * as dotenv from "dotenv";

dotenv.config();

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("MONGODB_URI not found");
    process.exit(1);
  }

  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    // Clear existing data
    await ServiceModel.deleteMany({});
    await ProjectModel.deleteMany({});
    console.log("Cleared existing data");

    // Seed Services
    const createdServices = await ServiceModel.insertMany(
      services.map(({ id, ...s }) => s)
    );
    console.log(`Seeded ${createdServices.length} services`);

    // Map old IDs to new MongoDB IDs
    const serviceMap = new Map();
    createdServices.forEach(s => {
      const originalService = services.find(os => os.slug === s.slug);
      if (originalService) {
        serviceMap.set(originalService.id, s._id.toString());
      }
    });

    // Seed Projects
    const projectsToSeed = projects.map(({ id, serviceId, ...p }) => ({
      ...p,
      serviceId: serviceMap.get(serviceId) || serviceId
    }));

    await ProjectModel.insertMany(projectsToSeed);
    console.log(`Seeded ${projectsToSeed.length} projects`);

    console.log("Seeding completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seed();
