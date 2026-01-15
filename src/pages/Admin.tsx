import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { 
  Users, 
  FileText, 
  BarChart3, 
  Settings, 
  TrendingUp,
  Activity,
  Clock,
  CheckCircle,
  AlertCircle,
  MoreVertical,
  Search,
  Filter,
  Download
} from 'lucide-react';

// Mock data for admin dashboard
const statsData = [
  { key: 'totalUsers', value: '12,847', change: '+12%', icon: Users },
  { key: 'presentations', value: '45,392', change: '+23%', icon: FileText },
  { key: 'activeToday', value: '1,284', change: '+8%', icon: Activity },
  { key: 'successRate', value: '98.5%', change: '+2%', icon: CheckCircle },
];

const recentUsers = [
  { id: 1, name: '张三', email: 'zhangsan@example.com', plan: 'Pro', status: 'active', presentations: 28 },
  { id: 2, name: 'John Doe', email: 'john@example.com', plan: 'Free', status: 'active', presentations: 5 },
  { id: 3, name: '李四', email: 'lisi@example.com', plan: 'Enterprise', status: 'active', presentations: 156 },
  { id: 4, name: 'Jane Smith', email: 'jane@example.com', plan: 'Pro', status: 'inactive', presentations: 42 },
  { id: 5, name: '王五', email: 'wangwu@example.com', plan: 'Free', status: 'active', presentations: 3 },
];

const recentActivity = [
  { id: 1, action: 'newUser', user: '张三', time: '5分钟前' },
  { id: 2, action: 'generated', user: 'John Doe', time: '12分钟前' },
  { id: 3, action: 'upgraded', user: '李四', time: '1小时前' },
  { id: 4, action: 'exported', user: 'Jane Smith', time: '2小时前' },
  { id: 5, action: 'generated', user: '王五', time: '3小时前' },
];

type TabType = 'overview' | 'users' | 'analytics' | 'settings';

export default function Admin() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const translations: Record<string, Record<string, string>> = {
    title: { en: 'Admin Dashboard', cn: '管理后台' },
    overview: { en: 'Overview', cn: '概览' },
    users: { en: 'Users', cn: '用户管理' },
    analytics: { en: 'Analytics', cn: '数据分析' },
    settings: { en: 'Settings', cn: '系统设置' },
    totalUsers: { en: 'Total Users', cn: '总用户数' },
    presentations: { en: 'Presentations', cn: '演示文稿数' },
    activeToday: { en: 'Active Today', cn: '今日活跃' },
    successRate: { en: 'Success Rate', cn: '成功率' },
    recentUsers: { en: 'Recent Users', cn: '最近用户' },
    recentActivity: { en: 'Recent Activity', cn: '最近活动' },
    viewAll: { en: 'View All', cn: '查看全部' },
    search: { en: 'Search users...', cn: '搜索用户...' },
    export: { en: 'Export', cn: '导出' },
    filter: { en: 'Filter', cn: '筛选' },
    name: { en: 'Name', cn: '名称' },
    email: { en: 'Email', cn: '邮箱' },
    plan: { en: 'Plan', cn: '套餐' },
    status: { en: 'Status', cn: '状态' },
    actions: { en: 'Actions', cn: '操作' },
    active: { en: 'Active', cn: '活跃' },
    inactive: { en: 'Inactive', cn: '未活跃' },
    newUser: { en: 'New user registered', cn: '新用户注册' },
    generated: { en: 'Generated presentation', cn: '生成了演示文稿' },
    upgraded: { en: 'Upgraded to Pro', cn: '升级为专业版' },
    exported: { en: 'Exported presentation', cn: '导出了演示文稿' },
  };

  const tr = (key: string) => translations[key]?.[language] || key;

  const tabs = [
    { key: 'overview' as TabType, icon: BarChart3 },
    { key: 'users' as TabType, icon: Users },
    { key: 'analytics' as TabType, icon: TrendingUp },
    { key: 'settings' as TabType, icon: Settings },
  ];

  return (
    <Layout>
      <section className="py-8 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl font-bold">
              <span className="text-gradient">{tr('title')}</span>
            </h1>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                {tr('export')}
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 p-1 glass rounded-xl w-fit">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.key
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted/50'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tr(tab.key)}</span>
              </button>
            ))}
          </div>

          {/* Stats Cards */}
          <div className="grid md:grid-cols-4 gap-4 mb-8">
            {statsData.map((stat) => (
              <div key={stat.key} className="p-6 rounded-xl glass">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="text-xs text-green-400 bg-green-400/10 px-2 py-1 rounded-full">
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{tr(stat.key)}</p>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Users Table */}
            <div className="lg:col-span-2 glass rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">{tr('recentUsers')}</h2>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      placeholder={tr('search')}
                      className="pl-9 pr-4 py-2 text-sm rounded-lg bg-muted/50 border border-border/50 focus:outline-none focus:border-primary/50"
                    />
                  </div>
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-muted-foreground border-b border-border/50">
                      <th className="pb-3 font-medium">{tr('name')}</th>
                      <th className="pb-3 font-medium">{tr('email')}</th>
                      <th className="pb-3 font-medium">{tr('plan')}</th>
                      <th className="pb-3 font-medium">{tr('status')}</th>
                      <th className="pb-3 font-medium">{tr('actions')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="border-b border-border/30 hover:bg-muted/30">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-sm font-medium">
                              {user.name[0]}
                            </div>
                            <span className="font-medium">{user.name}</span>
                          </div>
                        </td>
                        <td className="py-4 text-sm text-muted-foreground">{user.email}</td>
                        <td className="py-4">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            user.plan === 'Enterprise' ? 'bg-accent/20 text-accent' :
                            user.plan === 'Pro' ? 'bg-primary/20 text-primary' :
                            'bg-muted text-muted-foreground'
                          }`}>
                            {user.plan}
                          </span>
                        </td>
                        <td className="py-4">
                          <span className={`flex items-center gap-1 text-xs ${
                            user.status === 'active' ? 'text-green-400' : 'text-muted-foreground'
                          }`}>
                            <span className={`w-2 h-2 rounded-full ${
                              user.status === 'active' ? 'bg-green-400' : 'bg-muted-foreground'
                            }`} />
                            {tr(user.status)}
                          </span>
                        </td>
                        <td className="py-4">
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-4 text-center">
                <Button variant="ghost" size="sm">
                  {tr('viewAll')}
                </Button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="glass rounded-xl p-6">
              <h2 className="text-lg font-semibold mb-6">{tr('recentActivity')}</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      activity.action === 'newUser' ? 'bg-green-400/10' :
                      activity.action === 'upgraded' ? 'bg-accent/10' :
                      'bg-primary/10'
                    }`}>
                      {activity.action === 'newUser' ? (
                        <Users className="w-4 h-4 text-green-400" />
                      ) : activity.action === 'upgraded' ? (
                        <TrendingUp className="w-4 h-4 text-accent" />
                      ) : activity.action === 'exported' ? (
                        <Download className="w-4 h-4 text-primary" />
                      ) : (
                        <FileText className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm">
                        <span className="font-medium">{activity.user}</span>
                        <span className="text-muted-foreground"> {tr(activity.action)}</span>
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Clock className="w-3 h-3" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}