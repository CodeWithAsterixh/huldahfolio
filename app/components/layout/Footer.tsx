import { contactInfo } from "../../data/portfolio";
import { Text } from "../ui/Typography";

export function Footer() {
  return (
    <footer className="py-24 border-t border-white/10 relative overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 z-0 select-none pointer-events-none opacity-[0.03] whitespace-nowrap">
        <span className="text-[25vw] md:text-[20vw] font-serif font-black leading-none uppercase tracking-tighter bg-gradient-to-t from-white to-transparent bg-clip-text text-transparent">
          Huldah
        </span>
      </div>

      <div className="flex flex-col items-center md:items-start md:flex-row justify-between gap-12 relative z-10">
        <div
          data-scroll-animation="dynamic_toggle"
          data-scroll-variables="{enterClass: 'opacity-100 translate-y-0', leaveClass: 'opacity-0 translate-y-8', threshold: 0.1}"
          className="flex flex-col gap-2 transition-all duration-1000"
        >
          <Text className="text-white/40 text-sm uppercase text-center md:text-left">Email</Text>
          <a href={`mailto:${contactInfo.email}`} className="text-lg md:text-xl font-serif hover:text-white transition-colors link-underline w-fit">
            {contactInfo.email}
          </a>
        </div>

        <div className="flex gap-12">
          <div className="flex flex-col gap-2 text-center md:text-right">
            <Text className="text-white/40 text-sm uppercase">Socials</Text>
            <div className="flex gap-6">
              {contactInfo.socials.map((social, sIdx) => (
                <a
                  key={social.label}
                  href={social.href}
                  data-scroll-animation="dynamic_toggle"
                  data-scroll-variables="{enterClass: 'opacity-100 translate-y-0', leaveClass: 'opacity-0 translate-y-4', threshold: 0.1}"
                  className="text-lg md:text-xl font-serif hover:text-white transition-all duration-700 link-underline"
                  style={{ transitionDelay: `${sIdx * 100}ms` }}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
