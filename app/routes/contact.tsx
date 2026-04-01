import { useRef, useState } from "react";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { PageContainer, Section } from "../components/layout/Section";
import { Stack } from "../components/ui/Grid";
import { Heading, Text } from "../components/ui/Typography";
import { useScrollProgress } from "../hooks/useScrollProgress";
import { formatConfirmationMessage } from "../utils/formatMail/confirmation";
import { formatContactMessage } from "../utils/formatMail/contact";
import { sendMail } from "../utils/sendMail";
import type { Route } from "./+types/contact";

export function meta({}: Route.MetaArgs) {
  const baseUrl = "https://huldahfolio.vercel.app"; // Production URL
  const title = "Start a Project | Contact Huldah Peter";
  const description = "Inquire about videography, high-end editing, or social media management services. Let's bring your vision to life.";
  const ogImage = `${baseUrl}/og-contact.png`;

  return [
    { title },
    { name: "description", content: description },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: ogImage },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { property: "og:image:type", content: "image/png" },
    { property: "og:url", content: `${baseUrl}/contact` },
    { name: "twitter:image", content: ogImage },
  ];
}

export default function Contact() {
  const headingRef = useRef<HTMLDivElement>(null);
  const { normalized: progress } = useScrollProgress(headingRef);

  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    service: "Full Videography (Shoot + Edit)",
    message: ""
  });

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus("sending");

    try {
      // 1. Send inquiry to Huldah
      const inquiryRes = await sendMail({
        subject: `New Inquiry from ${formData.name}`,
        html: formatContactMessage(formData),
        mailTo: "huldahsweetie@gmail.com" // Recipient email
      });

      // 2. Send confirmation to sender
      await sendMail({
        subject: "Message Received — Huldah Peter",
        html: formatConfirmationMessage(formData.name),
        mailTo: formData.email
      });

      if (inquiryRes.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", service: "Full Videography (Shoot + Edit)", message: "" });
      } else {
        setStatus("error");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
    }
  };

  return (
    <main className="bg-[#050505] min-h-screen">
      <Header />
      <PageContainer>
        <Section className="relative overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-24 pt-12">
            <Stack gap={8}>
              <div
                ref={headingRef}
                data-scroll-animation="dynamic_toggle"
                data-scroll-variables="{type: 'scrolling'}"
                style={{
                  opacity: progress * 1.5,
                  transform: `translateY(${(1 - progress) * 40}px) scale(${0.98 + progress * 0.02})`,
                }}
              >
                <Heading as="h1" className="text-5xl md:text-7xl font-serif">Let's <br /> create.</Heading>
              </div>
              <Text
                data-scroll-animation="dynamic_toggle"
                data-scroll-variables="{enterClass: 'opacity-60 translate-y-0', leaveClass: 'opacity-0 translate-y-8', threshold: 0.1}"
                className="text-white/60 transition-all duration-1000 delay-300"
              >
                Whether you need a high-end commercial, a fast-paced music video, or a full social media strategy,
                I'm here to help bring your vision to life.
              </Text>
              <div className="pt-8">
                <Text className="mb-2 text-white/40 uppercase text-xs font-bold tracking-widest">Current Location</Text>
                <Text className="text-white/40 max-w-xs">
                  Currently based in Lagos, Nigeria. Available for travel worldwide.
                </Text>
              </div>
            </Stack>

            <form onSubmit={handleSubmit} className="flex flex-col gap-12 pt-4">
              {[
                { id: "name", label: "Full Name", type: "text", placeholder: "John Doe", value: formData.name },
                { id: "email", label: "Email Address", type: "email", placeholder: "john@example.com", value: formData.email },
                {
                  id: "service", label: "Service Type", type: "select", value: formData.service, options: [
                    "Full Videography (Shoot + Edit)",
                    "Video Editing Only",
                    "Social Media Content Pack (Shorts/Reels)",
                    "Content Strategy & Consulting"
                  ]
                }
              ].map((field, idx) => (
                <div
                  key={field.id}
                  data-scroll-animation="dynamic_toggle"
                  data-scroll-variables="{enterClass: 'opacity-100 translate-y-0', leaveClass: 'opacity-0 translate-y-8', threshold: 0.1}"
                  style={{ transitionDelay: `${idx * 150}ms` }}
                  className="flex flex-col gap-2 group transition-all duration-1000"
                >
                  <label htmlFor={field.id} className="text-white/40 uppercase text-xs font-bold tracking-widest transition-colors group-focus-within:text-white">{field.label}</label>
                  {field.type === 'select' ? (
                    <select
                      id={field.id}
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                      className="bg-transparent border-b border-white/20 py-4 focus:border-white focus:outline-none text-xl transition-colors appearance-none cursor-pointer"
                    >
                      {field.options?.map(opt => <option key={opt} value={opt} className="bg-[#050505]">{opt}</option>)}
                    </select>
                  ) : (
                    <input
                      id={field.id}
                      type={field.type}
                      required
                      value={field.value}
                      onChange={(e) => setFormData({ ...formData, [field.id]: e.target.value })}
                      placeholder={field.placeholder}
                      className="bg-transparent border-b border-white/20 py-4 focus:border-white focus:outline-none text-xl transition-colors placeholder:text-white/10"
                    />
                  )}
                </div>
              ))}

              <div
                data-scroll-animation="dynamic_toggle"
                data-scroll-variables="{enterClass: 'opacity-100 translate-y-0', leaveClass: 'opacity-0 translate-y-8', threshold: 0.1}"
                className="flex flex-col gap-2 group transition-all duration-1000 delay-500"
              >
                <label htmlFor="message" className="text-white/40 uppercase text-xs font-bold tracking-widest transition-colors group-focus-within:text-white">Message & Goals</label>
                <textarea
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me about your vision, timeline, and goals..."
                  className="bg-transparent border-b border-white/20 py-4 focus:border-white focus:outline-none text-xl transition-colors resize-none placeholder:text-white/10"
                />
              </div>

              <div
                data-scroll-animation="dynamic_toggle"
                data-scroll-variables="{enterClass: 'opacity-100 scale-100', leaveClass: 'opacity-0 scale-95', threshold: 0.1}"
                className="flex flex-col gap-4"
              >
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="self-start px-16 py-6 bg-white text-black font-sans uppercase font-bold text-sm tracking-widest hover:bg-white/90 disabled:opacity-50 transition-all duration-700 rounded-full"
                  data-cursor="send"
                >
                  {status === "sending" ? "Sending..." : "Send Message"}
                </button>

                {status === "success" && (
                  <Text className="text-green-500 text-sm font-bold uppercase tracking-wider">Message sent successfully!</Text>
                )}
                {status === "error" && (
                  <Text className="text-red-500 text-sm font-bold uppercase tracking-wider">Failed to send message. Please try again.</Text>
                )}
              </div>
            </form>
          </div>
        </Section>

        <Footer />
      </PageContainer>
    </main>
  );
}
