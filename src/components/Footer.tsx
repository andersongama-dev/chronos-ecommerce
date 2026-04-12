export default function Footer() {
   const sections = [
      {
         title: "Institutional",
         links: [
            { name: "About us", href: "/about" },
            { name: "Privacy Policy", href: "/privacy-policy" },
            { name: "Terms of Service", href: "/terms" },
         ],
      },
      {
         title: "Service",
         links: [
            { name: "Support", href: "/support" },
            //{ name: "Contact", href: "/contact" },
            { name: "FAQ or Help Center", href: "/faq" },
         ],
      },
      {
         title: "Navigation",
         links: [
            { name: "Home", href: "/" },
            { name: "Collection", href: "/collection" },
            { name: "Bag", href: "/bag" },
         ],
      },
      {
         title: "Social Media",
         links: [
            {
               name: "Instagram",
               href: "https://instagram.com/chronos",
               external: true,
            },
            {
               name: "Facebook",
               href: "https://facebook.com/chronos",
               external: true,
            },
            {
               name: "WhatsApp",
               href: "https://wa.me/12125557890",
               external: true,
            },
         ],
      },
      {
         title: "Contact",
         links: [
            { name: "Phone: +1 (212) 555-7890", href: "tel:+12125557890" },
            {
               name: "Support Email: support@chronos.com",
               href: "mailto:support@chronos.com",
            },
            {
               name: "Address: 123 Fifth Avenue, New York, NY 10011, USA",
               href: "https://maps.google.com/?q=123+Fifth+Avenue,+New+York,+NY+10011",
               external: true,
            },
         ],
      },
   ];

   return (
      <footer className="mt-16 px-8 md:px-16 pt-16 pb-8 text-black font-semibold border-t border-gray-300">
         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 md:gap-12 text-base">
            {sections.map((section, i) => (
               <article key={i}>
                  <p className="text-[#4455de] mb-4">{section.title}</p>
                  <ul className="flex flex-col gap-3">
                     {section.links.map((link, j) => (
                        <li key={j}>
                           <a
                              href={link.href}
                              target={link.external ? "_blank" : "_self"}
                              rel={
                                 link.external
                                    ? "noopener noreferrer"
                                    : undefined
                              }
                              className="hover:text-[#616ce6] transition-colors duration-200 ease-in-out"
                           >
                              {link.name}
                           </a>
                        </li>
                     ))}
                  </ul>
               </article>
            ))}
         </div>

         <div className="mt-12 border-t border-gray-300 pt-6 text-center">
            <p className="text-sm md:text-base font-medium">
               © 2026 Chronos. All rights reserved.
            </p>
         </div>
      </footer>
   );
}
