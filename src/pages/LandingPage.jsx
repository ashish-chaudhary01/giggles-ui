import {
  ArrowRight,
  Check,
  Link,
  MessageCircle,
  MessageCircleText,
} from "lucide-react";
import Navbar from "../components/Navbar";

function LandingPage() {
  const features = [
    {
      icon: <MessageCircleText size={25} />,
      title: "Real time messaging",
      description:
        "Instant messaging with real-time delivery and read receipts",
    },
    {
      icon: <MessageCircleText />,
      title: "Premium Interface",
      description:
        "Instant messaging with real-time delivery and read receipts",
    },
    {
      icon: <MessageCircleText />,
      title: "Real time messaging",
      description:
        "Instant messaging with real-time delivery and read receipts",
    },
    {
      icon: <MessageCircleText />,
      title: "Real time messaging",
      description:
        "Instant messaging with real-time delivery and read receipts",
    },
  ];
  return (
    <div className="w-full">
      <Navbar />
      {/* hero section */}
      <section className="bg-linear-to-br from-blue-400/20 to-secondary/10 min-h-[90vh] flex items-center justify-center">
        <div className="w-full max-w-xl text-center">
          <h1 className="text-5xl lg:text-7xl font-bold bg-clip-text bg-linear-to-tr from-primary to-blue-500 text-transparent mb-4">
            Chat Smarter. Connect Faster.
          </h1>
          <p className="text-gray-500 text-xl md:text-2xl leading-relaxed">
            "Send messages, share media, and stay in sync with friends and teams
            — all in one fast, secure chat app. No clutter, no delays."
          </p>
          {/* cta */}
          <div className="flex items-center justify-center gap-4 mt-8 mb-10">
            <a
              href="/signup"
              className="group btn btn-primary bg-blue-500 outline-none px-12 py-8 text-xl border-none rounded-xl flex items-center gap-2 shadow-0"
            >
              <span>Start Free</span>
              <span>
                <ArrowRight className="text-gray-200 group-hover:translate-x-1.25 duration-200" />
              </span>
            </a>
            <a
              href="/login"
              class="btn btn-soft rounded-xl p-8 text-xl text-[#394E6A]"
            >
              Sign In
            </a>
          </div>
          <div className="flex items-center justify-center gap-10 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <Check size={17} className="text-green-500" />
              <span>Free to use</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={17} className="text-green-500" />
              <span>No ads</span>
            </div>
            <div className="flex items-center gap-2">
              <Check size={17} className="text-green-500" />
              <span>Secure messaging</span>
            </div>
          </div>
        </div>
      </section>

      {/* features section */}
      <section className="bg-base-100 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-slate-500 mb-4">
              Fast & Secure
            </h2>
            <p className="text-slate-400 text-xl leading-relaxed">
              Lightweight, smooth, and built for quick convos.
            </p>
          </div>

          {/* cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {features.map((item, idx) => (
              <div
                key={idx}
                className="card bg-linear-to-r from-pink-50/15 to-base-100 border border-black/15 duration-200 transition-all "
              >
                <div className="card-body items-center text-center">
                  <span className="p-5 bg-blue-50 text-blue-500 rounded-full mb-2">
                    {item.icon}
                  </span>
                  <h2 className="card-title text-xl">{item.title}</h2>
                  <p className="text-lg text-gray-400">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* footer */}
      <footer className="footer footer-horizontal footer-center bg-primary text-primary-content p-10">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span>
              <MessageCircle className="text-blue-100" />
            </span>
            <span className="text-lg font-bold">Giggles</span>
          </div>
          <div className="text-md text-slate-300 space-y-1">
            <p>Copyright © 2026 - All rights reserved</p>
            <p>Developed by Ashish Chaudhary</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
