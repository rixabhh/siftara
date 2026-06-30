import { seedCertificates, seedCourses } from "@/lib/db/seed";

export const launchMetrics = [
  { label: "Curated paths", value: seedCourses.length.toString(), detail: "human-reviewed library" },
  { label: "Verified certificates", value: seedCertificates.length.toString(), detail: "trust-policy backed" },
  { label: "My Sift limit", value: "1 free", detail: "credits unlock more" },
  { label: "Trust threshold", value: "80%+", detail: "quiz average required" },
];

export const pricingPlans = [
  {
    name: "Free",
    price: "$0",
    description: "For curated learning and one high-trust My Sift trial.",
    features: [
      "Curated course library",
      "Progress and roadmap tracking",
      "Randomized quiz checkpoints",
      "Free verified certificates",
      "One free My Sift",
    ],
    cta: "Start free",
    href: "/courses",
    featured: false,
  },
  {
    name: "My Sift Credits",
    price: "$9",
    description: "Credit packs for learners who want more personalized paths.",
    features: [
      "3 additional My Sifts",
      "Educational Sift Check",
      "Personalized roadmap and schedule",
      "Advanced quiz variants",
      "Certificates remain free",
    ],
    cta: "Preview credits",
    href: "/my-sift",
    featured: true,
  },
  {
    name: "Team Pilot",
    price: "Custom",
    description: "For clubs, cohorts, and small teams validating guided learning.",
    features: [
      "Assigned learning paths",
      "Team completion reports",
      "Private My Sifts",
      "Certificate verification exports",
      "Admin trust dashboard",
    ],
    cta: "View teams",
    href: "/teams",
    featured: false,
  },
];

export const learnerProfile = {
  handle: "demo-learner",
  name: "Demo Learner",
  headline: "Frontend learner building verified proof with Siftara.",
  skills: ["React", "JSX", "Hooks", "State Management", "Python"],
  badges: ["Quiz Master", "Consistent Learner", "Siftara Verified"],
  publicStats: [
    { label: "Completed paths", value: "2" },
    { label: "Verified certificates", value: "2" },
    { label: "Skill evidence", value: "9" },
    { label: "Trust average", value: "96%" },
  ],
};

export const teamPilotRows = [
  { cohort: "Frontend Club", learners: 24, assigned: "React Mastery", completion: 68, certificates: 11 },
  { cohort: "AI Tools Sprint", learners: 18, assigned: "AI Tools for Developers", completion: 52, certificates: 6 },
  { cohort: "Python Study Circle", learners: 32, assigned: "Python Fundamentals", completion: 44, certificates: 8 },
];

export const creatorPipeline = [
  { creator: "Traversy Media", path: "React Mastery", status: "Curated", quality: 92 },
  { creator: "Programming with Mosh", path: "Python Fundamentals", status: "Curated", quality: 89 },
  { creator: "DesignCourse", path: "UI Design Essentials", status: "Review Ready", quality: 84 },
];

export const analyticsEvents = [
  "signup",
  "course_start",
  "lesson_complete",
  "quiz_complete",
  "certificate_issued",
  "certificate_shared",
  "my_sift_submitted",
  "my_sift_approved",
  "payment_started",
  "payment_completed",
];
