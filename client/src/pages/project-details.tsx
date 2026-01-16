import { useState, useEffect } from "react";
import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { 
  ArrowLeft, 
  CheckCircle2, 
  ExternalLink,
  X,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  Lightbulb
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import type { Service, Project } from "@shared/schema";
import { 
  SiReact, 
  SiTypescript, 
  SiNodedotjs, 
  SiExpress,
  SiMysql,
  SiTailwindcss,
  SiAmazon,
  SiAmazons3,
  SiMongodb,
  SiZod,
  SiHostinger,
  SiVercel
} from "react-icons/si";
import { Shield, Layers, Database, RefreshCw } from "lucide-react";

const techIconMap: Record<string, { icon: JSX.Element; category: string }> = {
  "React": { icon: <SiReact className="w-7 h-7 text-[#61DAFB]" />, category: "Frontend" },
  "TypeScript": { icon: <SiTypescript className="w-7 h-7 text-[#3178C6]" />, category: "Frontend" },
  "Tailwind CSS": { icon: <SiTailwindcss className="w-7 h-7 text-[#06B6D4]" />, category: "Frontend" },
  "Shadcn/ui": { icon: <Layers className="w-7 h-7 text-gray-700" />, category: "Frontend" },
  "Node.js": { icon: <SiNodedotjs className="w-7 h-7 text-[#339933]" />, category: "Backend" },
  "Express.js": { icon: <SiExpress className="w-7 h-7 text-gray-700" />, category: "Backend" },
  "MySQL": { icon: <SiMysql className="w-7 h-7 text-[#4479A1]" />, category: "Database" },
  "MongoDB": { icon: <SiMongodb className="w-7 h-7 text-[#47A248]" />, category: "Database" },
  "AWS": { icon: <SiAmazon className="w-7 h-7 text-[#FF9900]" />, category: "Deployment" },
  "JWT Security": { icon: <Shield className="w-7 h-7 text-green-600" />, category: "Security" },
  "Hostinger VPS Deployment": { icon: <SiHostinger className="w-7 h-7 text-[#673DE6]" />, category: "Deployment" },
  "Vercel Deployment": { icon: <SiVercel className="w-7 h-7 text-black dark:text-white" />, category: "Deployment" },
  "Netlify Deployment": { icon: <ExternalLink className="w-7 h-7 text-[#00C7B7]" />, category: "Deployment" },
  "Recharts": { icon: <CheckCircle2 className="w-7 h-7 text-blue-400" />, category: "Frontend" },
  "Framer Motion": { icon: <CheckCircle2 className="w-7 h-7 text-purple-400" />, category: "Frontend" },
  "PostgreSQL": { icon: <Database className="w-7 h-7 text-[#336791]" />, category: "Database" },
  "TanStack Query": { icon: <RefreshCw className="w-7 h-7 text-[#FF4154]" />, category: "Frontend" },
  "Zod": { icon: <SiZod className="w-7 h-7 text-[#3068B7]" />, category: "Backend" },
};

function ProjectDetailsSkeleton() {
  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Skeleton className="aspect-video w-full lg:col-span-2" />
        <div className="grid grid-cols-2 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="aspect-video" />
          ))}
        </div>
      </div>
      <div>
        <Skeleton className="h-12 w-3/4 mb-4" />
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-2/3" />
      </div>
    </div>
  );
}

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  projectName: string;
}

