import { SEOHead } from '../../components/SEOHead';

export function KnowledgeBasePage() {
  return (
    <>
      <SEOHead title="Knowledge Base" />
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">📚 Knowledge Base</h1>
          <p className="text-gray-600 mt-1">Manage the information your AI agents use to respond.</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">
          <p className="text-lg font-medium">Knowledge Base module</p>
          <p className="text-sm mt-2">Full implementation coming in Phase 2.</p>
        </div>
      </div>
    </>
  );
}
