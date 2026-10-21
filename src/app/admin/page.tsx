"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Calendar,
  Phone,
  Search,
  Download,
  LogOut,
  RefreshCw,
  CheckCircle2,
  Clock,
  MessageSquare,
  Check,
  AlertCircle,
} from "lucide-react";
import { AppointmentEnquiry } from "@/types";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [appointments, setAppointments] = useState<AppointmentEnquiry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const fetchAppointments = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/appointments");
      const json = await res.json();
      if (json.success && json.data) {
        setAppointments(json.data);
      }
    } catch (err) {
      console.error("Failed to load appointments:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const showToast = (text: string, type: "success" | "error" = "success") => {
    setToastMessage({ text, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleStatusChange = async (id: string, newStatus: AppointmentEnquiry["status"]) => {
    const target = appointments.find((a) => a.id === id);
    const previousStatus = target?.status;
    const patientName = target?.name || "Patient";

    setIsUpdating(id);

    // Optimistic local update for instant user feedback
    setAppointments((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );

    try {
      const res = await fetch(`/api/appointments/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to update appointment status");
      }

      showToast(`Status updated to "${newStatus}" for ${patientName}`, "success");
    } catch (err) {
      console.error("Failed to update status:", err);
      // Revert to previous status on error
      if (previousStatus) {
        setAppointments((prev) =>
          prev.map((item) => (item.id === id ? { ...item, status: previousStatus } : item))
        );
      }
      showToast(`Failed to update status. Please try again.`, "error");
    } finally {
      setIsUpdating(null);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/login", { method: "DELETE" });
      router.push("/admin/login");
    } catch {
      router.push("/admin/login");
    }
  };

  const exportCSV = () => {
    if (appointments.length === 0) return;

    const headers = [
      "ID",
      "Date Submitted",
      "Patient Name",
      "Phone",
      "Email",
      "Service",
      "Session Type",
      "Preferred Date",
      "Preferred Time",
      "Status",
      "Notes",
    ];

    const rows = appointments.map((a) => [
      `"${a.id}"`,
      `"${new Date(a.created_at).toLocaleString()}"`,
      `"${a.name}"`,
      `"${a.phone}"`,
      `"${a.email || ""}"`,
      `"${a.service}"`,
      `"${a.session_type}"`,
      `"${a.preferred_date}"`,
      `"${a.preferred_time}"`,
      `"${a.status}"`,
      `"${(a.message || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `amit-rehab-enquiries-${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Status counts for cards and tabs
  const totalCount = appointments.length;
  const pendingCount = appointments.filter((a) => a.status === "Pending").length;
  const contactedCount = appointments.filter((a) => a.status === "Contacted").length;
  const confirmedCount = appointments.filter((a) => a.status === "Confirmed").length;
  const completedCount = appointments.filter((a) => a.status === "Completed").length;
  const cancelledCount = appointments.filter((a) => a.status === "Cancelled").length;

  // Filtered list
  const filteredAppointments = appointments.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.service.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "All" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadgeStyle = (status: AppointmentEnquiry["status"]) => {
    switch (status) {
      case "Pending":
        return "bg-amber-50 text-amber-800 border-amber-300 focus:ring-amber-400";
      case "Contacted":
        return "bg-blue-50 text-blue-800 border-blue-300 focus:ring-blue-400";
      case "Confirmed":
        return "bg-emerald-50 text-emerald-800 border-emerald-300 focus:ring-emerald-400";
      case "Completed":
        return "bg-purple-50 text-purple-800 border-purple-300 focus:ring-purple-400";
      case "Cancelled":
        return "bg-rose-50 text-rose-800 border-rose-300 focus:ring-rose-400";
      default:
        return "bg-slate-100 text-slate-700 border-slate-300";
    }
  };

  return (
    <div className="bg-slate-50 min-h-[85vh] py-10 relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 animate-bounceIn">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-lg border text-xs font-semibold ${
              toastMessage.type === "success"
                ? "bg-emerald-900 text-emerald-50 border-emerald-700"
                : "bg-red-900 text-red-50 border-red-700"
            }`}
          >
            {toastMessage.type === "success" ? (
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            )}
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Header bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-8 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Staff Administration Portal
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Appointment Enquiries & Patient Intake
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={fetchAppointments}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition-colors"
              title="Refresh Enquiries"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>

            <button
              type="button"
              onClick={exportCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 shadow-2xs transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>

        {/* Metric Cards (Clickable Quick Filters) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 my-8">
          <button
            type="button"
            onClick={() => setStatusFilter("All")}
            className={`p-5 rounded-xl border text-left transition-all ${
              statusFilter === "All"
                ? "bg-white border-brand-500 ring-2 ring-brand-400 shadow-sm"
                : "bg-white border-slate-200/80 hover:border-slate-300 shadow-2xs"
            }`}
          >
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Enquiries</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2">{totalCount}</p>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("Pending")}
            className={`p-5 rounded-xl border text-left transition-all ${
              statusFilter === "Pending"
                ? "bg-amber-50/50 border-amber-500 ring-2 ring-amber-400 shadow-sm"
                : "bg-white border-amber-200 hover:border-amber-300 shadow-2xs"
            }`}
          >
            <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">Pending Review</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-amber-700 mt-2">{pendingCount}</p>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("Contacted")}
            className={`p-5 rounded-xl border text-left transition-all ${
              statusFilter === "Contacted"
                ? "bg-blue-50/50 border-blue-500 ring-2 ring-blue-400 shadow-sm"
                : "bg-white border-blue-200 hover:border-blue-300 shadow-2xs"
            }`}
          >
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Patient Contacted</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-blue-700 mt-2">{contactedCount}</p>
          </button>

          <button
            type="button"
            onClick={() => setStatusFilter("Confirmed")}
            className={`p-5 rounded-xl border text-left transition-all ${
              statusFilter === "Confirmed"
                ? "bg-emerald-50/50 border-emerald-500 ring-2 ring-emerald-400 shadow-sm"
                : "bg-white border-emerald-200 hover:border-emerald-300 shadow-2xs"
            }`}
          >
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Confirmed Bookings</p>
            <p className="text-2xl sm:text-3xl font-extrabold text-emerald-700 mt-2">{confirmedCount}</p>
          </button>
        </div>

        {/* Filter and Search Bar with Dynamic Status Badges */}
        <div className="bg-white p-4 rounded-xl border border-slate-200/80 shadow-2xs mb-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <input
              type="text"
              placeholder="Search by patient, phone, service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-400"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {[
              { label: "All", count: totalCount },
              { label: "Pending", count: pendingCount },
              { label: "Contacted", count: contactedCount },
              { label: "Confirmed", count: confirmedCount },
              { label: "Completed", count: completedCount },
              { label: "Cancelled", count: cancelledCount },
            ].map(({ label, count }) => (
              <button
                key={label}
                type="button"
                onClick={() => setStatusFilter(label)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                  statusFilter === label
                    ? "bg-brand-500 text-white shadow-2xs"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <span>{label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                    statusFilter === label ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Appointments Table */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="py-20 text-center text-sm text-slate-400">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-brand-500" />
              <span>Loading appointment enquiries...</span>
            </div>
          ) : filteredAppointments.length === 0 ? (
            <div className="py-20 text-center text-slate-500 text-sm">
              <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="font-semibold text-slate-700">No appointment enquiries match this filter.</p>
              <p className="text-xs text-slate-400 mt-1">
                {statusFilter === "All"
                  ? "Submit an enquiry from the website to see it appear here in real time."
                  : `There are currently no enquiries marked as "${statusFilter}".`}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-700">
                <thead className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4">Patient</th>
                    <th className="px-6 py-4">Service & Session</th>
                    <th className="px-6 py-4">Requested Slot</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Notes</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredAppointments.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                      {/* Patient */}
                      <td className="px-6 py-4">
                        <p className="font-bold text-slate-900">{app.name}</p>
                        <p className="text-xs text-slate-500">{app.phone}</p>
                        {app.email && <p className="text-xs text-slate-400">{app.email}</p>}
                      </td>

                      {/* Service & Session */}
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-800">{app.service}</p>
                        <p className="text-xs text-brand-600 font-medium">{app.session_type}</p>
                      </td>

                      {/* Requested Slot */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-800">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          <span>{app.preferred_date}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-0.5">
                          <Clock className="w-3.5 h-3.5 text-slate-400" />
                          <span>{app.preferred_time}</span>
                        </div>
                      </td>

                      {/* Status Dropdown with Live State */}
                      <td className="px-6 py-4">
                        <div className="relative inline-flex items-center">
                          <select
                            value={app.status}
                            disabled={isUpdating === app.id}
                            onChange={(e) =>
                              handleStatusChange(app.id, e.target.value as AppointmentEnquiry["status"])
                            }
                            className={`text-xs font-bold py-1.5 pl-3 pr-7 rounded-lg border shadow-2xs focus:outline-none focus:ring-2 cursor-pointer transition-all ${getStatusBadgeStyle(
                              app.status
                            )} ${isUpdating === app.id ? "opacity-60 cursor-wait" : ""}`}
                          >
                            <option value="Pending">● Pending</option>
                            <option value="Contacted">● Contacted</option>
                            <option value="Confirmed">● Confirmed</option>
                            <option value="Completed">● Completed</option>
                            <option value="Cancelled">● Cancelled</option>
                          </select>
                          {isUpdating === app.id && (
                            <RefreshCw className="w-3 h-3 text-slate-500 animate-spin absolute right-2 pointer-events-none" />
                          )}
                        </div>
                      </td>

                      {/* Notes */}
                      <td className="px-6 py-4 max-w-xs">
                        <p className="text-xs text-slate-600 truncate" title={app.message || "No notes provided"}>
                          {app.message || <span className="text-slate-300 italic">None</span>}
                        </p>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <a
                            href={`tel:${app.phone.replace(/[^0-9+]/g, "")}`}
                            className="p-1.5 text-slate-600 hover:text-brand-600 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Call Patient"
                          >
                            <Phone className="w-4 h-4" />
                          </a>
                          <a
                            href={`https://wa.me/${app.phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                              `Hello ${app.name}, this is Amit Rehabilitation Centre regarding your therapy enquiry for ${app.service}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-colors"
                            title="Message on WhatsApp"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
