import { CourseItem } from "@/types";

// Note: As specified in engineering requirements, placeholder data is clearly identified.
export const placeholderCourses: CourseItem[] = [
  {
    id: "course-1",
    title: "[Upcoming Workshop] Caregiver Training: Safe Patient Transfers & Stroke Recovery",
    level: "Beginner",
    category: "Caregiver Training",
    duration: "2-Day Weekend Workshop (4 Hours)",
    instructor: "Rehabilitation Clinical Faculty (Amit Centre)",
    description:
      "A practical, hands-on workshop for family members and caregivers teaching ergonomic bed transfers, wheelchair safety, and preventing pressure sores.",
    topics: [
      "Biomechanics of safe lifting and preventing caregiver back strain",
      "Wheelchair-to-bed and toilet transfer mechanics",
      "Assisting stroke survivors with hemiplegic arm and leg positioning",
      "Fall prevention and emergency response at home",
    ],
    enrolledCount: 14,
  },
  {
    id: "course-2",
    title: "[Upcoming Workshop] Workplace Ergonomics & Spinal Posture Reset",
    level: "Intermediate",
    category: "Preventative Health",
    duration: "3-Hour Intensive Seminar",
    instructor: "Senior Physical Therapist",
    description:
      "A corporate and individual workshop focused on identifying desk-bound muscular imbalances, desk setup calibration, and 5-minute micro-stretch routines.",
    topics: [
      "Ergonomic monitor, chair, and keyboard geometry",
      "Decompressing the cervical and lumbar spine during long work hours",
      "Relieving repetitive strain injury (RSI) and mouse wrist pain",
      "Daily 10-minute mobility flow for desk workers",
    ],
    enrolledCount: 28,
  },
  {
    id: "course-3",
    title: "[Upcoming Workshop] Return-to-Sport Biomechanics for Youth Athletes",
    level: "Advanced",
    category: "Sports Rehab",
    duration: "Full-Day Masterclass",
    instructor: "Sports Physiotherapist",
    description:
      "Advanced biomechanical training for coaches, athletes, and trainers on ACL injury prevention drills, jump landing mechanics, and load monitoring.",
    topics: [
      "Dynamic neuromuscular warmup protocol (FIFA 11+ principles)",
      "Landing mechanics and valgus knee collapse correction",
      "Hamstring eccentric strengthening fundamentals",
      "Safe timeline metrics for returning to competitive play",
    ],
    enrolledCount: 19,
  },
];
