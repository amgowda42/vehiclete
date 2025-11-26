import { Zap, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
              <h5 className="text-xl font-bold">Vehiclete</h5>
            </div>
            <p className="text-slate-400">Your trusted vehicle comparison platform</p>
          </div>
          <div>
            <h6 className="font-bold mb-4">Categories</h6>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Bikes
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Cars
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Cycles
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold mb-4">Company</h6>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Contact
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold mb-4">Support</h6>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#" className="hover:text-white transition">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Developer Section */}
        <div className="border-t border-slate-800 mt-8 pt-8">
          <div className="flex flex-col items-center space-y-4">
            {/* Developer Info */}
            <div className="flex items-center space-x-4">
              <img
                src="https://avatars.githubusercontent.com/u/109304720?v=4"
                alt="Developer"
                className="w-12 h-12 rounded-full border-2 border-blue-600 object-cover"
              />
              <div>
                <p className="text-sm text-slate-400">Developed by</p>
                <p className="font-semibold text-white">Your Name</p>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a
                href="https://linkedin.com/in/your-profile"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="https://twitter.com/your-handle"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-sky-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Copyright */}
          <div className="text-center text-slate-400 mt-6">
            <p>&copy; 2024 Vehiclete. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
