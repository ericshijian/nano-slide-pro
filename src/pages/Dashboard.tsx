import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Plus, 
  Folder, 
  FileText, 
  Trash2, 
  MoreVertical,
  Clock,
  Layers
} from 'lucide-react';

// Mock data for projects
const mockProjects = [
  {
    id: '1',
    title: { en: 'Q4 Business Report', cn: 'Q4季度商业报告' },
    thumbnail: 'business',
    status: 'completed',
    slides: 12,
    lastEdited: '2024-01-10',
  },
  {
    id: '2',
    title: { en: 'Product Launch Deck', cn: '产品发布演示' },
    thumbnail: 'product',
    status: 'completed',
    slides: 18,
    lastEdited: '2024-01-09',
  },
  {
    id: '3',
    title: { en: 'AI Research Findings', cn: 'AI研究发现' },
    thumbnail: 'research',
    status: 'processing',
    slides: 8,
    lastEdited: '2024-01-08',
  },
  {
    id: '4',
    title: { en: 'Team Onboarding', cn: '团队入职培训' },
    thumbnail: 'team',
    status: 'draft',
    slides: 5,
    lastEdited: '2024-01-07',
  },
];

export default function Dashboard() {
  const { t, language } = useLanguage();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'processing':
        return 'bg-primary/20 text-primary border-primary/30';
      case 'draft':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getStatusLabel = (status: string) => {
    return t(`dashboard.status.${status}`);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{t('dashboard.title')}</h1>
            <p className="text-muted-foreground">{t('dashboard.welcome')}, Alex</p>
          </div>
          <Link to="/create">
            <Button className="bg-gradient-button hover:opacity-90 text-white shadow-glow">
              <Plus className="w-4 h-4 mr-2" />
              {t('dashboard.newPresentation')}
            </Button>
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <nav className="space-y-1">
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary border border-primary/20">
                <FileText className="w-5 h-5" />
                <span className="font-medium">{t('dashboard.allProjects')}</span>
              </button>
              <Link to="/templates" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors">
                <Folder className="w-5 h-5" />
                <span>{t('dashboard.templates')}</span>
              </Link>
              <Link to="/trash" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors">
                <Trash2 className="w-5 h-5" />
                <span>{t('dashboard.trash')}</span>
              </Link>
            </nav>

            {/* Quick stats */}
            <div className="mt-8 p-4 glass rounded-xl">
              <h3 className="text-sm font-medium mb-4">{t('dashboard.recentProjects')}</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Total</span>
                  <span className="font-medium">4</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t('dashboard.status.completed')}</span>
                  <span className="font-medium text-green-400">2</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">{t('dashboard.status.processing')}</span>
                  <span className="font-medium text-primary">1</span>
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">{t('dashboard.recentProjects')}</h2>
            </div>

            {/* Projects grid */}
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {/* New presentation card */}
              <Link
                to="/create"
                className="group aspect-[4/3] rounded-xl border-2 border-dashed border-border hover:border-primary/50 flex flex-col items-center justify-center gap-3 transition-all hover:bg-muted/20"
              >
                <div className="w-14 h-14 rounded-full bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Plus className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {t('dashboard.newPresentation')}
                </span>
              </Link>

              {/* Project cards */}
              {mockProjects.map((project, index) => (
                <Link
                  key={project.id}
                  to="/editor"
                  className="group glass rounded-xl overflow-hidden hover:border-primary/50 transition-all animate-fade-in"
                  style={{ animationDelay: `${0.05 * index}s` }}
                >
                  {/* Thumbnail */}
                  <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden">
                    <div className="absolute inset-0 p-4">
                      {/* Mock slide content */}
                      <div className="w-full h-full rounded-lg bg-surface-elevated/50 p-3">
                        <div className="w-3/4 h-2 bg-primary/30 rounded mb-2" />
                        <div className="w-1/2 h-2 bg-muted-foreground/20 rounded mb-3" />
                        <div className="grid grid-cols-2 gap-2">
                          <div className="aspect-square bg-muted-foreground/10 rounded" />
                          <div className="aspect-square bg-muted-foreground/10 rounded" />
                        </div>
                      </div>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>

                  {/* Info */}
                  <div className="p-4">
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="font-medium truncate">
                        {project.title[language]}
                      </h3>
                      <Button variant="ghost" size="icon" className="shrink-0 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className={`px-2 py-1 rounded-full border ${getStatusColor(project.status)}`}>
                        {getStatusLabel(project.status)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Layers className="w-3 h-3" />
                        {project.slides} {t('dashboard.slides')}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-xs text-muted-foreground mt-3">
                      <Clock className="w-3 h-3" />
                      <span>{t('dashboard.lastEdited')}: {project.lastEdited}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
