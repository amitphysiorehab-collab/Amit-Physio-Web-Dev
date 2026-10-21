export type SessionType =
  | "In-Clinic Evaluation"
  | "Home Care Consultation"
  | "Follow-up Therapy"
  | "Virtual Tele-Rehab";

export interface AppointmentEnquiry {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email?: string;
  service: string;
  session_type: SessionType;
  preferred_date: string;
  preferred_time: string;
  message?: string;
  status: "Pending" | "Contacted" | "Confirmed" | "Completed" | "Cancelled";
  source?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  conditions: string[];
  techniques: string[];
  sessionDuration: string;
  iconName: string;
  image: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Therapy Sessions" | "Billing & Insurance" | "Preparation";
}

export interface CourseItem {
  id: string;
  title: string;
  level: "Beginner" | "Intermediate" | "Advanced" | "Professional";
  category: string;
  duration: string;
  instructor: string;
  description: string;
  topics: string[];
  enrolledCount: number;
}
