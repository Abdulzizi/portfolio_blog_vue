import { ref, computed } from "vue";

//! hardcoded data (replace with api soon)
const projects = ref([
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "WEB DESIGN",
    description: "Modern shopping experience with seamless checkout flow",
    year: "2024",
    featured: true,
    color: "bg-gradient-to-br from-blue-500 to-purple-600",
    textColor: "text-white",
    borderColor: "border-white",
    slug: "ecommerce-platform",
    image: null,
    tags: ["React", "Node.js", "Stripe"],
    client: "Tech Startup",
    status: "published",
  },
  {
    id: 2,
    title: "Tech Startup",
    category: "BRANDING",
    description: "Complete brand identity system",
    year: "2024",
    featured: false,
    color: "bg-yellow-300",
    textColor: "text-black",
    borderColor: "border-black",
    slug: "tech-startup-branding",
    image: null,
    tags: ["Logo Design", "Brand Guidelines"],
    client: "StartupCo",
    status: "published",
  },
  {
    id: 3,
    title: "Fitness Tracker",
    category: "MOBILE APP",
    description: "iOS and Android fitness tracking application",
    year: "2023",
    featured: true,
    color: "bg-black",
    textColor: "text-white",
    borderColor: "border-white",
    slug: "fitness-tracker-app",
    image: null,
    tags: ["React Native", "Health Kit"],
    client: "FitnessCorp",
    status: "published",
  },
  {
    id: 4,
    title: "Brand Campaign",
    category: "VIDEO",
    description: "Creative video campaign for product launch",
    year: "2024",
    featured: false,
    color: "bg-green-400",
    textColor: "text-black",
    borderColor: "border-black",
    slug: "brand-campaign-video",
    image: null,
    tags: ["Video Production", "Motion Graphics"],
    client: "BrandCorp",
    status: "published",
  },
  {
    id: 5,
    title: "Social Media",
    category: "CONTENT",
    description: "Social media content strategy and design",
    year: "2023",
    featured: false,
    color: "bg-rose-300",
    textColor: "text-black",
    borderColor: "border-black",
    slug: "social-media-content",
    image: null,
    tags: ["Content Strategy", "Graphic Design"],
    client: "SocialCorp",
    status: "published",
  },
  {
    id: 6,
    title: "Portfolio Website",
    category: "WEB DESIGN",
    description: "Personal portfolio with custom animations",
    year: "2024",
    featured: false,
    color: "bg-purple-500",
    textColor: "text-white",
    borderColor: "border-white",
    slug: "portfolio-website",
    image: null,
    tags: ["Vue.js", "GSAP", "Tailwind"],
    client: "Personal",
    status: "published",
  },
  {
    id: 7,
    title: "Product Design",
    category: "PRODUCT DESIGN",
    description: "Product design for a new mobile app",
    year: "2024",
    featured: false,
    color: "bg-indigo-500",
    textColor: "text-white",
    borderColor: "border-white",
    slug: "product-design",
    image: null,
    tags: ["Figma", "Design Systems"],
    client: "ProductCorp",
    status: "published",
  },
  {
    id: 8,
    title: "Web Application",
    category: "WEB DEVELOPMENT",
    description: "Web application for a startup",
    year: "2024",
    featured: false,
    color: "bg-cyan-500",
    textColor: "text-black",
    borderColor: "border-black",
    slug: "web-application",
    image: null,
    tags: ["React", "Node.js", "MongoDB"],
    client: "StartupCo",
    status: "published",
  },
]);

export function useProjects() {
  // Get all published projects
  const publishedProjects = computed(() =>
    projects.value.filter((project) => project.status === "published")
  );

  // Get featured projects (for main display)
  const featuredProjects = computed(() =>
    publishedProjects.value.filter((project) => project.featured)
  );

  // Get projects for grid display (limit to specific number)
  const gridProjects = computed(() => {
    const featured = featuredProjects.value;
    const regular = publishedProjects.value.filter(
      (project) => !project.featured
    );

    // Always show featured first, then fill with regular projects up to 6 total
    const combined = [...featured, ...regular];
    return combined.slice(0, 6);
  });

  // Get projects by category
  const getProjectsByCategory = (category) => {
    return publishedProjects.value.filter(
      (project) => project.category.toLowerCase() === category.toLowerCase()
    );
  };

  // Get project by slug
  const getProjectBySlug = (slug) => {
    return publishedProjects.value.find((project) => project.slug === slug);
  };

  // Add new project (for admin)
  const addProject = (projectData) => {
    const newProject = {
      id: Date.now(),
      ...projectData,
      status: "published",
    };
    projects.value.push(newProject);
    return newProject;
  };

  // Update project (for admin)
  const updateProject = (id, updates) => {
    const index = projects.value.findIndex((project) => project.id === id);
    if (index !== -1) {
      projects.value[index] = { ...projects.value[index], ...updates };
      return projects.value[index];
    }
    return null;
  };

  // Delete project (for admin)
  const deleteProject = (id) => {
    const index = projects.value.findIndex((project) => project.id === id);
    if (index !== -1) {
      projects.value.splice(index, 1);
      return true;
    }
    return false;
  };

  return {
    projects: publishedProjects,
    featuredProjects,
    gridProjects,
    getProjectsByCategory,
    getProjectBySlug,
    addProject,
    updateProject,
    deleteProject,
  };
}
