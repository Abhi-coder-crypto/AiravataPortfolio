import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Play } from "lucide-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

interface Reel {
  id: string;
  brandId: string;
  thumbnailUrl: string;
  videoUrl?: string;
  title: string;
}

interface BrandInfo {
  id: string;
  name: string;
  categoryId: string;
}

const brandInfo: Record<string, BrandInfo> = {
  "spice-garden": { id: "spice-garden", name: "Spice Garden", categoryId: "restaurant" },
  "ocean-bites": { id: "ocean-bites", name: "Ocean Bites", categoryId: "restaurant" },
  "urban-kitchen": { id: "urban-kitchen", name: "Urban Kitchen", categoryId: "restaurant" },
  "dream-homes": { id: "dream-homes", name: "Dream Homes", categoryId: "real-estate" },
  "prime-properties": { id: "prime-properties", name: "Prime Properties", categoryId: "real-estate" },
  "care-plus": { id: "care-plus", name: "Care Plus Clinic", categoryId: "healthcare" },
  "wellness-hub": { id: "wellness-hub", name: "Wellness Hub", categoryId: "healthcare" },
  "little-stars": { id: "little-stars", name: "Little Stars Academy", categoryId: "preschools" },
  "tiny-tots": { id: "tiny-tots", name: "Tiny Tots Preschool", categoryId: "preschools" },
  "grand-resort": { id: "grand-resort", name: "Grand Resort", categoryId: "hospitality" },
  "luxury-stays": { id: "luxury-stays", name: "Luxury Stays", categoryId: "hospitality" },
  "glow-beauty": { id: "glow-beauty", name: "Glow Beauty", categoryId: "skincare" },
  "pure-skin": { id: "pure-skin", name: "Pure Skin Clinic", categoryId: "skincare" },
  "fitzone": { id: "fitzone", name: "FitZone", categoryId: "gyms" },
  "power-gym": { id: "power-gym", name: "Power Gym", categoryId: "gyms" },
  "style-studio": { id: "style-studio", name: "Style Studio", categoryId: "salon" },
  "glamour-salon": { id: "glamour-salon", name: "Glamour Salon", categoryId: "salon" },
};

