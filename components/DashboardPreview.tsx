import React from 'react';
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid } from 'recharts';
import { Activity, Server, Database, Globe, ShieldCheck, Cpu, ChevronDown, Plus, Filter, ArrowRight } from 'lucide-react';

const areaData = [
  { name: 'Mon', value: 2400 },
  { name: 'Tue', value: 1398 },
  { name: 'Wed', value: 9800 },
  { name: 'Thu', value: 3908 },
  { name: 'Fri', value: 4800 },
  { name: 'Sat', value: 3800 },
  { name: 'Sun', value: 4300 },
];

const barData = [
  { name: 'Jan', opportunities: 40, closed: 24 },
  { name: 'Feb', opportunities: 30, closed: 13 },
  { name: 'Mar', opportunities: 20, closed: 98 },
  { name: 'Apr', opportunities: 27, closed: 39 },
  { name: 'May', opportunities: 18, closed: 48 },
  { name: 'Jun', opportunities: 23, closed: 38 },
];

export default function DashboardPreview() {
  return (
    <section className="bg-transparent -mt-24 relative z-20 px-4 pb-20">
      <div className="max-w-7xl mx-auto">
        <div className="bg-slate-900/50 backdrop-blur-sm rounded-xl border border-slate-800 p-2 shadow-2xl shadow-black/80">
            <div className="bg-slate-950 rounded-lg overflow-hidden border border-slate-800">
            {/* Mock Window Header */}
            <div className="bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between">
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                    <div className="w-3 h-3 rounded-full bg-slate-700"></div>
                </div>
                <div className="hidden md:flex bg-slate-950 border border-slate-800 rounded-md px-32 py-1.5 text-xs text-slate-500 items-center font-mono">
                    <span className="text-slate-600 mr-2">🔒</span> ops.synapsehub.com
                </div>
                <div className="w-16"></div> {/* Spacer */}
            </div>

            {/* Dashboard Layout */}
            <div className="flex h-[600px] md:h-[700px] bg-slate-950">
                {/* Sidebar */}
                <div className="hidden md:flex w-64 bg-slate-950 text-slate-400 flex-shrink-0 flex-col border-r border-slate-800">
                <div className="p-5 border-b border-slate-800/50 flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm">S</div>
                    <div>
                        <div className="text-sm font-semibold text-white">SynapseHub</div>
                        <div className="text-xs text-slate-500">Managed Ops</div>
                    </div>
                    <ChevronDown className="w-4 h-4 ml-auto text-slate-600" />
                </div>
                
                <div className="flex-1 px-3 py-6 space-y-1">
                    <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 mb-2">Infrastructure</div>
                    <div className="flex items-center gap-3 p-2 bg-blue-500/10 text-blue-400 rounded-md cursor-pointer border border-blue-500/20">
                    <div className="w-4 h-4"><Activity className="w-4 h-4" /></div>
                    <span className="text-sm font-medium">Ops Intelligence</span>
                    </div>
                    {['Managed Assets', 'Lead Flow', 'Compliance', 'Revenue Engine'].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-2 hover:bg-slate-900 text-slate-400 hover:text-slate-200 rounded-md cursor-pointer transition-colors group">
                            <div className="w-4 h-4 group-hover:text-blue-400 transition-colors">
                                {i === 0 ? <Server className="w-4 h-4"/> : i === 1 ? <Globe className="w-4 h-4"/> : i === 2 ? <ShieldCheck className="w-4 h-4"/> : <Database className="w-4 h-4"/>}
                            </div>
                            <span className="text-sm">{item}</span>
                        </div>
                    ))}
                    <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider px-3 mt-6 mb-2">Engineering</div>
                    {['Deployments', 'Integrations', 'API Status', 'Logs'].map((item, i) => (
                        <div key={i} className="flex items-center gap-3 p-2 hover:bg-slate-900 text-slate-400 hover:text-slate-200 rounded-md cursor-pointer transition-colors">
                            <div className="w-4 h-4"><Cpu className="w-4 h-4"/></div>
                            <span className="text-sm">{item}</span>
                        </div>
                    ))}
                </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 bg-slate-950 p-8 overflow-auto">
                {/* Header */}
                <div className="flex justify-between items-end mb-8">
                    <div>
                    <h2 className="text-2xl font-bold text-white mb-1">Executive Operations Intelligence</h2>
                    <p className="text-slate-500 text-sm">Real-time view of your managed infrastructure.</p>
                    </div>
                    <div className="flex gap-3">
                        <button className="flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-800 rounded-md text-slate-400 text-sm hover:text-white hover:border-slate-700 transition-all">
                            <Activity className="w-4 h-4" /> Live Status <ChevronDown className="w-3 h-3" />
                        </button>
                    </div>
                </div>

                {/* Strategic Infrastructure Blueprint */}
                <div className="mb-8 p-6 bg-slate-900/30 border border-slate-800 rounded-xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:24px_24px]"></div>
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 relative z-10">Strategic Infrastructure Blueprint</h3>
                    
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10 py-4">
                        {/* Node 1 */}
                        <div className="flex flex-col items-center gap-3 w-full md:w-auto">
                            <div className="w-16 h-16 rounded-xl bg-slate-800 border-2 border-slate-700 flex items-center justify-center shadow-lg">
                                <Globe className="w-8 h-8 text-blue-400" />
                            </div>
                            <div className="text-center">
                                <div className="text-white font-bold text-sm">Traffic Sources</div>
                                <div className="text-slate-500 text-xs">Managed Inbound</div>
                            </div>
                        </div>

                        <div className="hidden md:flex flex-1 h-px bg-slate-700 mx-4 relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 px-2 text-xs text-slate-500 font-mono">FLOW</div>
                            <ArrowRight className="absolute -right-1 -top-2 w-4 h-4 text-slate-700" />
                        </div>
                        <div className="md:hidden h-8 w-px bg-slate-700 my-2"></div>

                        {/* Node 2 */}
                        <div className="flex flex-col items-center gap-3 w-full md:w-auto">
                            <div className="w-16 h-16 rounded-xl bg-blue-900/20 border-2 border-blue-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(59,130,246,0.2)]">
                                <Cpu className="w-8 h-8 text-blue-400 animate-pulse" />
                            </div>
                            <div className="text-center">
                                <div className="text-white font-bold text-sm">Synapse Engine</div>
                                <div className="text-blue-400 text-xs font-medium">Processing...</div>
                            </div>
                        </div>

                        <div className="hidden md:flex flex-1 h-px bg-slate-700 mx-4 relative">
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 px-2 text-xs text-slate-500 font-mono">CONVERT</div>
                            <ArrowRight className="absolute -right-1 -top-2 w-4 h-4 text-slate-700" />
                        </div>
                        <div className="md:hidden h-8 w-px bg-slate-700 my-2"></div>

                        {/* Node 3 */}
                        <div className="flex flex-col items-center gap-3 w-full md:w-auto">
                            <div className="w-16 h-16 rounded-xl bg-emerald-900/20 border-2 border-emerald-500/50 flex items-center justify-center shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                                <Database className="w-8 h-8 text-emerald-400" />
                            </div>
                            <div className="text-center">
                                <div className="text-white font-bold text-sm">Revenue Data</div>
                                <div className="text-emerald-400 text-xs font-medium">Optimized</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* KPI Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    {[
                        { label: 'Total Revenue', value: '$124,500', trend: '+12.5%', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
                        { label: 'Nurtured Opportunities', value: '45', trend: '+5.2%', color: 'text-blue-400', bg: 'bg-blue-400/10' },
                        { label: 'Pipeline Value', value: '$34,000', trend: '-2.1%', color: 'text-rose-400', bg: 'bg-rose-400/10' },
                        { label: 'Conversion Rate', value: '18.2%', trend: '+1.4%', color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
                    ].map((stat, i) => (
                        <div key={i} className="bg-slate-900/50 p-5 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors">
                            <div className="text-slate-500 text-xs font-medium uppercase tracking-wide mb-2">{stat.label}</div>
                            <div className="flex items-end justify-between">
                                <div className="text-2xl font-bold text-white">{stat.value}</div>
                                <div className={`text-xs font-bold px-1.5 py-0.5 rounded ${stat.bg} ${stat.color}`}>{stat.trend}</div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-slate-900/50 p-6 rounded-lg border border-slate-800">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-semibold text-white text-sm">Revenue Growth</h3>
                            <Filter className="w-4 h-4 text-slate-500 cursor-pointer hover:text-slate-300" />
                        </div>
                        <div className="h-64 w-full min-w-0">
                            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                            <AreaChart data={areaData}>
                                <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                                </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} />
                                <Tooltip 
                                    contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', fontSize: '12px'}}
                                    itemStyle={{color: '#f8fafc'}}
                                />
                                <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorValue)" />
                            </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="bg-slate-900/50 p-6 rounded-lg border border-slate-800">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="font-semibold text-white text-sm">Operational Efficiency</h3>
                            <Activity className="w-4 h-4 text-slate-500 cursor-pointer hover:text-slate-300" />
                        </div>
                        <div className="h-64 w-full min-w-0">
                            <ResponsiveContainer width="100%" height="100%" minWidth={0}>
                                <BarChart data={barData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" horizontal={false} />
                                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} hide />
                                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 11}} width={30} />
                                <Tooltip 
                                    cursor={{fill: '#1e293b'}} 
                                    contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc', fontSize: '12px'}}
                                />
                                <Bar dataKey="closed" stackId="a" fill="#3b82f6" radius={[0, 4, 4, 0]} barSize={12} name="Closed Deals" />
                                <Bar dataKey="opportunities" stackId="a" fill="#1e293b" radius={[4, 0, 0, 4]} barSize={12} name="Nurtured Opps" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
      </div>
    </section>
  );
}