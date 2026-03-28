import { Link } from 'react-router-dom';
import { ROUTES } from '../lib/constants';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-xl font-bold text-white">SynapseHub</span>
            </div>
            <p className="text-sm max-w-md">
              AI-Native Business Operating System. Automate your sales, operations, and customer engagement with intelligent AI agents.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Product</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to={ROUTES.PRICING} className="hover:text-white transition-colors">Pricing</Link></li>
              <li><Link to={ROUTES.DEMO} className="hover:text-white transition-colors">Demo</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-3 text-sm">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-sm text-center">
          © {new Date().getFullYear()} SynapseHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