const reels: Reel[] = [
  { id: "r1", brandId: "spice-garden", thumbnailUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&h=700&fit=crop", title: "Grand Opening" },
  { id: "r2", brandId: "spice-garden", thumbnailUrl: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=700&fit=crop", title: "Chef Special" },
  { id: "r3", brandId: "spice-garden", thumbnailUrl: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=700&fit=crop", title: "Weekend Feast" },
  { id: "r4", brandId: "spice-garden", thumbnailUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=700&fit=crop", title: "Signature Dishes" },
  { id: "r5", brandId: "spice-garden", thumbnailUrl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=700&fit=crop", title: "Food Festival" },
  { id: "r6", brandId: "ocean-bites", thumbnailUrl: "https://images.unsplash.com/photo-1579631542720-3a87824fff86?w=400&h=700&fit=crop", title: "Seafood Special" },
  { id: "r7", brandId: "ocean-bites", thumbnailUrl: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=400&h=700&fit=crop", title: "Fresh Catch" },
  { id: "r8", brandId: "ocean-bites", thumbnailUrl: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?w=400&h=700&fit=crop", title: "Ocean View Dining" },
  { id: "r9", brandId: "urban-kitchen", thumbnailUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=700&fit=crop", title: "Modern Cuisine" },
  { id: "r10", brandId: "urban-kitchen", thumbnailUrl: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=700&fit=crop", title: "Brunch Menu" },
  { id: "r11", brandId: "urban-kitchen", thumbnailUrl: "https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=400&h=700&fit=crop", title: "Healthy Options" },
  { id: "r12", brandId: "urban-kitchen", thumbnailUrl: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=700&fit=crop", title: "Chef's Table" },
  { id: "r13", brandId: "dream-homes", thumbnailUrl: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=700&fit=crop", title: "Luxury Villa Tour" },
  { id: "r14", brandId: "dream-homes", thumbnailUrl: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=400&h=700&fit=crop", title: "Penthouse View" },
  { id: "r15", brandId: "dream-homes", thumbnailUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=700&fit=crop", title: "Modern Living" },
  { id: "r16", brandId: "prime-properties", thumbnailUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=700&fit=crop", title: "Premium Listings" },
  { id: "r17", brandId: "prime-properties", thumbnailUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=700&fit=crop", title: "Dream Home" },
  { id: "r18", brandId: "care-plus", thumbnailUrl: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=700&fit=crop", title: "Health Tips" },
  { id: "r19", brandId: "care-plus", thumbnailUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=400&h=700&fit=crop", title: "Wellness Guide" },
  { id: "r20", brandId: "wellness-hub", thumbnailUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=700&fit=crop", title: "Healthy Living" },
  { id: "r21", brandId: "little-stars", thumbnailUrl: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?w=400&h=700&fit=crop", title: "Fun Learning" },
  { id: "r22", brandId: "little-stars", thumbnailUrl: "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=400&h=700&fit=crop", title: "Play Time" },
  { id: "r23", brandId: "tiny-tots", thumbnailUrl: "https://images.unsplash.com/photo-1544776193-352d25ca82cd?w=400&h=700&fit=crop", title: "Creative Arts" },
  { id: "r24", brandId: "grand-resort", thumbnailUrl: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&h=700&fit=crop", title: "Resort Tour" },
  { id: "r25", brandId: "grand-resort", thumbnailUrl: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400&h=700&fit=crop", title: "Poolside" },
  { id: "r26", brandId: "luxury-stays", thumbnailUrl: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=700&fit=crop", title: "Suite Life" },
  { id: "r27", brandId: "glow-beauty", thumbnailUrl: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&h=700&fit=crop", title: "Skincare Routine" },
  { id: "r28", brandId: "glow-beauty", thumbnailUrl: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=700&fit=crop", title: "Glow Tips" },
  { id: "r29", brandId: "pure-skin", thumbnailUrl: "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=700&fit=crop", title: "Treatment Guide" },
  { id: "r30", brandId: "fitzone", thumbnailUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&h=700&fit=crop", title: "Workout Tips" },
  { id: "r31", brandId: "fitzone", thumbnailUrl: "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400&h=700&fit=crop", title: "HIIT Session" },
  { id: "r32", brandId: "power-gym", thumbnailUrl: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=400&h=700&fit=crop", title: "Strength Training" },
  { id: "r33", brandId: "style-studio", thumbnailUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=400&h=700&fit=crop", title: "Hair Trends" },
  { id: "r34", brandId: "style-studio", thumbnailUrl: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&h=700&fit=crop", title: "Color Magic" },
  { id: "r35", brandId: "glamour-salon", thumbnailUrl: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?w=400&h=700&fit=crop", title: "Bridal Looks" },
];

export default function DigitalMarketingReels() {
  const params = useParams<{ categoryId: string; brandId: string }>();
  const categoryId = params.categoryId || "";
  const brandId = params.brandId || "";
  
  const brand = brandInfo[brandId];
  const brandReels = reels.filter((r) => r.brandId === brandId);

  if (!brand) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-foreground mb-4">
            Brand not found
          </h1>
          <Link href="/projects/digital-marketing">
            <Button variant="outline" data-testid="button-back">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Categories
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link href={`/digital-marketing/${categoryId}`}>
            <Button
              variant="ghost"
              className="mb-6 -ml-2 text-muted-foreground"
              data-testid="button-back-brands"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Brands
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-center mb-10"
        >
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-light tracking-[0.15em] sm:tracking-[0.2em] text-foreground mb-3">
            AIRAVATA TECHNOLOGIES
          </h1>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-medium text-foreground mb-3">
            {brand.name}
          </h2>
          <p className="text-sm sm:text-lg lg:text-xl text-muted-foreground">
            {brandReels.length} Reels
          </p>
        </motion.div>

        {brandReels.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No reels available yet for this brand.
            </p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
          >
            {brandReels.map((reel) => (
              <motion.div
                key={reel.id}
                variants={cardVariants}
                className="group cursor-pointer"
                data-testid={`reel-${reel.id}`}
              >
                <div className="relative aspect-[9/16] rounded-lg overflow-hidden bg-muted shadow-md">
                  <img
                    src={reel.thumbnailUrl}
                    alt={reel.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                      <Play className="w-7 h-7 text-white fill-white" />
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="text-white text-sm font-medium truncate">
                      {reel.title}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
