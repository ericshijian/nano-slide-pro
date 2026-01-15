import { useLanguage } from '@/contexts/LanguageContext';
import { Layout } from '@/components/layout/Layout';
import { 
  FileText, 
  Upload, 
  Palette, 
  Wand2, 
  Download, 
  Settings,
  ChevronRight,
  BookOpen,
  Zap,
  Video
} from 'lucide-react';

const docSections = [
  {
    key: 'gettingStarted',
    icon: BookOpen,
    articles: ['quickStart', 'uploadDocument', 'chooseStyle'],
  },
  {
    key: 'features',
    icon: Zap,
    articles: ['aiGeneration', 'imageGen', 'videoIntegration'],
  },
  {
    key: 'export',
    icon: Download,
    articles: ['exportPptx', 'exportPdf', 'sharing'],
  },
  {
    key: 'advanced',
    icon: Settings,
    articles: ['customStyles', 'apiUsage', 'integrations'],
  },
];

export default function Docs() {
  const { language } = useLanguage();

  const translations: Record<string, Record<string, string>> = {
    title: { en: 'Documentation', cn: '使用文档' },
    subtitle: { en: 'Learn how to use NanoSlide Pro effectively', cn: '了解如何有效使用 NanoSlide Pro' },
    searchPlaceholder: { en: 'Search documentation...', cn: '搜索文档...' },
    gettingStarted: { en: 'Getting Started', cn: '快速入门' },
    features: { en: 'Core Features', cn: '核心功能' },
    export: { en: 'Export & Share', cn: '导出与分享' },
    advanced: { en: 'Advanced Usage', cn: '高级用法' },
    quickStart: { en: 'Quick Start Guide', cn: '快速开始指南' },
    uploadDocument: { en: 'Uploading Documents', cn: '上传文档' },
    chooseStyle: { en: 'Choosing Visual Styles', cn: '选择视觉样式' },
    aiGeneration: { en: 'AI Content Generation', cn: 'AI内容生成' },
    imageGen: { en: 'Image Generation', cn: '图像生成' },
    videoIntegration: { en: 'Video Integration', cn: '视频集成' },
    exportPptx: { en: 'Export to PowerPoint', cn: '导出为PowerPoint' },
    exportPdf: { en: 'Export to PDF', cn: '导出为PDF' },
    sharing: { en: 'Sharing Presentations', cn: '分享演示文稿' },
    customStyles: { en: 'Custom Styles', cn: '自定义样式' },
    apiUsage: { en: 'API Reference', cn: 'API参考' },
    integrations: { en: 'Third-party Integrations', cn: '第三方集成' },
  };

  const tr = (key: string) => translations[key]?.[language] || key;

  return (
    <Layout>
      <section className="py-24 relative min-h-screen">
        {/* Background effects */}
        <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 relative z-10">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">{tr('title')}</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">{tr('subtitle')}</p>
            
            {/* Search */}
            <div className="max-w-md mx-auto">
              <input
                type="text"
                placeholder={tr('searchPlaceholder')}
                className="w-full px-4 py-3 rounded-xl glass border-border/50 bg-surface-glass/50 focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>

          {/* Documentation sections */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {docSections.map((section) => (
              <div
                key={section.key}
                className="p-6 rounded-2xl glass hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <section.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h2 className="text-xl font-semibold">{tr(section.key)}</h2>
                </div>

                <ul className="space-y-2">
                  {section.articles.map((article) => (
                    <li key={article}>
                      <a
                        href="#"
                        className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-muted/50 transition-colors group"
                      >
                        <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                          {tr(article)}
                        </span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Quick help cards */}
          <div className="mt-16 grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Upload, title: language === 'cn' ? '支持的文件格式' : 'Supported Formats', desc: language === 'cn' ? 'PDF, DOCX, MD, TXT' : 'PDF, DOCX, MD, TXT' },
              { icon: Palette, title: language === 'cn' ? '视觉样式' : 'Visual Styles', desc: language === 'cn' ? '5种专业设计样式' : '5 Professional Styles' },
              { icon: Wand2, title: language === 'cn' ? 'AI能力' : 'AI Capabilities', desc: language === 'cn' ? '智能内容分析与生成' : 'Smart Analysis & Generation' },
            ].map((card) => (
              <div key={card.title} className="p-4 rounded-xl glass text-center">
                <card.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                <h3 className="font-medium mb-1">{card.title}</h3>
                <p className="text-sm text-muted-foreground">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}