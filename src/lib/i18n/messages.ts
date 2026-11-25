export interface LocaleMessages {
  navigation: {
    openMainMenu: string;
    signature: string;
  };
  theme: {
    system: string;
    light: string;
    dark: string;
    currentTheme: string;
    cycleTheme: string;
  };
  profile: {
    email: string;
    location: string;
    workAddress: string;
    click: string;
    googleMap: string;
    send: string;
    sendEmail: string;
    researchInterests: string;
    skillsAndLanguages: string;
    visitGithub: string;
    like: string;
    liked: string;
    thanks: string;
  };
  home: {
    about: string;
    news: string;
    selectedProjects: string;
    viewAll: string;
  };
  footer: {
    lastUpdated: string;
    builtWith: string;
  };
  tables: { year: string; event: string; result: string; rank: string };
  moments: { empty: string };
}

const en: LocaleMessages = {
  navigation: {
    openMainMenu: 'Open main menu',
    signature: 'Personal motto',
  },
  theme: {
    system: 'System',
    light: 'Light',
    dark: 'Dark',
    currentTheme: 'Current theme',
    cycleTheme: 'Click to cycle theme',
  },
  profile: {
    email: 'Email',
    location: 'Location',
    workAddress: 'Work Address',
    click: 'Click',
    googleMap: 'Google Map',
    send: 'Send',
    sendEmail: 'Send Email',
    researchInterests: 'Research Interests',
    skillsAndLanguages: 'Skills & Languages',
    visitGithub: 'Visit GitHub',
    like: 'Like',
    liked: 'Liked',
    thanks: 'Thanks!',
  },
  home: {
    about: 'About',
    news: 'News',
    selectedProjects: 'Research & Projects',
    viewAll: 'View All',
  },
  footer: {
    lastUpdated: 'Last updated',
    builtWith: 'Built with PRISM',
  },
  tables: { year: 'Year', event: 'Competition / Certification', result: 'Award / Score', rank: 'Rank / Percentile' },
  moments: { empty: 'Photos are on the way.' },
};

const zh: LocaleMessages = {
  navigation: {
    openMainMenu: '打开主菜单',
    signature: '个性签名',
  },
  theme: {
    system: '跟随系统',
    light: '浅色',
    dark: '深色',
    currentTheme: '当前主题',
    cycleTheme: '点击切换主题',
  },
  profile: {
    email: '邮箱',
    location: '地址',
    workAddress: '办公地址',
    click: '点击',
    googleMap: '谷歌地图',
    send: '发送',
    sendEmail: '发送邮件',
    researchInterests: '研究兴趣',
    skillsAndLanguages: '技能与语言',
    visitGithub: '访问 GitHub',
    like: '点赞',
    liked: '已点赞',
    thanks: '感谢支持！',
  },
  home: {
    about: '关于我',
    news: '动态',
    selectedProjects: '研究与项目',
    viewAll: '查看全部',
  },
  footer: {
    lastUpdated: '最近更新',
    builtWith: '由 PRISM 构建',
  },
  tables: { year: '年份', event: '竞赛 / 认证', result: '奖项 / 成绩', rank: '排名 / 百分位' },
  moments: { empty: '照片还在整理中。' },
};

export const messages: Record<string, LocaleMessages> = {
  en,
  zh,
};

export function getMessages(locale: string): LocaleMessages {
  return messages[locale] || en;
}
