"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  destinations: string[];
  dateRange: { startDate: Date; endDate: Date };
};

export default function BookingDialog({ open, setOpen, destinations, dateRange }: Props) {

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+92",
    pickup: "",
    drop: "",
  });

  // Prevent background scroll on dialog open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!form.name || !form.email || !form.phone) {
      alert("Please fill all required fields.");
      return;
    }
  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{7,15}$/;
  
    if (!emailRegex.test(form.email)) {
      alert("Please enter a valid email.");
      return;
    }
  
    if (!phoneRegex.test(form.phone)) {
      alert("Please enter a valid phone number (7–15 digits, no spaces or +).");
      return;
    }
  
    const fullPhone = `${form.countryCode}${form.phone}`;
  
    const payload = {
      name: form.name,
      email: form.email,
      phone: fullPhone,
      pickup: form.pickup,
      drop: form.drop,
      destinations,
      dateRange,
    };
  console.log(payload)
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (!res.ok) {
        throw new Error("Failed to submit booking.");
      }
  
      alert("Booking submitted successfully!");
      setOpen(false);
    } catch (err) {
      console.error(err);
      alert("There was an error submitting the booking.");
    }
  };
  

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/* <Dialog.Trigger asChild>
        <button className="bg-secondary text-white px-6 py-2 rounded hover:bg-secondary-dark">
          Book Now
        </button>
      </Dialog.Trigger> */}
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/20 z-20 backdrop-blur-sm" />
        <Dialog.Content className="fixed z-50 left-1/2 top-1/2 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl">
          <div className="flex items-center justify-between mb-4">
            <Dialog.Title className="text-xl font-semibold">Booking Info</Dialog.Title>
            <Dialog.Close><X className="w-5 h-5" /></Dialog.Close>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Full Name</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Phone</label>
              <div className="flex gap-2">
                <select
                  value={form.countryCode}
                  onChange={(e) => setForm({ ...form, countryCode: e.target.value })}
                  className="border rounded px-2"
                >
                  <option value="+92">🇵🇰 +92</option>
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                </select>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
            </div>

            {/* Optional Fields: Pickup and Drop */}
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium">Pickup Location (Optional)</label>
                <select
                  value={form.pickup}
                  onChange={(e) => setForm({ ...form, pickup: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Select Pickup</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Multan">Multan</option>
                  <option value="Quetta">Quetta</option>
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium">Drop Location (Optional)</label>
                <select
                  value={form.drop}
                  onChange={(e) => setForm({ ...form, drop: e.target.value })}
                  className="w-full border px-3 py-2 rounded"
                >
                  <option value="">Select Drop</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Lahore">Lahore</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Multan">Multan</option>
                  <option value="Quetta">Quetta</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded w-full"
            >
              Confirm Booking
            </button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