function ImageLightbox({ images, currentIndex, isOpen, onClose, onNext, onPrev, projectName }: ImageLightboxProps) {
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        onPrev();
      } else if (e.key === "ArrowRight") {
        onNext();
      } else if (e.key === "Escape") {
        onClose();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onNext, onPrev, onClose]);
  
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black flex flex-col"
        onClick={onClose}
      >
        {/* Top bar with close button */}
        <div className="flex justify-end p-4 flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="text-white bg-white/10 hover:bg-white/30 h-10 w-10 rounded-full"
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            data-testid="button-close-lightbox"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Main content area with image and navigation */}
        <div className="flex-1 flex items-center justify-center relative min-h-0">
          {/* Left navigation */}
          {images.length > 1 && (
            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-20 flex items-center justify-center z-10">
              <Button
                variant="ghost"
                size="icon"
                className="text-white bg-white/10 hover:bg-white/30 h-10 w-10 sm:h-12 sm:w-12 rounded-full"
                onClick={(e) => { e.stopPropagation(); onPrev(); }}
                data-testid="button-prev-image"
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
            </div>
          )}
          
          {/* Image container */}
          <div 
            className="flex items-center justify-center px-16 sm:px-24 w-full h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.img
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              src={images[currentIndex]}
              alt={`${projectName} - Image ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />
          </div>
          
          {/* Right navigation */}
          {images.length > 1 && (
            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-20 flex items-center justify-center z-10">
              <Button
                variant="ghost"
                size="icon"
                className="text-white bg-white/10 hover:bg-white/30 h-10 w-10 sm:h-12 sm:w-12 rounded-full"
                onClick={(e) => { e.stopPropagation(); onNext(); }}
                data-testid="button-next-image"
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </div>
          )}
        </div>
        
        {/* Bottom bar with counter */}
        <div className="flex justify-center p-4 flex-shrink-0">
          <div className="text-white text-sm bg-white/10 px-4 py-2 rounded-full">
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default function ProjectDetails() {
  const params = useParams<{ serviceSlug: string; projectId: string }>();
  const { serviceSlug = "", projectId = "" } = params;
  
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: project, isLoading: projectLoading } = useQuery<Project>({
    queryKey: ["/api/projects", projectId],
  });

  const { data: service, isLoading: serviceLoading } = useQuery<Service>({
    queryKey: ["/api/services", serviceSlug],
  });

  const isLoading = projectLoading || serviceLoading;
  
  const galleryImages = project?.galleryImages || [];
  const allImages = project ? [project.imageUrl, ...galleryImages] : [];
  
  const openLightbox = (index: number) => {
    if (allImages.length === 0) return;
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };
  
  const closeLightbox = () => setLightboxOpen(false);
  
  const nextImage = () => {
    if (allImages.length <= 1) return;
    setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
  };
  
  const prevImage = () => {
    if (allImages.length <= 1) return;
    setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
  };
  
  const desktopThumbnailCount = 12;
  const mobileThumbnailCount = 8;
  const desktopThumbnails = galleryImages.slice(0, desktopThumbnailCount);
  const mobileThumbnails = galleryImages.slice(0, mobileThumbnailCount);
  const hasMoreDesktopImages = galleryImages.length > desktopThumbnailCount;
  const hasMoreMobileImages = galleryImages.length > mobileThumbnailCount;

  if (!isLoading && (!project || !service)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">
            Project not found
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
      <ImageLightbox
        images={allImages}
        currentIndex={currentImageIndex}
        isOpen={lightboxOpen}
        onClose={closeLightbox}
        onNext={nextImage}
        onPrev={prevImage}
        projectName={project?.name || ""}
      />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex items-center justify-between mb-8"
        >
          <Link href={`/projects/${serviceSlug}`}>
            <Button
              variant="ghost"
              size="icon"
              className="text-black dark:text-black"
              data-testid="button-back-projects"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
          </Link>
          <h1 className="text-lg sm:text-xl lg:text-2xl font-light tracking-[0.15em] sm:tracking-[0.2em] text-black dark:text-black">
            AIRAVATA TECHNOLOGIES
          </h1>
          <div className="w-9" />
        </motion.div>

        {isLoading ? (
          <ProjectDetailsSkeleton />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-16"
          >
            {/* Project Title - Moved to Top */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <h1
                className="text-xl sm:text-3xl lg:text-4xl font-bold text-black dark:text-black tracking-tight leading-tight text-center break-words"
                data-testid="text-project-name"
              >
                {project?.name}
              </h1>
            </motion.section>

            {/* Image Gallery - Desktop Layout */}
            <section className="hidden lg:block -mx-4 sm:-mx-6 lg:-mx-8">
              <div className="grid grid-cols-3 gap-4 px-4 sm:px-6 lg:px-8">
                {/* Main Image - Left Side */}
                <div 
                  className="col-span-2 overflow-hidden cursor-pointer bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center"
                  onClick={() => openLightbox(0)}
                  data-testid="image-main-desktop"
                >
                  <img
                    src={project?.imageUrl}
                    alt={project?.name}
                    className={`${project?.isMobileFirst ? 'max-h-[700px] w-auto' : 'w-full h-auto'} object-contain mx-auto`}
                  />
                </div>
                
                {/* Thumbnails - Right Side */}
                {desktopThumbnails.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 content-start">
                    {desktopThumbnails.map((img, index) => {
                      const isLastVisible = index === desktopThumbnails.length - 1;
                      const showViewAll = isLastVisible && hasMoreDesktopImages;
                      const remainingCount = galleryImages.length - desktopThumbnailCount + 1;
                      
                      return (
                        <div
                          key={index}
                          className={`relative overflow-hidden cursor-pointer ${project?.isMobileFirst ? 'aspect-[3/4]' : 'aspect-video'} bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center`}
                          onClick={() => showViewAll ? openLightbox(0) : openLightbox(index + 1)}
                          data-testid={`thumbnail-desktop-${index}`}
                        >
                          <img
                            src={img}
                            alt={`${project?.name} gallery ${index + 1}`}
                            className="max-h-full w-auto object-contain"
                            loading="lazy"
                          />
                          {showViewAll && (
                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                              <span className="text-white text-lg font-semibold">View All ({remainingCount}+)</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </section>
            
            {/* Image Gallery - Mobile Layout */}
            <section className="lg:hidden">
              {/* Main Image */}
              <div 
                className="overflow-hidden cursor-pointer mb-2 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-center"
                onClick={() => openLightbox(0)}
                data-testid="image-main-mobile"
              >
                <img
                  src={project?.imageUrl}
                  alt={project?.name}
                  className={`${project?.isMobileFirst ? 'max-h-[500px] w-auto' : 'w-full h-auto'} object-contain mx-auto`}
                />
              </div>
              
              {/* Thumbnail Grid */}
              {mobileThumbnails.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {mobileThumbnails.map((img, index) => {
                    const isLastVisible = index === mobileThumbnails.length - 1;
                    const showViewAll = isLastVisible && hasMoreMobileImages;
                    const remainingCount = galleryImages.length - mobileThumbnailCount + 1;
                    
                    return (
                      <div
                        key={index}
                        className={`relative overflow-hidden cursor-pointer ${project?.isMobileFirst ? 'aspect-[3/4]' : 'aspect-video'} bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center`}
                        onClick={() => showViewAll ? openLightbox(0) : openLightbox(index + 1)}
                        data-testid={`thumbnail-mobile-${index}`}
                      >
                        <img
                          src={img}
                          alt={`${project?.name} gallery ${index + 1}`}
                          className="max-h-full w-auto object-contain"
                          loading="lazy"
                        />
                        {showViewAll && (
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                            <span className="text-white text-sm font-semibold">View All ({remainingCount}+)</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </section>

            {/* Project Description - Full Width, Black Text */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <p className="text-xl text-black dark:text-black leading-relaxed w-full text-justify">
                {project?.fullDescription}
              </p>
            </motion.section>

            <Separator className="my-8" />

            {/* Client Information Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xl font-semibold text-black dark:text-black mb-6 uppercase tracking-wide">
                Project Details
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                <div className="space-y-1">
                  <span className="text-xs text-black dark:text-black uppercase tracking-wider font-medium">
                    Client
                  </span>
                  <p
                    className="text-sm font-medium text-black dark:text-black"
                    data-testid="text-client-name"
                  >
                    {project?.clientName}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-black dark:text-black uppercase tracking-wider font-medium">
                    Industry
                  </span>
                  <p className="text-sm font-medium text-black dark:text-black">
                    {project?.clientIndustry}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-black dark:text-black uppercase tracking-wider font-medium">
                    Location
                  </span>
                  <p className="text-sm font-medium text-black dark:text-black">
                    {project?.clientLocation}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-black dark:text-black uppercase tracking-wider font-medium">
                    Duration
                  </span>
                  <p
                    className="text-sm font-medium text-black dark:text-black"
                    data-testid="text-duration"
                  >
                    {project?.duration}
                  </p>
                </div>

                {project?.database && (
                  <div className="space-y-1">
                    <span className="text-xs text-black dark:text-black uppercase tracking-wider font-medium">
                      Database
                    </span>
                    <p className="text-sm font-medium text-black dark:text-black flex items-center gap-1">
                      <Database className="w-3 h-3" />
                      {project.database}
                    </p>
                  </div>
                )}

                <div className="space-y-1">
                  <span className="text-xs text-black dark:text-black uppercase tracking-wider font-medium">
                    Completed
                  </span>
                  <p className="text-sm font-medium text-black dark:text-black">
                    {project?.completedDate}
                  </p>
                </div>

                <div className="space-y-1">
                  <span className="text-xs text-black dark:text-black uppercase tracking-wider font-medium">
                    Deployment
                  </span>
                  {project?.websiteUrl && project.websiteUrl !== "#" ? (
                    <a
                      href={project.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-black dark:text-black hover:underline inline-flex items-center gap-1"
                      data-testid="link-website"
                    >
                      {project.websiteUrl.replace("https://", "").replace("/", "")}
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <p className="text-sm font-medium text-black dark:text-black">
                      Private
                    </p>
                  )}
                </div>
              </div>
            </motion.section>

            <Separator className="my-8" />

            {/* Technology Stack Section */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <h2 className="text-2xl font-bold text-black dark:text-black mb-8 flex items-center gap-3">
                <span className="w-1 h-8 bg-blue-500 rounded-full" />
                Technology Stack
              </h2>
              <div data-testid="list-technologies">
                {(() => {
                  const technologies = project?.technologies ?? [];
                  const categories = ["Frontend", "Backend", "Database", "Deployment", "Security"];
                  const grouped: Record<string, string[]> = {};
                  
                  technologies.forEach(tech => {
                    const techInfo = techIconMap[tech];
                    const category = techInfo?.category || "Other";
                    if (!grouped[category]) grouped[category] = [];
                    grouped[category].push(tech);
                  });
                  
                  return (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                      {categories.filter(cat => grouped[cat]?.length > 0).map(category => (
                        <div key={category} className="space-y-3">
                          <h3 className="text-sm font-semibold text-black dark:text-black uppercase tracking-wider">
                            {category}
                          </h3>
                          <div className="space-y-2">
                            {grouped[category].map((tech, idx) => (
                              <div
                                key={idx}
                                className="flex items-center gap-3 p-3 border border-gray-200 rounded-md"
                              >
                                {techIconMap[tech]?.icon || <CheckCircle2 className="w-7 h-7 text-gray-400" />}
                                <span className="text-sm font-medium text-black dark:text-black">{tech}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  );
                })()}
              </div>
            </motion.section>

            {/* Key Features & Results Section - Conditional UI */}
            {serviceSlug === "website-development" ? (
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12"
              >
                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-black flex items-center gap-3">
                    <span className="w-1.5 h-10 bg-primary rounded-full" />
                    Project Features
                  </h2>
                  <div className="grid gap-4">
                    {(project?.features ?? []).map((feature, idx) => {
                      const [title, description] = feature.includes(":") 
                        ? feature.split(":") 
                        : [feature, ""];
                      
                      return (
                        <Card key={idx} className="p-5 border-none bg-gray-50/50 hover-elevate transition-all duration-300 group">
                          <div className="flex gap-4">
                            <div className="mt-1 flex-shrink-0">
                              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                <Lightbulb className="w-5 h-5" />
                              </div>
                            </div>
                            <div className="space-y-1">
                              <h3 className="font-bold text-black leading-tight">
                                {title.trim()}
                              </h3>
                              {description && (
                                <p className="text-sm text-gray-600 leading-relaxed">
                                  {description.trim()}
                                </p>
                              )}
                            </div>
                          </div>
                        </Card>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-8">
                  <h2 className="text-3xl font-bold text-black flex items-center gap-3">
                    <span className="w-1.5 h-10 bg-green-500 rounded-full" />
                    Project Impact
                  </h2>
                  <div className="grid gap-4">
                    {(project?.outcomes ?? []).map((outcome, idx) => (
                      <Card key={idx} className="p-6 border-none bg-green-50/30 border-l-4 border-l-green-500 hover-elevate transition-all duration-300">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 flex-shrink-0">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                          <p className="font-medium text-gray-800 leading-relaxed italic">
                            "{outcome}"
                          </p>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              </motion.section>
            ) : (
              <div className="space-y-16">
                {/* Original Key Features Section - Problem/Solution Format */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-900 mb-8 flex items-center gap-3">
                    <span className="w-1 h-8 bg-green-500 rounded-full" />
                    Key Features
                  </h2>
                  <div
                    className="grid grid-cols-1 gap-4"
                    data-testid="list-features"
                  >
                    {(project?.features ?? []).map((feature, index) => {
                      const hasProblemSolution = feature.includes(" | ");
                      if (hasProblemSolution) {
                        const parts = feature.split(" | ");
                        const problemPart = parts[0];
                        const solutionPart = parts[1];
                        
                        const problemText = problemPart.replace(/Problem:\s*/i, "").trim();
                        const solutionText = solutionPart.replace(/Solution:\s*/i, "").trim();
                        return (
                          <div
                            key={index}
                            className="bg-white dark:bg-white border border-gray-200 rounded-md overflow-hidden"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2">
                              <div className="p-4 bg-red-50 dark:bg-red-50 flex items-start gap-3">
                                <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <div>
                                  <span className="text-xs font-semibold text-red-600 uppercase tracking-wider">Problem</span>
                                  <p className="text-sm text-gray-800 dark:text-gray-800 mt-1">{problemText}</p>
                                </div>
                              </div>
                              <div className="p-4 bg-green-50 dark:bg-green-50 flex items-start gap-3">
                                <Lightbulb className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                                <div>
                                  <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">Solution</span>
                                  <p className="text-sm text-gray-800 dark:text-gray-800 mt-1">{solutionText}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-50 border border-gray-200 rounded-md"
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-base text-gray-800 dark:text-gray-800 font-medium">{feature}</span>
                        </div>
                      );
                    })}
                  </div>
                </motion.section>

                {/* Original Project Outcomes Section - Problem/Result Format */}
                <motion.section
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <h2 className="text-2xl font-bold text-black dark:text-black mb-8 flex items-center gap-3">
                    <span className="w-1 h-8 bg-indigo-500 rounded-full" />
                    Project Results
                  </h2>
                  <div
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                    data-testid="list-outcomes"
                  >
                    {(project?.outcomes ?? []).map((outcome, index) => {
                      const hasProblemResult = outcome.includes(" | ");
                      if (hasProblemResult) {
                        const [problem, result] = outcome.split(" | ");
                        const problemText = problem.replace("Problem: ", "");
                        const resultText = result.replace("Result: ", "");
                        return (
                          <div
                            key={index}
                            className="border border-gray-200 rounded-md overflow-hidden"
                          >
                            <div className="p-4 border-b border-gray-200">
                              <div className="flex items-start gap-3">
                                <AlertTriangle className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                <div>
                                  <span className="text-xs font-semibold text-black uppercase tracking-wider">Challenge</span>
                                  <p className="text-sm text-black dark:text-black mt-1">{problemText}</p>
                                </div>
                              </div>
                            </div>
                            <div className="p-4">
                              <div className="flex items-start gap-3">
                                <CheckCircle2 className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                                <div>
                                  <span className="text-xs font-semibold text-green-600 uppercase tracking-wider">Result</span>
                                  <p className="text-sm font-semibold text-black dark:text-black mt-1">{resultText}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      }
                      return (
                        <div
                          key={index}
                          className="flex items-start gap-4 p-5 border border-gray-200 rounded-md"
                        >
                          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                            <span className="text-indigo-600 font-bold text-sm">{index + 1}</span>
                          </div>
                          <p className="text-base text-black dark:text-black font-medium leading-relaxed">
                            {outcome}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </motion.section>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
