import { z } from "zod";

export const appointmentSchema = z.object({
  name: z
    .string()
    .min(2, "Full name must be at least 2 characters long")
    .max(100, "Name cannot exceed 100 characters")
    .regex(/^[a-zA-Z\s.'-]+$/, "Please enter a valid name using letters and spaces"),
  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .max(16, "Phone number is too long")
    .regex(/^[+]?[0-9\s-]{10,16}$/, "Please enter a valid phone number (e.g., +91 9876543210 or 9876543210)"),
  email: z
    .string()
    .email("Please provide a valid email address")
    .optional()
    .or(z.literal("")),
  service: z
    .string()
    .min(1, "Please select a rehabilitation service"),
  session_type: z.enum([
    "In-Clinic Evaluation",
    "Home Care Consultation",
    "Follow-up Therapy",
    "Virtual Tele-Rehab",
  ], {
    errorMap: () => ({ message: "Please select a valid session type" }),
  }),
  preferred_date: z
    .string()
    .min(1, "Please choose your preferred appointment date")
    .refine((dateStr) => {
      const selected = new Date(dateStr);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return !isNaN(selected.getTime()) && selected >= today;
    }, "Appointment date cannot be in the past"),
  preferred_time: z
    .string()
    .min(1, "Please choose a preferred time slot"),
  message: z
    .string()
    .max(1000, "Notes cannot exceed 1000 characters")
    .optional()
    .or(z.literal("")),
});

export type AppointmentFormData = z.infer<typeof appointmentSchema>;
