import { createClient } from "@supabase/supabase-js";
import { AppointmentEnquiry } from "@/types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || "";

export const isSupabaseConfigured = Boolean(
  supabaseUrl && (supabaseAnonKey || supabaseServiceKey)
);

// Public browser client (uses Anon key with RLS)
export const supabasePublic = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey || supabaseServiceKey)
  : null;

// Privileged server client (uses Service Role key, only used in server route handlers)
export const supabaseAdmin = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey)
  : null;

// Persistent local fallback store for appointments
class LocalAppointmentStore {
  private appointments: AppointmentEnquiry[] = [];
  private filePath: string = "";

  constructor() {
    this.init();
  }

  private init() {
    try {
      if (typeof window === "undefined") {
        // Node.js environment
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const fs = require("node:fs");
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const path = require("node:path");
        const dir = path.join(process.cwd(), "src", "data");
        this.filePath = path.join(dir, "local-appointments.json");

        if (fs.existsSync(this.filePath)) {
          const raw = fs.readFileSync(this.filePath, "utf-8");
          const parsed = JSON.parse(raw);
          if (Array.isArray(parsed) && parsed.length > 0) {
            this.appointments = parsed;
            return;
          }
        }
      }
    } catch (e) {
      console.warn("Could not load local appointments from file, using defaults:", e);
    }

    // Default sample records matching Screenshot
    this.appointments = [
      {
        id: "enq-sample-101",
        created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
        name: "Rajesh Sharma",
        phone: "+91 98765 43210",
        email: "rajesh.sharma@example.com",
        service: "Orthopedic Rehabilitation",
        session_type: "In-Clinic Evaluation",
        preferred_date: new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
        preferred_time: "10:00 AM – 11:30 AM",
        message: "Post-knee arthroscopy mobility exercises and strength rebuilding.",
        status: "Confirmed",
        source: "Website",
      },
      {
        id: "enq-sample-102",
        created_at: new Date(Date.now() - 3600000 * 6).toISOString(),
        name: "Pooja Verma",
        phone: "+91 91234 56789",
        email: "pooja.verma@example.com",
        service: "Neurological Rehabilitation",
        session_type: "Home Care Consultation",
        preferred_date: new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0],
        preferred_time: "02:00 PM – 03:30 PM",
        message: "Rehabilitation assessment for elderly family member recovering from minor stroke.",
        status: "Pending",
        source: "Website",
      },
      {
        id: "enq-sample-103",
        created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
        name: "Vikas Tyagi",
        phone: "+91 99887 76655",
        email: "vikas.t@example.com",
        service: "Sports Injury Recovery",
        session_type: "In-Clinic Evaluation",
        preferred_date: new Date(Date.now() + 86400000 * 1).toISOString().split("T")[0],
        preferred_time: "05:00 PM – 06:30 PM",
        message: "Grade 2 ankle sprain during weekend cricket. Need rehab plan.",
        status: "Contacted",
        source: "WhatsApp",
      },
    ];

    this.saveToFile();
  }

  private saveToFile() {
    try {
      if (typeof window === "undefined" && this.filePath) {
        // eslint-disable-next-line @typescript-eslint/no-require-imports
        const fs = require("node:fs");
        fs.writeFileSync(this.filePath, JSON.stringify(this.appointments, null, 2), "utf-8");
      }
    } catch (e) {
      console.warn("Could not persist local appointments to file:", e);
    }
  }

  async insert(enquiry: Omit<AppointmentEnquiry, "id" | "created_at" | "status">): Promise<AppointmentEnquiry> {
    const newRecord: AppointmentEnquiry = {
      ...enquiry,
      id: `enq-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      created_at: new Date().toISOString(),
      status: "Pending",
    };
    this.appointments.unshift(newRecord);
    this.saveToFile();
    return newRecord;
  }

  async getAll(): Promise<AppointmentEnquiry[]> {
    return [...this.appointments];
  }

  async updateStatus(id: string, status: AppointmentEnquiry["status"]): Promise<AppointmentEnquiry | null> {
    const item = this.appointments.find((a) => a.id === id);
    if (item) {
      item.status = status;
      this.saveToFile();
      return item;
    }
    return null;
  }
}

// Global singleton for fallback storage so state survives across route invocations
const globalForStore = globalThis as unknown as { appointmentStore?: LocalAppointmentStore };
if (!globalForStore.appointmentStore) {
  globalForStore.appointmentStore = new LocalAppointmentStore();
}
export const appointmentStore = globalForStore.appointmentStore;
