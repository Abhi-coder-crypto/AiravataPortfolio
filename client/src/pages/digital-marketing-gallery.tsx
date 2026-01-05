import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import restaurantsImage from "@assets/1_1765462901309.png";
import realEstateImage from "@assets/2_1765462901310.png";
import healthcareImage from "@assets/3_1765462901310.png";
import preschoolsImage from "@assets/4_1765462901310.png";
import skincareImage from "@assets/5_1765462901310.png";
import gymsImage from "@assets/6_1765462901311.png";
import salonsImage from "@assets/7_1765462901313.png";
import hospitalityImage from "@assets/8_1765462901314.png";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

interface Category {
  id: string;
  name: string;
  imageUrl: string;
}

const categories: Category[] = [
  { id: "restaurant", name: "Restaurants", imageUrl: restaurantsImage },
  { id: "real-estate", name: "Real Estate", imageUrl: realEstateImage },
  { id: "healthcare", name: "Health Care", imageUrl: healthcareImage },
  { id: "preschools", name: "Pre Schools", imageUrl: preschoolsImage },
  { id: "hospitality", name: "Hospitality", imageUrl: hospitalityImage },
  { id: "skincare", name: "Skin Care", imageUrl: skincareImage },
  { id: "gyms", name: "Gyms", imageUrl: gymsImage },
  { id: "salon", name: "Salons", imageUrl: salonsImage },
];

export default function DigitalMarketingGallery() {
  return (
    <div className="min-h-screen bg-white dark:bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-8"
        >
          <Link href="/">
            <Button
              variant="ghost"
              size="icon"
              className="text-black dark:text-black"
              data-testid="button-back-services"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-light tracking-[0.15em] sm:tracking-[0.2em] text-black dark:text-black">
            AIRAVATA TECHNOLOGIES
          </h1>
          <div className="w-9" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-black dark:text-black mb-3">
            Digital Marketing Portfolio
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl text-gray-600 dark:text-gray-600">
            Driving Brand Growth Through Strategic Digital Campaigns
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
        >
          {categories.map((category) => (
            <motion.div key={category.id} variants={cardVariants}>
              <Link href={`/digital-marketing/${category.id}`}>
                <Card
                  className="overflow-hidden cursor-pointer border-0 shadow-none bg-white dark:bg-white"
                  data-testid={`category-card-${category.id}`}
                >
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-auto object-contain"
                    loading="lazy"
                  />
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
