import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Folder, 
  FileText, 
  Trash2, 
  RotateCcw,
  Clock,
  Layers,
  AlertTriangle
} from 'lucide-react';

// Mock deleted projects data
const mockDeletedProjects = [
  {
    id: '1',
    title: { en: 'Old Marketing Plan', cn: '旧营销方案' },
    slides: 8,
    deletedAt: '2024-01-12',
    expiresIn: 28,
  },
  {
    id: '2',
    title: { en: 'Draft Presentation', cn: '草稿演示' },
    slides: 3,
    deletedAt: '2024-01-10',
    expiresIn: 26,
  },
  {
    id: '3',
    title: { en: 'Test Project', cn: '测试项目' },
    slides: 5,
    deletedAt: '2024-01-05',
    expiresIn: 21,
  },
];

const translations = {
  title: { en: 'Trash', cn: '回收站' },
  subtitle: { en: 'Deleted items are kept for 30 days before permanent deletion', cn: '已删除项目将保留30天后永久删除' },
  emptyTrash: { en: 'Empty Trash', cn: '清空回收站' },
  restore: { en: 'Restore', cn: '恢复' },
  deletePermanently: { en: 'Delete Permanently', cn: '永久删除' },
  deletedAt: { en: 'Deleted', cn: '删除于' },
  expiresIn: { en: 'Expires in', cn: '到期时间' },
  days: { en: 'days', cn: '天' },
  noItems: { en: 'Trash is empty', cn: '回收站为空' },
  noItemsDesc: { en: 'Deleted presentations will appear here', cn: '删除的演示文稿将显示在这里' },
  confirmEmpty: { en: 'Are you sure? This action cannot be undone.', cn: '确定要清空吗？此操作无法撤销。' },
};

export default function Trash() {
  const { t: globalT, language } = useLanguage();

  const getTranslation = (obj: { en: string; cn: string }) => {
    return language === 'cn' ? obj.cn : obj.en;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">{getTranslation(translations.title)}</h1>
            <p className="text-muted-foreground">{getTranslation(translations.subtitle)}</p>
          </div>
          {mockDeletedProjects.length > 0 && (
            <Button variant="destructive" className="gap-2">
              <Trash2 className="w-4 h-4" />
              {getTranslation(translations.emptyTrash)}
            </Button>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <nav className="space-y-1">
              <Link to="/dashboard" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors">
                <FileText className="w-5 h-5" />
                <span>{globalT('dashboard.allProjects')}</span>
              </Link>
              <Link to="/templates" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors">
                <Folder className="w-5 h-5" />
                <span>{globalT('dashboard.templates')}</span>
              </Link>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary border border-primary/20">
                <Trash2 className="w-5 h-5" />
                <span className="font-medium">{globalT('dashboard.trash')}</span>
              </button>
            </nav>

            {/* Warning info */}
            <div className="mt-8 p-4 glass rounded-xl border border-yellow-500/20 bg-yellow-500/5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-500 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="text-yellow-500 font-medium mb-1">
                    {language === 'cn' ? '自动清理' : 'Auto-cleanup'}
                  </p>
                  <p className="text-muted-foreground">
                    {language === 'cn' 
                      ? '回收站中的项目将在30天后自动删除'
                      : 'Items in trash will be automatically deleted after 30 days'}
                  </p>
                </div>
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {mockDeletedProjects.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Trash2 className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">{getTranslation(translations.noItems)}</h3>
                <p className="text-muted-foreground">{getTranslation(translations.noItemsDesc)}</p>
              </div>
            ) : (
              <div className="space-y-3">
                {mockDeletedProjects.map((project, index) => (
                  <div
                    key={project.id}
                    className="group glass rounded-xl p-4 hover:border-primary/30 transition-all animate-fade-in flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    style={{ animationDelay: `${0.05 * index}s` }}
                  >
                    <div className="flex items-center gap-4">
                      {/* Thumbnail placeholder */}
                      <div className="w-16 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0">
                        <FileText className="w-6 h-6 text-muted-foreground/50" />
                      </div>

                      <div>
                        <h3 className="font-medium mb-1">{getTranslation(project.title)}</h3>
                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Layers className="w-3 h-3" />
                            {project.slides} {globalT('dashboard.slides')}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {getTranslation(translations.deletedAt)}: {project.deletedAt}
                          </span>
                          <span className="text-yellow-500">
                            {getTranslation(translations.expiresIn)} {project.expiresIn} {getTranslation(translations.days)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                      <Button variant="outline" size="sm" className="gap-1">
                        <RotateCcw className="w-4 h-4" />
                        {getTranslation(translations.restore)}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive hover:bg-destructive/10">
                        {getTranslation(translations.deletePermanently)}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
