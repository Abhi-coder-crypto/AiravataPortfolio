import mongoose from "mongoose";
import { ServiceModel, ProjectModel } from "../shared/schema";
import dotenv from "dotenv";

dotenv.config();

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("MONGODB_URI is not defined");
  process.exit(1);
}

async function update() {
  try {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");

    const barrelBornImages = [
      "/attached_assets/barrelborn.airavatatechnologies.com_(iPhone_14_Pro_Max)_1767605011722.png",
      "/attached_assets/barrelborn.airavatatechnologies.com_(iPhone_14_Pro_Max)_(2)_1767605011723.png",
      "/attached_assets/barrelborn.airavatatechnologies.com_(iPhone_14_Pro_Max)_(3)_1767605011724.png"
    ];

    const updateData = {
      imageUrl: barrelBornImages[0],
      galleryImages: barrelBornImages,
      isMobileFirst: true
    };

    const result = await ProjectModel.updateOne(
      { name: "Barrel Born Digital Menu" },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      console.error("Project 'Barrel Born Digital Menu' not found");
    } else {
      console.log("Updated Barrel Born images and set isMobileFirst: true successfully");
    }

    process.exit(0);
  } catch (error) {
    console.error("Error updating data:", error);
    process.exit(1);
  }
}

update();
