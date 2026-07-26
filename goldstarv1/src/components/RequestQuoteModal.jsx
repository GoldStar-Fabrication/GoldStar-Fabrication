import { forwardRef, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

/**
 * RequestQuoteModal
 * ------------------
 * Inline two-column "Request a quote" modal.
 * - Renders via createPortal into document.body
 * - Tailwind dark mode: relies on a `dark` class on <html> (or ancestor)
 * - Fully responsive: two columns on md+, stacks on mobile
 *
 * Usage:
 *   const [open, setOpen] = useState(false);
 *   <button onClick={() => setOpen(true)}>Get quote</button>
 *   <RequestQuoteModal isOpen={open} onClose={() => setOpen(false)} />
 */
export default function RequestQuoteModal({ isOpen, onClose, onSubmit }) {

  const dialogRef = useRef(null);
  const firstFieldRef = useRef(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    service: "",
    details: "",
  });
  const [status, setStatus] = useState("idle"); // idle | submitting | success

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll + focus first field while open
  useEffect(() => {
    if (!isOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    firstFieldRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Reset transient state whenever the modal is reopened
  useEffect(() => {
    if (isOpen) setStatus("idle");
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (field) => (e) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose?.();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("submitting");
    try {
      await onSubmit?.(form);
      setStatus("success");
    } catch (err) {
      setStatus("idle");
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="quote-modal-title"
    >
      {/* Backdrop */}
      <div
        onClick={handleBackdropClick}
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.15s_ease-out]"
      />

      {/* Dialog */}
      <div
        ref={dialogRef}
        className="relative w-full max-w-3xl overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl
                   dark:border-neutral-800 dark:bg-neutral-900
                   animate-[slideUp_0.2s_ease-out]"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 rounded-full p-1.5 text-neutral-400 transition-colors
                     hover:bg-neutral-100 hover:text-neutral-700
                     dark:text-neutral-500 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>

        {status === "success" ? (
          <SuccessPanel onClose={onClose} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left: pitch copy */}
            <div className="flex flex-col justify-center gap-3 bg-neutral-50 px-6 py-8 sm:px-8 sm:py-10 dark:bg-neutral-950/40">
              <span className="text-[11px] font-medium uppercase tracking-widest text-amber-600 dark:text-amber-400">
                Ready to build?
              </span>
              <h2
                id="quote-modal-title"
                className="text-2xl font-semibold leading-tight text-neutral-900 sm:text-[26px] dark:text-white"
              >
                Get your free fabrication quote
              </h2>
              <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
                Tell us your project requirements and we'll visit your site,
                take measurements, and send a detailed quote within 48 hours.
              </p>
              <div className="mt-2 flex flex-wrap gap-4">
                <Feature label="Free site visit" />
                <Feature label="48hr turnaround" />
              </div>
              <a
                href="tel:+919876543210"
                className="mt-4 text-sm font-medium text-amber-600 hover:underline dark:text-amber-400"
              >
                Prefer to talk? Call +91 98765 43210
              </a>
            </div>

            {/* Right: form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-3 px-6 py-8 sm:px-8 sm:py-10"
            >
              <Field
                ref={firstFieldRef}
                label="Full name"
                id="quote-name"
                value={form.name}
                onChange={handleChange("name")}
                placeholder="Rajesh Mehta"
                required
              />
              <Field
                label="Phone number"
                id="quote-phone"
                type="tel"
                value={form.phone}
                onChange={handleChange("phone")}
                placeholder="+91 98765 43210"
                required
              />

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="quote-service"
                  className="text-xs font-medium text-neutral-600 dark:text-neutral-400"
                >
                  Service type
                </label>
                <select
                  id="quote-service"
                  value={form.service}
                  onChange={handleChange("service")}
                  required
                  className="rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900
                             outline-none transition-colors focus:border-amber-500 focus:ring-1 focus:ring-amber-500
                             dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:focus:border-amber-400 dark:focus:ring-amber-400"
                >
                  <option value="" disabled>
                    Select a service
                  </option>
                  <option value="safety-grills">Safety grills</option>
                  <option value="railings">Railings</option>
                  <option value="sheds">Sheds</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="quote-details"
                  className="text-xs font-medium text-neutral-600 dark:text-neutral-400"
                >
                  Project details
                </label>
                <textarea
                  id="quote-details"
                  value={form.details}
                  onChange={handleChange("details")}
                  placeholder="Approx. area, location, timeline..."
                  rows={3}
                  className="resize-none rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900
                             outline-none transition-colors placeholder:text-neutral-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500
                             dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-amber-400 dark:focus:ring-amber-400"
                />
              </div>

              <button
                type="submit"
                disabled={status === "submitting"}
                className="mt-1 inline-flex items-center justify-center rounded-lg bg-amber-500 px-4 py-2.5 text-sm font-semibold text-neutral-950
                           transition-colors hover:bg-amber-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === "submitting" ? "Sending..." : "Request a quote"}
              </button>
            </form>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(8px) } to { opacity: 1; transform: translateY(0) } }
      `}</style>
    </div>,
    document.body
  );
}

function Feature({ label }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-neutral-700 dark:text-neutral-300">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-3.5 w-3.5 text-amber-500 dark:text-amber-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
      </svg>
      {label}
    </div>
  );
}

const Field = forwardRef(({ label, id, ...props }, ref) => (
  <div className="flex flex-col gap-1.5">
    <label htmlFor={id} className="text-xs font-medium text-neutral-600 dark:text-neutral-400">
      {label}
    </label>
    <input
      id={id}
      ref={ref}
      {...props}
      className="rounded-lg border border-neutral-300 bg-white px-3 py-2.5 text-sm text-neutral-900
                 outline-none transition-colors placeholder:text-neutral-400 focus:border-amber-500 focus:ring-1 focus:ring-amber-500
                 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-100 dark:placeholder:text-neutral-500 dark:focus:border-amber-400 dark:focus:ring-amber-400"
    />
  </div>
));

function SuccessPanel({ onClose }) {
  return (
    <div className="flex flex-col items-center px-6 py-14 text-center sm:px-8">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-500/10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-6 w-6 text-amber-600 dark:text-amber-400">
          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
        Request received
      </h3>
      <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-400">
        We'll call you within 24 hours to schedule a free site visit and send
        your detailed quote.
      </p>
      <button
        onClick={onClose}
        className="mt-6 rounded-lg border border-amber-500 px-4 py-2.5 text-sm font-medium text-amber-600
                   transition-colors hover:bg-amber-50 dark:text-amber-400 dark:hover:bg-amber-500/10"
      >
        Back to site
      </button>
    </div>
  );
}