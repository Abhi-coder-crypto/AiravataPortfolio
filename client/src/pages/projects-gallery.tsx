import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { Service, Project } from "@shared/schema";

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

function ProjectCardSkeleton() {
  return (
    <div className="space-y-4">
      <Skeleton className="aspect-video w-full" />
      <div className="space-y-2">
        <Skeleton className="h-6 w-3/4" />
        <Skeleton className="h-4 w-full" />
      </div>
    </div>
  );
}

export default function ProjectsGallery() {
  const params = useParams<{ serviceSlug: string }>();
  const serviceSlug = params.serviceSlug || "";

  const { data: service, isLoading: serviceLoading } = useQuery<Service>({
    queryKey: ["/api/services", serviceSlug],
  });

  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects/service", serviceSlug],
  });

  const isLoading = serviceLoading || projectsLoading;

  if (!isLoading && !service) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">
            Service not found
          </h1>
          <Link href="/">
            <Button variant="outline" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Services
            </Button>
          </Link>
        </div>
      </div>
    );
  }

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
          {isLoading ? (
            <>
              <Skeleton className="h-12 w-80 mb-3 mx-auto" />
              <Skeleton className="h-6 w-96 mx-auto" />
            </>
          ) : (
            <>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-black dark:text-black mb-3">
                {service?.title}
              </h2>
              <p className="text-sm sm:text-lg lg:text-xl text-gray-600 dark:text-gray-600">
                Explore our portfolio of {service?.title.toLowerCase()} projects
              </p>
            </>
          )}
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {[1, 2, 3, 4].map((i) => (
              <ProjectCardSkeleton key={i} />
            ))}
          </div>
        ) : projects.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-20"
          >
            <p className="text-muted-foreground text-lg">
              No projects available yet for this service.
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          >
            {projects.map((project) => (
              <motion.div key={project.id} variants={cardVariants}>
                <Link href={`/projects/${serviceSlug}/${project.id}`}>
                  <div
                    className="group cursor-pointer"
                    data-testid={`card-project-${project.id}`}
                  >
                    <div className="relative aspect-video overflow-hidden mb-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-white shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:border-gray-300 flex items-center justify-center">
                      {project.isMobileFirst ? (
                        <div className="flex items-center justify-center gap-4 h-full w-full">
                          <img
                            src={project.galleryImages[0]}
                            alt={`${project.name} screen 1`}
                            className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <img
                            src={project.galleryImages[1]}
                            alt={`${project.name} screen 2`}
                            className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          {project.galleryImages[2] && (
                            <img
                              src={project.galleryImages[2]}
                              alt={`${project.name} screen 3`}
                              className="h-full w-auto object-contain transition-transform duration-500 group-hover:scale-105"
                              loading="lazy"
                            />
                          )}
                        </div>
                      ) : (
                        <img
                          src={project.imageUrl}
                          alt={project.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                      )}
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-medium text-gray-900 dark:text-gray-900 line-clamp-2 group-hover:text-black transition-colors text-center">
                        {project.name}
                      </h3>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
