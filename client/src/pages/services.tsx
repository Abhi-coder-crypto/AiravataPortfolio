import { Link } from "wouter";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import type { Service } from "@shared/schema";

import websiteDevImg from "@assets/2_1765447271354.png";
import mobileAppImg from "@assets/3_1765447271355.png";
import softwareDevImg from "@assets/4_1765447271355.png";
import digitalMarketingImg from "@assets/5_1765447271356.png";
import companyLogo from "@assets/ATLOGOPNGNOBG_1765463495567.png";

const imageMap: Record<string, string> = {
  "website-development": websiteDevImg,
  "mobile-application-development": mobileAppImg,
  "software-development": softwareDevImg,
  "digital-marketing": digitalMarketingImg,
};

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

function ServiceImageSkeleton() {
  return (
    <Skeleton className="w-full aspect-video rounded-lg" />
  );
}

export default function Services() {
  const { data: services = [], isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  return (
    <div className="min-h-screen bg-white py-1 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl w-full mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="py-1 mb-4 text-center"
        >
          <img 
            src={companyLogo} 
            alt="Airavata Technologies Logo" 
            className="w-44 h-44 sm:w-52 sm:h-52 lg:w-64 lg:h-64 mx-auto -mb-6 sm:-mb-8 lg:-mb-10"
          />
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-black mb-3">
            Digital Portfolio
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl text-black whitespace-nowrap">
            Transforming Business Through Innovative Technology
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {[1, 2, 3, 4].map((i) => (
              <ServiceImageSkeleton key={i} />
            ))}
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          >
            {services.map((service) => {
              const serviceImage = imageMap[service.slug];
              return (
                <motion.div key={service.id} variants={cardVariants}>
                  <Link href={`/projects/${service.slug}`}>
                    <div
                      className="cursor-pointer rounded-lg"
                      data-testid={`image-service-${service.id}`}
                    >
                      <img
                        src={serviceImage}
                        alt={service.title}
                        className="w-full h-auto object-cover rounded-lg"
                      />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
}
