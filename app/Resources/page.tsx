"use client"; // Mark this as a Client Component

import { useState } from "react";
import { ResourceCard } from "@/components/report/ResourceCard";

// Mock data for resources (can be replaced with an API call)
const resources = [
    // Government Schemes
    {
      id: 1,
      category: "Government Schemes",
      title: "Beti Bachao Beti Padhao",
      description: "A government scheme to empower the girl child through education and welfare.",
      link: "https://wcd.nic.in/bbbp-schemes",
      icon: "👧",
    },
    {
      id: 2,
      category: "Government Schemes",
      title: "Pradhan Mantri Matru Vandana Yojana",
      description: "A maternity benefit program for pregnant and lactating women.",
      link: "https://pmmvvy.nic.in/",
      icon: "🤰",
    },
    {
      id: 3,
      category: "Government Schemes",
      title: "Mahila Shakti Kendra",
      description: "Empowers rural women through community participation and awareness generation.",
      link: "https://wcd.nic.in/mahila-shakti-kendra",
      icon: "💪",
    },
    {
      id: 4,
      category: "Government Schemes",
      title: "Sukanya Samriddhi Yojana",
      description: "A savings scheme for the girl child to secure her education and marriage expenses.",
      link: "https://www.indiapost.gov.in/Financial/pages/content/sukanya-samriddhi-yojana.aspx",
      icon: "💰",
    },
    {
      id: 5,
      category: "Government Schemes",
      title: "Ujjwala Yojana",
      description: "Provides free LPG connections to women from below-poverty-line households.",
      link: "https://www.pmuy.gov.in/",
      icon: "🔥",
    },
  
    // Helplines
    {
      id: 6,
      category: "Helplines",
      title: "Women Helpline (181)",
      description: "A 24/7 helpline for women in distress, providing support and assistance.",
      link: "https://wcd.nic.in/women-helpline-scheme",
      icon: "📞",
    },
    {
      id: 7,
      category: "Helplines",
      title: "Cyber Crime Helpline (1930)",
      description: "Report cyber crimes and seek assistance through this helpline.",
      link: "https://cybercrime.gov.in/",
      icon: "💻",
    },
    {
      id: 8,
      category: "Helplines",
      title: "Child Helpline (1098)",
      description: "A 24/7 helpline for children in need of care and protection.",
      link: "https://www.childlineindia.org/",
      icon: "👶",
    },
    {
      id: 9,
      category: "Helplines",
      title: "Senior Citizen Helpline (14567)",
      description: "A helpline for senior citizens to report abuse or seek assistance.",
      link: "https://www.nhp.gov.in/national-elderline-14567_pg",
      icon: "👵",
    },
  
    // Legal Resources
    {
      id: 10,
      category: "Legal Resources",
      title: "National Commission for Women",
      description: "A statutory body to protect and promote the rights of women in India.",
      link: "https://ncw.nic.in/",
      icon: "⚖️",
    },
    {
      id: 11,
      category: "Legal Resources",
      title: "Legal Aid Services",
      description: "Free legal aid and support for women under the Legal Services Authorities Act.",
      link: "https://nalsa.gov.in/",
      icon: "⚖️",
    },
    {
      id: 12,
      category: "Legal Resources",
      title: "Domestic Violence Act (2005)",
      description: "Information about the Protection of Women from Domestic Violence Act.",
      link: "https://wcd.nic.in/domestic-violence-act-2005",
      icon: "🚫",
    },
  
    // Health and Wellness
    {
      id: 13,
      category: "Health and Wellness",
      title: "Ayushman Bharat Yojana",
      description: "Provides health insurance coverage to low-income families.",
      link: "https://www.pmjay.gov.in/",
      icon: "🏥",
    },
    {
      id: 14,
      category: "Health and Wellness",
      title: "National Mental Health Helpline (1800-599-0019)",
      description: "A helpline for mental health support and counseling.",
      link: "https://www.nimhans.ac.in/",
      icon: "🧠",
    },
  
    // Education and Employment
    {
      id: 15,
      category: "Education and Employment",
      title: "Skill India Mission",
      description: "Aims to train over 40 crore people in India in different skills by 2022.",
      link: "https://www.skillindia.gov.in/",
      icon: "🎓",
    },
    {
      id: 16,
      category: "Education and Employment",
      title: "National Scholarship Portal",
      description: "A one-stop solution for various scholarship schemes offered by the government.",
      link: "https://scholarships.gov.in/",
      icon: "🎓",
    },
  ];

// Categories for filtering
const categories = [
    "All",
    "Government Schemes",
    "Helplines",
    "Legal Resources",
    "Health and Wellness",
    "Education and Employment",
  ];

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter resources based on search query and category
  const filteredResources = resources.filter((resource) => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || resource.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="relative min-h-screen bg-black selection:bg-sky-500/20 overflow-hidden">
      {/* Gradient Background */}
      <div className="fixed inset-0 -z-10 min-h-screen">
        <div className="absolute inset-0 h-full bg-[radial-gradient(circle_at_center,rgba(56,189,248,0.03),transparent_50%)]" />
        <div className="absolute inset-0 h-full bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.04),transparent_70%)]" />
      </div>

      <main className="relative px-6 pt-32">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex h-9 items-center gap-2 rounded-full border border-sky-500/20 bg-sky-500/10 px-4 text-sm text-sky-400">
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
              Useful Resources
            </div>

            <h1 className="mt-8 bg-gradient-to-b from-white to-white/80 bg-clip-text text-5xl font-bold tracking-tight text-transparent">
              Resources
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Explore important government schemes, helplines, and other resources to
              help you stay informed and safe.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-8">
            <input
              type="text"
              placeholder="Search resources..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-zinc-800/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            />
          </div>

          {/* Category Filters */}
          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-sky-500/10 border border-sky-500/20 text-sky-400"
                    : "bg-zinc-800/50 border border-white/10 text-zinc-400 hover:bg-zinc-800/70"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Resource Cards */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((resource) => (
              <ResourceCard
                key={resource.id}
                title={resource.title}
                description={resource.description}
                link={resource.link}
                icon={resource.icon}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}