import { SEOHead } from '../../components/SEOHead';

export function SettingsPage() {
  return (
    <>
      <SEOHead title="Settings" />
      <div>
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">⚙️ Settings</h1>
          <p className="text-gray-600 mt-1">Configure organization settings, branding, and integrations.</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center text-gray-500">
          <p className="text-lg font-medium">Settings module</p>
          <p className="text-sm mt-2">Full implementation coming in Phase 2.</p>
        </div>
      </div>
    </>
  );
}
