import { SEOHead } from '../../components/SEOHead';

export function AgentsPage() {
  return (
    <>
      <SEOHead title="AI Agents" />
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">🤖 AI Agents</h1>
          <p className="text-gray-600 mt-1">Configure and manage your AI chat and voice agents.</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">
          <p className="text-lg font-medium">AI Agents module</p>
          <p className="text-sm mt-2">Full implementation coming in Phase 2.</p>
        </div>
      </div>
    </>
  );
}
