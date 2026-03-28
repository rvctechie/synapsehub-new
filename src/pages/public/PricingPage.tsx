import { Link } from 'react-router-dom';
import { SEOHead } from '../../components/SEOHead';
import { ROUTES, TIER_LIMITS } from '../../lib/constants';
import { formatCurrency } from '../../lib/utils';

const tiers = [
  {
    key: 'tier_1' as const,
    popular: false,
    highlights: [
      'AI Chat Widget',
      'Up to 500 interactions/mo',
      '1 AI Agent',
      'Lead Capture & Basic CRM',
      'Appointment Booking',
      'Email Notifications',
      'Basic Analytics Dashboard',
      'Review Monitoring',
    ],
  },
  {
    key: 'tier_2' as const,
    popular: true,
    highlights: [
      'Everything in Tier 1, plus:',
      'SMS AI Agent',
      'Up to 2,000 interactions/mo',
      '3 AI Agents',
      'Full CRM & Pipeline',
      'Automation Engine (25 workflows)',
      'Calendar Sync',
      'Review Management & Responses',
      'Team Management (10 users)',
      'API Access',
    ],
  },
  {
    key: 'tier_3' as const,
    popular: false,
    highlights: [
      'Everything in Tier 2, plus:',
      'Voice AI Agent',
      'Up to 10,000 interactions/mo',
      '10 AI Agents',
      'Advanced Automations (100 workflows)',
      'AI-Drafted Review Responses',
      'White Label',
      'Custom Integrations',
      'Priority Support',
      'Dedicated Success Manager',
    ],
  },
];

export function PricingPage() {
  return (
    <>
      <SEOHead
        title="Pricing"
        description="Simple, transparent pricing. Choose the plan that fits your business."
      />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Simple, Transparent Pricing
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              No hidden fees. No per-seat surprises. Pick a tier and grow.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {tiers.map((tier) => {
              const config = TIER_LIMITS[tier.key];
              return (
                <div
                  key={tier.key}
                  className={`relative p-8 bg-white rounded-2xl border-2 transition-all ${
                    tier.popular
                      ? 'border-indigo-600 shadow-xl scale-105'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {tier.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-indigo-600 text-white text-xs font-semibold rounded-full">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">{config.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-4xl font-bold text-gray-900">{formatCurrency(config.price)}</span>
                    <span className="text-gray-500">/mo</span>
                  </div>
                  <ul className="space-y-3 mb-8">
                    {tier.highlights.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-indigo-500 mt-0.5">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={ROUTES.SIGNUP}
                    className={`block w-full py-3 text-center font-semibold rounded-xl transition-colors ${
                      tier.popular
                        ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                        : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
