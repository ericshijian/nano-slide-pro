export type Language = 'en' | 'cn';

export const translations = {
  // Navbar
  nav: {
    brand: { en: 'NanoSlide Pro', cn: 'NanoSlide Pro' },
    features: { en: 'Features', cn: '功能' },
    pricing: { en: 'Pricing', cn: '价格' },
    docs: { en: 'Docs', cn: '文档' },
    dashboard: { en: 'Dashboard', cn: '工作台' },
    login: { en: 'Login', cn: '登录' },
    getStarted: { en: 'Get Started', cn: '开始使用' },
  },

  // Landing Page
  landing: {
    heroTitle: { 
      en: 'Transform Documents into Professional Slides in Seconds', 
      cn: '几秒钟内将文档转化为专业演示文稿' 
    },
    heroSubtitle: { 
      en: 'AI-powered presentation generator with parallel image generation, video integration, and real-time analysis.', 
      cn: 'AI驱动的演示文稿生成器，支持并行图像生成、视频集成和实时分析。' 
    },
    ctaGenerate: { en: 'Generate for Free', cn: '免费生成' },
    ctaDemo: { en: 'Watch Demo', cn: '观看演示' },
    featureParallel: { en: 'Parallel Image Generation', cn: '并行图像生成' },
    featureParallelDesc: { en: 'Generate multiple AI images simultaneously for faster presentation creation.', cn: '同时生成多张AI图像，加速演示文稿创建。' },
    featureVideo: { en: 'Video Integration', cn: '视频集成' },
    featureVideoDesc: { en: 'Seamless Kling API integration for AI-generated video content.', cn: '无缝集成Kling API，生成AI视频内容。' },
    featureRealtime: { en: 'Real-time Analysis', cn: '实时分析' },
    featureRealtimeDesc: { en: 'Watch your document transform with live progress updates.', cn: '通过实时进度更新，观看文档转换过程。' },
    featureExport: { en: 'PPTX Export', cn: 'PPTX导出' },
    featureExportDesc: { en: 'Export to Microsoft PowerPoint with one click.', cn: '一键导出到Microsoft PowerPoint。' },
    trustedBy: { en: 'Trusted by innovative teams worldwide', cn: '全球创新团队的信赖之选' },
  },

  // Dashboard
  dashboard: {
    title: { en: 'Workspace', cn: '工作台' },
    welcome: { en: 'Welcome back', cn: '欢迎回来' },
    recentProjects: { en: 'Recent Projects', cn: '最近项目' },
    newPresentation: { en: 'New Presentation', cn: '新建演示' },
    allProjects: { en: 'All Projects', cn: '全部项目' },
    templates: { en: 'Templates', cn: '模板' },
    trash: { en: 'Trash', cn: '回收站' },
    noProjects: { en: 'No projects yet', cn: '暂无项目' },
    createFirst: { en: 'Create your first presentation', cn: '创建您的第一个演示文稿' },
    status: {
      completed: { en: 'Completed', cn: '已完成' },
      processing: { en: 'Processing', cn: '处理中' },
      draft: { en: 'Draft', cn: '草稿' },
    },
    lastEdited: { en: 'Last edited', cn: '上次编辑' },
    slides: { en: 'slides', cn: '张幻灯片' },
  },

  // Creation Wizard
  create: {
    title: { en: 'Create New Presentation', cn: '创建新演示文稿' },
    step1: { en: 'Upload Document', cn: '上传文档' },
    step2: { en: 'Configure Style', cn: '配置样式' },
    step3: { en: 'Generate', cn: '生成' },
    dragDrop: { en: 'Drag files here or click to browse', cn: '拖拽文件到此处或点击浏览' },
    supportedFormats: { en: 'Supported: PDF, MD, DOCX', cn: '支持格式：PDF、MD、DOCX' },
    visualStyle: { en: 'Visual Style', cn: '视觉风格' },
    styleOptions: {
      corporate: { en: 'Corporate', cn: '商务' },
      creative: { en: 'Creative', cn: '创意' },
      cyberpunk: { en: 'Cyberpunk', cn: '赛博朋克' },
      minimal: { en: 'Minimal', cn: '极简' },
      academic: { en: 'Academic', cn: '学术' },
    },
    includeVideo: { en: 'Include AI Video', cn: '包含AI视频' },
    videoHint: { en: 'Powered by Kling API', cn: '由Kling API提供支持' },
    slideCount: { en: 'Slide Count', cn: '幻灯片数量' },
    slideCountAuto: { en: 'Auto', cn: '自动' },
    startGeneration: { en: 'Start Generation', cn: '开始生成' },
    back: { en: 'Back', cn: '返回' },
    next: { en: 'Next', cn: '下一步' },
  },

  // Generation Process
  generation: {
    title: { en: 'Generating Your Presentation', cn: '正在生成您的演示文稿' },
    progress: { en: 'Progress', cn: '进度' },
    logs: {
      analyzing: { en: 'Analyzing Document Structure...', cn: '正在分析文档结构...' },
      designing: { en: 'Designing Schema...', cn: '正在设计大纲 Schema...' },
      images: { en: 'Generating Images in Parallel (Task 5.2)...', cn: '并行生成配图 (Task 5.2)...' },
      video: { en: 'Synthesizing Video Workflow (Task 5.3)...', cn: '合成 AI 视频流 (Task 5.3)...' },
      composing: { en: 'Final Composition (Task 5.4)...', cn: '最终合成渲染 (Task 5.4)...' },
      complete: { en: 'Generation Complete!', cn: '生成完成！' },
    },
    imageGen: { en: 'Image Generation', cn: '图像生成' },
    videoGen: { en: 'Video Generation', cn: '视频生成' },
    slidePreview: { en: 'Slide Preview', cn: '幻灯片预览' },
    viewResult: { en: 'View Result', cn: '查看结果' },
  },

  // Editor
  editor: {
    title: { en: 'Editor', cn: '编辑器' },
    slides: { en: 'Slides', cn: '幻灯片' },
    regenerateImage: { en: 'Regenerate Image', cn: '重新生成图片' },
    editText: { en: 'Edit Text', cn: '编辑文本' },
    exportPptx: { en: 'Export PPTX', cn: '导出 PPTX' },
    addSlide: { en: 'Add Slide', cn: '添加幻灯片' },
    deleteSlide: { en: 'Delete Slide', cn: '删除幻灯片' },
    duplicateSlide: { en: 'Duplicate', cn: '复制' },
    videoPlaceholder: { en: 'AI Generated Video', cn: 'AI生成视频' },
    save: { en: 'Save', cn: '保存' },
    preview: { en: 'Preview', cn: '预览' },
  },

  // Common
  common: {
    loading: { en: 'Loading...', cn: '加载中...' },
    error: { en: 'Error', cn: '错误' },
    success: { en: 'Success', cn: '成功' },
    cancel: { en: 'Cancel', cn: '取消' },
    confirm: { en: 'Confirm', cn: '确认' },
    save: { en: 'Save', cn: '保存' },
    delete: { en: 'Delete', cn: '删除' },
    edit: { en: 'Edit', cn: '编辑' },
  },
} as const;

export type TranslationKey = keyof typeof translations;

export function t(key: string, lang: Language): string {
  const keys = key.split('.');
  let value: any = translations;
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value?.[lang] ?? key;
}
