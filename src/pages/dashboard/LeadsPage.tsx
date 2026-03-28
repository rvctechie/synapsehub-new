import { useState, useEffect } from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { leadsService } from '../../services';
import { formatDate } from '../../lib/utils';
import { LEAD_STAGE_COLORS, TEMPERATURE_COLORS } from '../../lib/constants';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import type { Lead, LeadFilters } from '../../types';

export function LeadsPage() {
  const { user } = useAuthContext();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<LeadFilters>({});

  useEffect(() => {
    if (!user?.organization_id) return;
    setLoading(true);
    leadsService
      .getLeads(user.organization_id, { ...filters, search: search || undefined }, page)
      .then(({ leads, total }) => { setLeads(leads); setTotal(total); })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user?.organization_id, page, filters, search]);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
          <p className="text-gray-600 text-sm mt-1">{total} total leads</p>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
          + Add Lead
        </button>
      </div>

      {/* Search */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search leads..."
          value={search}
          onChange={(e) => { setSearch(e.target.value); setPage(1); }}
          className="w-full max-w-md px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="p-12"><LoadingSpinner /></div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No leads found</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Stage</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Temp</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Source</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Score</th>
                  <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Last Activity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 cursor-pointer transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{lead.name || 'Unknown'}</div>
                      <div className="text-xs text-gray-500">{lead.email || lead.phone || '—'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full text-white"
                        style={{ backgroundColor: LEAD_STAGE_COLORS[lead.stage] || '#6b7280' }}>
                        {lead.stage}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full text-white"
                        style={{ backgroundColor: TEMPERATURE_COLORS[lead.temperature] || '#6b7280' }}>
                        {lead.temperature}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{lead.source}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{lead.score}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{formatDate(lead.last_activity_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Pagination */}
      {total > 25 && (
        <div className="flex items-center justify-between mt-4">
          <button disabled={page === 1} onClick={() => setPage(page - 1)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg disabled:opacity-50">Previous</button>
          <span className="text-sm text-gray-600">Page {page} of {Math.ceil(total / 25)}</span>
          <button disabled={page >= Math.ceil(total / 25)} onClick={() => setPage(page + 1)}
            className="px-3 py-1.5 text-sm border border-gray-300 rounded-lg disabled:opacity-50">Next</button>
        </div>
      )}
    </div>
  );
}
