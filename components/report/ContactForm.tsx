"use client"; // Mark this as a Client Component

import { useState } from "react";

export const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission (e.g., send data to an API)
    console.log("Form Data:", formData);
    alert("Thank you for contacting us! We'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Name Field */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-zinc-400">
          Name
        </label>
        <div className="mt-1">
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-800/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            placeholder="Enter your name"
            required
          />
        </div>
      </div>

      {/* Email Field */}
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-zinc-400">
          Email
        </label>
        <div className="mt-1">
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 bg-zinc-800/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            placeholder="Enter your email"
            required
          />
        </div>
      </div>

      {/* Message Field */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-zinc-400">
          Message
        </label>
        <div className="mt-1">
          <textarea
            name="message"
            id="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 bg-zinc-800/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none"
            placeholder="Enter your message"
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-lg hover:bg-sky-500/20 transition-colors"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};