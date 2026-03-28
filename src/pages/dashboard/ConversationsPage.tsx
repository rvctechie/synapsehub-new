import { SEOHead } from '../../components/SEOHead';

export function ConversationsPage() {
  return (
    <>
      <SEOHead title="Conversations" />
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">💬 Conversations</h1>
          <p className="text-gray-600 mt-1">View and manage all AI conversations in real-time.</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">
          <p className="text-lg font-medium">Conversations module</p>
          <p className="text-sm mt-2">Full implementation coming in Phase 2.</p>
        </div>
      </div>
    </>
  );
}
