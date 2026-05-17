import {
  ChefHat,
  Heart,
  MapPin,
  Play,
  TrendingUp,
  Users,
  UtensilsCrossed,
  Zap,
} from "lucide-react";

const FOOD_IMAGES = [
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=600&fit=crop",
  "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400&h=600&fit=crop",
];

const BRANDS = [
  "McDonald's",
  "KFC",
  "Domino's",
  "Subway",
  "Starbucks",
  "Pizza Hut",
];

const FEATURES = [
  {
    icon: Play,
    title: "Swipe to Discover",
    description:
      "Scroll through endless food reels. Each swipe brings a new culinary adventure from restaurants near you.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: MapPin,
    title: "Order Instantly",
    description:
      "See something delicious? Tap to view the menu and order directly. No more switching between apps.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: ChefHat,
    title: "Creator Economy",
    description:
      "Food creators can monetize their content. Earn from views, referrals, and brand partnerships.",
    gradient: "from-purple-500 to-pink-500",
  },
  {
    icon: TrendingUp,
    title: "Trending Foods",
    description:
      "Stay ahead of food trends. See what's going viral in your city and be the first to try it.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Users,
    title: "Social Experience",
    description:
      "Share your favorite finds, create food collections, and follow creators who match your taste.",
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    icon: Zap,
    title: "Smart Recommendations",
    description:
      "AI-powered suggestions learn your preferences. The more you swipe, the better it gets.",
    gradient: "from-pink-500 to-rose-500",
  },
];

const REELS = [
  {
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=600&fit=crop",
    title: "Smash Burger",
    creator: "@burgerking",
    likes: "45.2K",
    location: "New York",
  },
  {
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?w=400&h=600&fit=crop",
    title: "Chocolate Donuts",
    creator: "@sweettooth",
    likes: "32.1K",
    location: "Chicago",
  },
  {
    image:
      "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=600&fit=crop",
    title: "Sushi Platter",
    creator: "@sushimaster",
    likes: "28.9K",
    location: "San Francisco",
  },
  {
    image:
      "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=400&h=600&fit=crop",
    title: "Pasta Alfredo",
    creator: "@italianchef",
    likes: "21.5K",
    location: "Boston",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Open & Swipe",
    description:
      "Launch the app and start swiping through personalized food reels based on your location and preferences.",
    icon: UtensilsCrossed,
  },
  {
    number: "02",
    title: "Discover & Save",
    description:
      "Find dishes that catch your eye. Like, save, or share them with friends. Build your food wishlist.",
    icon: Heart,
  },
  {
    number: "03",
    title: "Order & Enjoy",
    description:
      "Ready to eat? Order directly from the reel with one tap. Track your delivery in real-time.",
    icon: Zap,
  },
];

const LINKS = {
  Product: ["Features", "Pricing", "API", "Integrations"],
  Company: ["About", "Blog", "Careers", "Press"],
  Resources: ["Documentation", "Help Center", "Community", "Contact"],
  Legal: ["Privacy", "Terms", "Security", "Cookies"],
};

export { FOOD_IMAGES, BRANDS, FEATURES, REELS, STEPS, LINKS };
