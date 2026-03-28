import { SEOHead } from '../../components/SEOHead';

export function DemoPage() {
  return (
    <>
      <SEOHead
        title="Live Demo"
        description="Try SynapseHub AI agents live. Chat with our demo agent and see the platform in action."
      />

      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            See SynapseHub in Action
          </h1>
          <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
            Chat with our AI agent below. It's the same technology your customers will interact with.
          </p>

          {/* Demo chat widget placeholder */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-xl p-8 min-h-[500px] flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-5xl mb-4">💬</div>
              <p className="text-lg font-medium">AI Chat Demo</p>
              <p className="text-sm mt-2">The embeddable chat widget will render here.</p>
              <p className="text-xs mt-1 text-gray-400">Powered by SynapseHub AI Engine</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
