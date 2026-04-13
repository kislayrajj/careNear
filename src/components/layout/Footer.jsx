import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="mt-24 bg-slate-900 text-slate-400">
      
      {/* Main section */}
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between gap-10">

        {/* Brand */}
        <div className="max-w-sm">
          <div className="flex items-center gap-2 text-white text-lg font-extrabold mb-3">
            💙 CareNear
          </div>
          <p className="text-sm leading-relaxed">
            Care, made easy. Connecting patients, doctors, and pharmacies into one seamless experience.
          </p>
        </div>

        {/* Links */}
        <div className="flex gap-16">

          {/* Platform */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              Platform
            </span>

            <Link to="/doctors" className="text-sm hover:text-white transition">
              Find Doctors
            </Link>

            <Link to="/pharmacies" className="text-sm hover:text-white transition">
              Find Pharmacies
            </Link>
          </div>

          {/* Providers */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">
              For Providers
            </span>

            <Link to="/login/doctor" className="text-sm hover:text-white transition">
              Doctor Login
            </Link>

            <Link to="/login/pharmacy" className="text-sm hover:text-white transition">
              Pharmacy Login
            </Link>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 py-4 text-sm text-slate-500 flex justify-between items-center flex-col md:flex-row gap-2">
          <span>© {new Date().getFullYear()} CareNear</span>
          <span className="text-slate-600">Care, made easy.</span>
        </div>
      </div>

    </footer>
  );
};

export default Footer;