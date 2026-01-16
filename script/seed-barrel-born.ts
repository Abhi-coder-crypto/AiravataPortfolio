import mongoose from "mongoose";
import { ServiceModel, ProjectModel } from "../shared/schema";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("MONGODB_URI is not defined");
  process.exit(1);
}

async function seed() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    // Find the Website Development service
    const websiteService = await ServiceModel.findOne({ slug: "website-development" });
    if (!websiteService) {
      console.error("Website Development service not found");
      process.exit(1);
    }

    const barrelBornProject = {
      serviceId: websiteService._id,
      name: "Barrel Born Digital Menu",
      shortDescription: "A sophisticated digital menu platform for Barrel Born, enhancing guest engagement and operational efficiency.",
      fullDescription: "A high-performance digital menu ecosystem designed for Barrel Born. The platform offers an interactive and visually appealing menu experience, allowing guests to explore culinary offerings with ease. Integrated with modern web technologies, it ensures seamless updates and a premium digital presence for the brand.",
      imageUrl: "/attached_assets/barrel-born-hero.png", // Placeholder or from assets if known
      galleryImages: ["/attached_assets/barrel-born-1.png", "/attached_assets/barrel-born-2.png"],
      clientName: "Barrel Born",
      clientIndustry: "Hospitality / F&B",
      clientLocation: "Mumbai, India",
      websiteUrl: "https://barrelborn.com", // Example URL
      duration: "2 weeks",
      completedDate: "October 2025",
      technologies: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
      database: "MongoDB",
      isMobileFirst: true,
      features: [
        "Interactive Digital Menu: Categorized display of food and beverages with high-resolution imagery.",
        "Real-time Updates: Easy-to-use backend for instant menu modifications.",
        "Mobile-Optimized Interface: Seamless experience across all mobile devices for on-table browsing.",
        "QR Code Integration: Quick access for guests via table-top QR codes.",
        "Elegant Brand Storytelling: Dedicated sections for brand heritage and culinary philosophy."
      ],
      outcomes: [
        "Enhanced Guest Engagement: Significant increase in menu exploration and interaction.",
        "Operational Efficiency: Reduced dependency on physical menus and streamlined update process.",
        "Premium Digital Authority: Established a sophisticated online presence aligned with the brand's identity."
      ]
    };

    const existing = await ProjectModel.findOne({ name: "Barrel Born Digital Menu" });
    if (existing) {
      console.log("Project already exists, updating...");
      await ProjectModel.updateOne({ name: "Barrel Born Digital Menu" }, barrelBornProject);
    } else {
      console.log("Creating new project...");
      await ProjectModel.create(barrelBornProject);
    }

    console.log("Seed completed successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}

seed();
