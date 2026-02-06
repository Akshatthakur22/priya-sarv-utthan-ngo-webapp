"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Phone, Mail, MessageSquare, Gavel, Building2, 
  Calendar, Send, CheckCircle, AlertTriangle, Heart, Loader2 
} from "lucide-react";

type ServiceType = "Legal" | "Grievance" | "Welfare";

interface LegalIntakeFormProps {
  serviceType: ServiceType;
  onSuccess?: () => void;
}

const DEPARTMENTS = [
  "Police",
  "Municipal Corporation",
  "Social Injustice",
  "Revenue/Land",
  "Education",
  "Health",
  "Other",
];

const SERVICE_CONFIG = {
  Legal: {
    icon: Gavel,
    color: "orange",
    title: "Legal Aid Request",
    subtitle: "Connect with advocates and legal authorities",
  },
  Grievance: {
    icon: AlertTriangle,
    color: "orange",
    title: "File a Grievance",
    subtitle: "Report social injustice or local issues",
  },
  Welfare: {
    icon: Heart,
    color: "orange",
    title: "Welfare Support",
    subtitle: "Education, health, and community assistance",
  },
};

export default function LegalIntakeForm({ serviceType, onSuccess }: LegalIntakeFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
    opposingParty: "",
    courtDeadline: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [caseId, setCaseId] = useState("");
  const [error, setError] = useState("");

  const config = SERVICE_CONFIG[serviceType];
  const IconComponent = config.icon;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          serviceType,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setCaseId(data.caseId);
        setSuccess(true);
        onSuccess?.();
      } else {
        setError(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-3xl p-8 text-center shadow-xl border border-orange-100"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <CheckCircle className="text-green-600" size={40} />
        </motion.div>
        <h3 className="text-2xl font-black text-neutral-900 mb-2">Request Submitted!</h3>
        <p className="text-neutral-600 mb-4">Your case has been registered successfully.</p>
        <div className="bg-orange-50 rounded-2xl p-4 mb-6">
          <p className="text-sm text-orange-700 font-semibold mb-1">Your Case ID</p>
          <p className="text-2xl font-black text-orange-600">{caseId}</p>
        </div>
        <p className="text-sm text-neutral-500">
          Our team will contact you within 24 hours on WhatsApp.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-orange-100"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6 pb-6 border-b border-neutral-100">
        <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center">
          <IconComponent className="text-orange-600" size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black text-neutral-900">{config.title}</h3>
          <p className="text-sm text-neutral-500">{config.subtitle}</p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Name */}
        <div>
          <label className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
            <User size={14} /> Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-neutral-900 placeholder:text-neutral-400"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
            <Phone size={14} /> WhatsApp Number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={formData.phone}
            onChange={handleChange}
            placeholder="+91 9977177059"
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-neutral-900 placeholder:text-neutral-400"
          />
        </div>

        {/* Email (Optional) */}
        <div>
          <label className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
            <Mail size={14} /> Email <span className="text-neutral-400 font-normal">(Optional)</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="your@email.com"
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-neutral-900 placeholder:text-neutral-400"
          />
        </div>

        {/* Conditional: Legal Fields */}
        <AnimatePresence>
          {serviceType === "Legal" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-5"
            >
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
                  <Gavel size={14} /> Opposing Party Name
                </label>
                <input
                  type="text"
                  name="opposingParty"
                  value={formData.opposingParty}
                  onChange={handleChange}
                  placeholder="Name of opposing party (if applicable)"
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-neutral-900 placeholder:text-neutral-400"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
                  <Calendar size={14} /> Court Deadline
                </label>
                <input
                  type="date"
                  name="courtDeadline"
                  value={formData.courtDeadline}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-neutral-900"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Conditional: Grievance Fields */}
        <AnimatePresence>
          {serviceType === "Grievance" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <label className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
                <Building2 size={14} /> Department Involved <span className="text-red-500">*</span>
              </label>
              <select
                name="department"
                required
                value={formData.department}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-neutral-900 bg-white"
              >
                <option value="">Select department</option>
                {DEPARTMENTS.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Message */}
        <div>
          <label className="flex items-center gap-2 text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
            <MessageSquare size={14} /> Describe Your Issue <span className="text-red-500">*</span>
          </label>
          <textarea
            name="message"
            required
            rows={4}
            value={formData.message}
            onChange={handleChange}
            placeholder="Please describe your situation in detail..."
            className="w-full px-4 py-3 rounded-xl border border-neutral-200 focus:border-orange-400 focus:ring-2 focus:ring-orange-100 outline-none transition-all text-neutral-900 placeholder:text-neutral-400 resize-none"
          />
        </div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-50 text-red-700 px-4 py-3 rounded-xl text-sm font-medium"
          >
            {error}
          </motion.div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-black text-base py-4 rounded-2xl shadow-lg transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed touch-manipulation flex items-center justify-center gap-2"
          style={{ WebkitTapHighlightColor: "transparent" }}
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" /> Submitting...
            </>
          ) : (
            <>
              <Send size={20} /> Submit Request
            </>
          )}
        </button>

        <p className="text-xs text-neutral-400 text-center">
          By submitting, you agree to our privacy policy. We'll contact you within 24 hours.
        </p>
      </div>
    </motion.form>
  );
}
