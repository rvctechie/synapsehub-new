import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/SEOHead';
import { ROUTES } from '../../lib/constants';

const stats = [
  { value: '10K+', label: 'Conversations Handled' },
  { value: '95%', label: 'Lead Capture Rate' },
  { value: '3x', label: 'Booking Increase' },
  { value: '24/7', label: 'AI Availability' },
];

const features = [
  {
    icon: '🤖',
    title: 'AI Chat & Voice Agents',
    description: 'Custom-trained AI agents that handle sales conversations, qualify leads, and book appointments — 24/7.',
  },
  {
    icon: '📊',
    title: 'Built-in CRM & Pipeline',
    description: 'Every lead automatically captured, scored, and moved through your pipeline. No manual data entry.',
  },
  {
    icon: '⚡',
    title: 'Smart Automations',
    description: 'Trigger follow-ups, reminders, and workflows based on lead behavior. Set it and forget it.',
  },
  {
    icon: '📅',
    title: 'AI-Powered Booking',
    description: 'Your AI agent checks availability and books appointments in real-time during conversations.',
  },
  {
    icon: '⭐',
    title: 'Review Management',
    description: 'Monitor, respond to, and generate reviews across platforms. AI-drafted responses save hours.',
  },
  {
    icon: '📈',
    title: 'Intelligence Dashboard',
    description: 'Real-time analytics on conversations, conversions, sentiment, and ROI. Know exactly what's working.',
  },
];

export function HomePage() {
  return (
    <>
      <SEOHead />

      {/* Hero */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
            AI-Native Business OS
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Your Business,{' '}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Automated
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-10">
            Replace your CRM, booking system, and automation tools with one AI-powered platform.
            SynapseHub handles sales, operations, and customer engagement — so you can focus on growth.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to={ROUTES.SIGNUP}
              className="px-8 py-4 bg-indigo-600 text-white font-semibold rounded-xl hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-200 hover:shadow-xl"
            >
              Start Free Trial
            </Link>
            <Link
              to={ROUTES.DEMO}
              className="px-8 py-4 bg-white text-gray-700 font-semibold rounded-xl border border-gray-300 hover:border-gray-400 transition-all"
            >
              See Live Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-indigo-600">{stat.value}</div>
              <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need. Nothing You Don't.
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              One platform that replaces 6+ tools. Built from the ground up with AI at the core.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="p-6 bg-white rounded-xl border border-gray-200 hover:border-indigo-200 hover:shadow-lg transition-all"
              >
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-indigo-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Automate Your Business?
          </h2>
          <p className="text-lg text-indigo-100 mb-10 max-w-2xl mx-auto">
            Join businesses that have replaced their entire tech stack with SynapseHub.
            Start your free trial today — no credit card required.
          </p>
          <Link
            to={ROUTES.SIGNUP}
            className="inline-block px-8 py-4 bg-white text-indigo-700 font-semibold rounded-xl hover:bg-gray-50 transition-all shadow-lg"
          >
            Get Started Free
          </Link>
        </div>
      </section>
    </>
  );
}
