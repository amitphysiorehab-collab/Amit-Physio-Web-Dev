"use client";

import React, { useState, useMemo } from "react";
import { Search, Clock } from "lucide-react";
import { placeholderCourses } from "@/data/coursesData";

export default function CoursesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("All");

  const levels = ["All", "Beginner", "Intermediate", "Advanced", "Professional"];

  const filteredCourses = useMemo(() => {
    return placeholderCourses.filter((course) => {
      const matchesSearch =
        course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.topics.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesLevel =
        selectedLevel === "All" || course.level === selectedLevel;

      return matchesSearch && matchesLevel;
    });
  }, [searchQuery, selectedLevel]);

  return (
    <div className="bg-white min-h-[70vh] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Control Bar matching Screenshot 3 */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-10 border-b border-slate-100">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Courses
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Continuing education workshops, caregiver training, and clinical mobility seminars.
            </p>
          </div>

          {/* Level Filter & Search Bar matching Screenshot 3 */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Level Dropdown */}
            <div className="relative">
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="appearance-none bg-slate-50 border border-slate-200 text-slate-700 text-sm font-medium py-2.5 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400 cursor-pointer"
                aria-label="Filter courses by level"
              >
                <option value="All">Level (All)</option>
                {levels.filter((l) => l !== "All").map((lvl) => (
                  <option key={lvl} value={lvl}>
                    Level: {lvl}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">
                ▼
              </div>
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <input
                type="text"
                placeholder="Search courses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm py-2.5 pl-4 pr-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400"
              />
              <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Courses Display */}
        <div className="py-12">
          {filteredCourses.length === 0 ? (
            /* Screenshot 3 exact state */
            <div className="text-center py-20 px-4">
              <p className="text-2xl sm:text-3xl font-bold text-slate-800">
                No Course created yet.
              </p>
              <p className="mt-3 text-sm text-slate-400 max-w-md mx-auto">
                Check back soon for upcoming clinical seminars, caregiver mobility training, and ergonomics workshops.
              </p>
            </div>
          ) : (
            /* Searchable Course Cards */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCourses.map((course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-2xl border border-slate-200/80 p-7 flex flex-col justify-between hover:shadow-md hover:border-brand-300 transition-all"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-1 rounded-md">
                        {course.category}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-md">
                        {course.level}
                      </span>
                    </div>

                    <h2 className="text-lg font-bold text-slate-900 mb-3 leading-snug">
                      {course.title}
                    </h2>

                    <p className="text-slate-600 text-sm leading-relaxed mb-6">
                      {course.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                        Key Topics Covered:
                      </p>
                      <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                        {course.topics.slice(0, 3).map((topic, i) => (
                          <li key={i}>{topic}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1.5 font-medium">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{course.duration}</span>
                    </span>
                    <a
                      href={`https://wa.me/917903992329?text=${encodeURIComponent(`Hello, I would like more information on the workshop: ${course.title}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-brand-600 hover:text-brand-700 hover:underline"
                    >
                      Enquire for Details →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
