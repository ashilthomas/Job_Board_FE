import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* About */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">Job Board</h3>
          <p className="text-sm leading-relaxed">
            Connecting job seekers with top employers. Your dream career starts here.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2">
            {["Jobs", "About Us", "Contact", "FAQ"].map((item) => (
              <li key={item}>
                <a
                  href={`/${item.toLowerCase().replace(" ", "")}`}
                  className="hover:text-primary transition"
                >
                  {item}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Resources</h3>
          <ul className="space-y-2">
            {["Blog", "Terms & Conditions", "Privacy Policy", "Support"].map(
              (item) => (
                <li key={item}>
                  <a
                    href={`/${item.toLowerCase().replace(/ & /g, "").replace(" ", "")}`}
                    className="hover:text-primary transition"
                  >
                    {item}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex space-x-4">
            {[
              { icon: FaFacebook, url: "https://facebook.com" },
              { icon: FaSquareXTwitter, url: "https://twitter.com" },
              { icon: FaLinkedin, url: "https://linkedin.com" },
              { icon: FaInstagram, url: "https://instagram.com" },
            ].map(({ icon: Icon, url }, i) => (
              <a
                key={i}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-gray-800 hover:bg-primary transition"
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-700 text-center py-4 text-sm">
        <p>&copy; {year} Job Board. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

  