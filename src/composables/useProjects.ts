import { ref, computed } from "vue";

const projects = ref([
  {
    id: "04d80dcd-219f-4808-b11f-cd752e997711",
    title: "Project Four",
    description: "This is a detailed description of Project Four.",
    link: "https://github.com/project-four",
    slug: "project-four",
    thumbnail: null,
    images: [],
    tech_stack: '["Ruby on Rails","MySQL"]',
    is_published: 1,
    start_date: "2020-01-01",
    // end_date: "2021-01-01",
  },
  {
    id: "23e8183d-0778-4b68-b46d-cf019a7f6537",
    title: "Project Five",
    description: "This is the description for Project Five.",
    link: "https://github.com/project-five",
    slug: "project-five",
    thumbnail: null,
    images: [],
    tech_stack: '["PHP","Laravel","MySQL"]',
    is_published: 1,
    start_date: "2020-01-01",
    end_date: "2021-01-01",
  },
  {
    id: "b1a2c3d4-5678-9012-3456-7890abcdef01",
    title: "Project Six",
    description: "This is the description for Project Six.",
    link: "https://github.com/project-six",
    slug: "project-six",
    thumbnail: null,
    images: [],
    tech_stack: '["JavaScript","React","Node.js"]',
    is_published: 1,
    start_date: "2020-01-01",
    end_date: "2021-01-01",
  },
  {
    id: "b1a2c3d4-5678-9012-3456-7890abcdef02",
    title: "Project Seven",
    description: "This is the description for Project Seven.",
    link: "https://github.com/project-seven",
    slug: "project-seven",
    thumbnail: null,
    images: [],
    tech_stack: '["JavaScript","React","Redux"]',
    start_date: "2021-01-01",
    end_date: "2023-01-01",
    is_published: 1,
  },
  {
    id: "b1a2c3d4-5678-9012-3456-7890abcdef03",
    title: "Project Eight",
    description: "This is the description for Project Eight.",
    link: "https://github.com/project-eight",
    slug: "project-eight",
    thumbnail: null,
    images: [],
    tech_stack: '["JavaScript","Vue.js","Node.js"]',
    is_published: 1,
    start_date: "2021-01-01",
    end_date: "2023-01-01",
  },
  {
    id: "b1a2c3d4-5678-9012-3456-7890abcdef04",
    title: "Project Nine",
    description: "This is the description for Project Nine.",
    link: "https://github.com/project-nine",
    slug: "project-nine",
    thumbnail: null,
    images: [],
    tech_stack: '["JavaScript","React","TypeScript"]',
    is_published: 1,
    start_date: "2021-01-01",
    end_date: "2023-01-01",
  },
  {
    id: "b1a2c3d4-5678-9012-3456-7890abcdef05",
    title: "Project Ten",
    description: "This is the description for Project Ten.",
    link: "https://github.com/project-ten",
    slug: "project-ten",
    thumbnail: null,
    images: [],
    tech_stack: '["JavaScript","React","React Router"]',
    is_published: 1,
    start_date: "2021-01-01",
    end_date: "2023-01-01",
  },
]);

function formatPeriod(start, end) {
  if (!start) return "—";

  const format = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("default", { month: "long", year: "numeric" });
  };

  if (!end || start === end) return format(start);

  return `${format(start)} – ${format(end)}`;
}

function safeParse(json) {
  if (!json) return [];
  try {
    return JSON.parse(json);
  } catch {
    return [];
  }
}

const withComputedProps = computed(() =>
  projects.value.map((p) => ({
    ...p,
    status: p.is_published === 1 ? "published" : "draft",
    techStack: safeParse(p.tech_stack),
    featured: p.images.length > 0 || p.id === projects.value[0]?.id,
    periodLabel: formatPeriod(p.start_date, p.end_date),
  }))
);
export function useProjects() {
  /* published only */
  const publishedProjects = computed(() =>
    withComputedProps.value.filter((p) => p.status === "published")
  );

  const featuredProjects = computed(() =>
    publishedProjects.value.filter((p) => p.featured)
  );

  const gridProjects = computed(() => {
    const featured = featuredProjects.value;
    const regular = publishedProjects.value.filter((p) => !p.featured);
    return [...featured, ...regular].slice(0, 6);
  });

  const getProjectsByCategory = (category) =>
    publishedProjects.value.filter(
      (p) => (p.category ?? "").toLowerCase() === category.toLowerCase()
    );

  const getProjectBySlug = (slug) =>
    publishedProjects.value.find((p) => p.slug === slug);

  /* You can still keep these admin helpers if you wish */
  const addProject = (data) => {
    projects.value.push({
      ...data,
      id: crypto.randomUUID?.() ?? Date.now(),
      is_published: 1,
      tech_stack: JSON.stringify(data.techStack ?? []),
    });
  };

  const updateProject = (id, updates) => {
    const idx = projects.value.findIndex((p) => p.id === id);
    if (idx !== -1)
      projects.value[idx] = { ...projects.value[idx], ...updates };
  };

  const deleteProject = (id) => {
    projects.value = projects.value.filter((p) => p.id !== id);
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
