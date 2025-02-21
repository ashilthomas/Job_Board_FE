import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaSquareInstagram } from "react-icons/fa6";
function Footer() {
    return (
      <footer className=" footer-t text-gray-200">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {/* About Section */}
            <div>
              <h3 className="text-xl font-semibold mb-4">About Us</h3>
              <p className="text-sm">
                We connect people with their dream jobs and help companies find the best talent.
              </p>
            </div>
  
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/jobs" className="hover:text-gray-400">Jobs</a>
                </li>
                <li>
                  <a href="/about" className="hover:text-gray-400">About Us</a>
                </li>
                <li>
                  <a href="/contact" className="hover:text-gray-400">Contact</a>
                </li>
                <li>
                  <a href="/faq" className="hover:text-gray-400">FAQ</a>
                </li>
              </ul>
            </div>
  
            {/* Resources */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/blog" className="hover:text-gray-400">Blog</a>
                </li>
                <li>
                  <a href="/terms" className="hover:text-gray-400">Terms & Conditions</a>
                </li>
                <li>
                  <a href="/privacy" className="hover:text-gray-400">Privacy Policy</a>
                </li>
                <li>
                  <a href="/support" className="hover:text-gray-400">Support</a>
                </li>
              </ul>
            </div>
  
            {/* Social Media */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a
                  href="https://facebook.com"
                  className="hover:text-gray-400 border rounded-full border-primary p-3 bg-[rgba(25,17,51,0.5)]"
                  aria-label="Facebook"
                >
             <FaFacebook/>
                </a>
                <a
                  href="https://twitter.com"
                  className="hover:text-gray-400 border rounded-full border-primary p-3 bg-[rgba(25,17,51,0.5)]"
                  aria-label="Twitter"
                >
                 <FaSquareXTwitter/>
                </a>
                <a
                  href="https://linkedin.com"
                  className="hover:text-gray-400 border rounded-full border-primary p-3 bg-[rgba(25,17,51,0.5)]"
                  aria-label="LinkedIn"
                >
                 <FaLinkedin/>
                </a>
                <a
                  href="https://instagram.com"
                  className="hover:text-gray-400 border rounded-full border-primary p-3 bg-[rgba(25,17,51,0.5)]"
                  aria-label="Instagram"
                >
                 <FaSquareInstagram/>
                </a>
              </div>
            </div>
          </div>
          <div className="copyright">
          <div className="footer-t border-gray-700 mt-8 pt-4 text-center">
            <p className="text-sm">&copy; 2025 Job Board. All rights reserved.</p>
          </div>
        </div>
          </div>
  
        
      </footer>
    );
  }
  
  export default Footer;
  