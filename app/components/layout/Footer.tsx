import { contactInfo } from "../../data/portfolio";
import BackgroundWatermark from "../ui/BackgroundWatermark";
import { Text } from "../ui/Typography";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-background">

      <div className="max-w-6xl mx-auto py-24 px-6 md:px-12 border-t border-white/10 flex flex-col items-center md:items-start md:flex-row justify-between gap-12 relative z-10">
        <BackgroundWatermark />

        <div
          data-scroll-animation="dynamic_toggle"
          data-scroll-variables="{enterClass: 'opacity-100 translate-y-0', leaveClass: 'opacity-0 translate-y-8', threshold: 0.1}"
          className="flex flex-col gap-2 transition-all duration-1000"
        >
          <Text className="text-white/40 text-sm uppercase text-center md:text-left">Email</Text>
          <a href={`mailto:${contactInfo.email}`} data-cursor="pointer" className="text-lg md:text-xl font-serif hover:text-white transition-colors link-underline w-fit">
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
                  data-cursor="pointer"
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
