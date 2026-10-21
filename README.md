# Amit Rehabilitation Centre Web Application

A full-stack, responsive web application for **Amit Rehabilitation Centre**, rebuilt from the original website (`amitrehabilitationcentre.odoo.com`) using **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, and **Supabase PostgreSQL**.

---

## 🌟 Key Features

1. **Brand Identity & Aesthetic Preservation**:
   - Reconstructed vector circular logo with motto: *"Move Better • Live Stronger"*.
   - Light blue and warm off-white color palette (`#55b8e4`, `#0ea5e9`, slate neutrals).
   - Rounded cards, clean typography, spacious layout, and smooth animations.

2. **Core Pages**:
   - **Home (`/`)**: Hero banner, "Why Patients Trust Us" 3-card trust pillars, Services overview, "Clinic Operating Hours" with image, "Start Your Recovery Journey Today" CTA banner with abstract radial dots, and FAQ preview.
   - **Services Overview (`/services`)**: Clinical programs directory with condition tags, duration badges, and direct booking links.
   - **Individual Service Detail (`/services/[slug]`)**: Dynamic routes for Orthopedic Rehab, Neuro-Rehab, Sports Injury, Spine Care, Geriatric Therapy, and Post-Surgical Rehab.
   - **Appointment Enquiry (`/appointment`)**:
     - Fields: Patient Name, Mobile Number, Email, Service, Session Type, Preferred Date, Preferred Time, Condition Notes.
     - Dual-layer validation (Client-side Zod + Server-side route handler validation).
     - Direct WhatsApp enquiry integration with pre-filled message template to `+91 7903992329`.
     - Non-misleading scheduling notices clearly stating enquiries are confirmed via clinic callback.
   - **Courses & Workshops (`/courses`)**:
     - Level filter dropdown ("Beginner", "Intermediate", "Advanced", "Professional").
     - Search input with real-time course/topic matching.
     - State toggle: Allows viewing the screenshot-accurate empty state (*"No Course created yet."*) or previewing upcoming clinical training workshops.
   - **FAQ (`/faq`)**:
     - Interactive accordions matching Screenshot 1 verbatim, with active sky-blue styling, chevron rotation, and comprehensive patient care guidance.
   - **Contact (`/contact`)**:
     - Clinic address: *E-Block, Beta 1, Greater Noida, Uttar Pradesh 201308*.
     - Phone: *+91 7903992329*.
     - Email: *amityadav19242906@gmail.com*.
     - Clinic operating hours & wheelchair accessibility notices.
   - **Protected Admin Portal (`/admin` & `/admin/login`)**:
     - Secure authentication via session cookies.
     - Metrics dashboard: Total enquiries, pending reviews, contacted patients, confirmed appointments.
     - Real-time status update dropdowns (`Pending`, `Contacted`, `Confirmed`, `Completed`, `Cancelled`).
     - Quick "Call Patient" and "WhatsApp Patient" shortcuts.
     - CSV export for clinical intake records.

---

## 🛠️ Technology Stack

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Validation**: [Zod](https://zod.dev/)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL + Row Level Security)
- **Testing**: [Playwright](https://playwright.dev/)

---

## 🚀 Getting Started Locally

### Prerequisites
- Node.js 18.17+ or Node.js 20+
- npm, yarn, or pnpm

### Installation

1. Clone or navigate to the repository directory:
   ```bash
   cd "Amit Website"
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗄️ Database Setup (Supabase)

1. Create a free PostgreSQL project on [Supabase](https://supabase.com/).
2. In the Supabase Dashboard, open the **SQL Editor**.
3. Run the migration script located at `supabase/migrations/001_create_appointments.sql`.
4. Copy your project URL, Anon Key, and Service Role Key into `.env.local`:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
   ```
> **Note**: If Supabase credentials are not provided, the application automatically uses an in-memory/fallback store for appointments, allowing the entire flow to be tested immediately without database setup.

---

## 🔐 Staff Admin Access

- **URL**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)
- **Default Email**: `admin@amitrehab.com`
- **Default Password**: `AmitRehab@2026`

---

## 🧪 Testing with Playwright

Run end-to-end tests:
```bash
npx playwright test
```

To view the visual test report:
```bash
npx playwright show-report
```

---

## 🚢 Deployment to Vercel

1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Rebuild Amit Rehabilitation Centre web app"
   git branch -M main
   git remote add origin <your-github-repo-url>
   git push -u origin main
   ```
2. Import the repository in [Vercel](https://vercel.com/new).
3. In the Vercel Project Settings, add the environment variables from `.env.example`.
4. Click **Deploy**.
