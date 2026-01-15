import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Folder, 
  FileText, 
  Trash2, 
  Star,
  Download,
  Eye,
  Briefcase,
  Lightbulb,
  GraduationCap,
  Rocket,
  BarChart3
} from 'lucide-react';

// Mock template data
const mockTemplates = [
  {
    id: '1',
    title: { en: 'Business Report', cn: '商业报告' },
    description: { en: 'Professional corporate template for quarterly reports', cn: '专业的公司季度报告模板' },
    category: 'corporate',
    icon: Briefcase,
    downloads: 1250,
    featured: true,
  },
  {
    id: '2',
    title: { en: 'Creative Pitch', cn: '创意提案' },
    description: { en: 'Eye-catching design for creative presentations', cn: '吸引眼球的创意演示设计' },
    category: 'creative',
    icon: Lightbulb,
    downloads: 890,
    featured: true,
  },
  {
    id: '3',
    title: { en: 'Academic Research', cn: '学术研究' },
    description: { en: 'Clean layout for academic and research presentations', cn: '适合学术和研究报告的简洁布局' },
    category: 'academic',
    icon: GraduationCap,
    downloads: 670,
    featured: false,
  },
  {
    id: '4',
    title: { en: 'Startup Pitch Deck', cn: '创业路演' },
    description: { en: 'Investor-ready pitch deck template', cn: '面向投资者的路演模板' },
    category: 'startup',
    icon: Rocket,
    downloads: 2100,
    featured: true,
  },
  {
    id: '5',
    title: { en: 'Data Analytics', cn: '数据分析' },
    description: { en: 'Data-driven template with chart layouts', cn: '带图表布局的数据驱动模板' },
    category: 'analytics',
    icon: BarChart3,
    downloads: 540,
    featured: false,
  },
];

const translations = {
  title: { en: 'Templates', cn: '模板库' },
  subtitle: { en: 'Start with professionally designed templates', cn: '从专业设计的模板开始' },
  featured: { en: 'Featured', cn: '精选' },
  allTemplates: { en: 'All Templates', cn: '全部模板' },
  downloads: { en: 'downloads', cn: '次下载' },
  useTemplate: { en: 'Use Template', cn: '使用模板' },
  preview: { en: 'Preview', cn: '预览' },
  categories: {
    corporate: { en: 'Corporate', cn: '商务' },
    creative: { en: 'Creative', cn: '创意' },
    academic: { en: 'Academic', cn: '学术' },
    startup: { en: 'Startup', cn: '创业' },
    analytics: { en: 'Analytics', cn: '分析' },
  },
};

export default function Templates() {
  const { t: globalT, language } = useLanguage();

  const getTranslation = (obj: { en: string; cn: string }) => {
    return language === 'cn' ? obj.cn : obj.en;
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">{getTranslation(translations.title)}</h1>
          <p className="text-muted-foreground">{getTranslation(translations.subtitle)}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <nav className="space-y-1">
              <Link to="/dashboard" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors">
                <FileText className="w-5 h-5" />
                <span>{globalT('dashboard.allProjects')}</span>
              </Link>
              <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-primary/10 text-primary border border-primary/20">
                <Folder className="w-5 h-5" />
                <span className="font-medium">{globalT('dashboard.templates')}</span>
              </button>
              <Link to="/trash" className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-muted-foreground hover:bg-muted/50 transition-colors">
                <Trash2 className="w-5 h-5" />
                <span>{globalT('dashboard.trash')}</span>
              </Link>
            </nav>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Featured section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-yellow-500" />
                {getTranslation(translations.featured)}
              </h2>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {mockTemplates.filter(t => t.featured).map((template, index) => {
                  const IconComponent = template.icon;
                  return (
                    <div
                      key={template.id}
                      className="group glass rounded-xl overflow-hidden hover:border-primary/50 transition-all animate-fade-in"
                      style={{ animationDelay: `${0.05 * index}s` }}
                    >
                      {/* Thumbnail */}
                      <div className="aspect-video bg-gradient-to-br from-primary/20 to-muted relative overflow-hidden flex items-center justify-center">
                        <IconComponent className="w-12 h-12 text-primary/60" />
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <h3 className="font-medium mb-1">{getTranslation(template.title)}</h3>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {getTranslation(template.description)}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            {template.downloads} {getTranslation(translations.downloads)}
                          </span>
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm" className="h-8">
                              <Eye className="w-4 h-4 mr-1" />
                              {getTranslation(translations.preview)}
                            </Button>
                            <Link to="/create">
                              <Button size="sm" className="h-8 bg-gradient-button hover:opacity-90">
                                {getTranslation(translations.useTemplate)}
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* All templates section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">{getTranslation(translations.allTemplates)}</h2>
              <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {mockTemplates.map((template, index) => {
                  const IconComponent = template.icon;
                  return (
                    <div
                      key={template.id}
                      className="group glass rounded-xl overflow-hidden hover:border-primary/50 transition-all animate-fade-in"
                      style={{ animationDelay: `${0.05 * index}s` }}
                    >
                      {/* Thumbnail */}
                      <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 relative overflow-hidden flex items-center justify-center">
                        <IconComponent className="w-12 h-12 text-muted-foreground/60" />
                        <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>

                      {/* Info */}
                      <div className="p-4">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{getTranslation(template.title)}</h3>
                          {template.featured && (
                            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {getTranslation(template.description)}
                        </p>

                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Download className="w-3 h-3" />
                            {template.downloads}
                          </span>
                          <Link to="/create">
                            <Button size="sm" variant="outline" className="h-8">
                              {getTranslation(translations.useTemplate)}
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
