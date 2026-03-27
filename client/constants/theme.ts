// 陈皮日记 - 有机温暖风格主题
// 灵感来源：奶油色背景 + 莫兰迪色卡片 + 柔和圆角

export const Colors = {
  light: {
    textPrimary: "#1A1A1A",
    textSecondary: "rgba(26, 26, 26, 0.7)",
    textMuted: "rgba(26, 26, 26, 0.45)",
    primary: "#FF9E7D",       // 蜜桃橘 - 温暖主色
    accent: "#C5DEA7",        // 鼠尾草绿 - 清新辅助
    periwinkle: "#D3DEEA",    // 长春花蓝 - 宁静
    success: "#C5DEA7",
    error: "#E76F51",
    backgroundRoot: "#F7F5F1",  // 奶油色大背景
    backgroundDefault: "#FFFFFF",
    backgroundTertiary: "#F2EFEB",
    buttonPrimaryText: "#1A1A1A",
    tabIconSelected: "#1A1A1A",
    border: "rgba(26, 26, 26, 0.08)",
    borderLight: "rgba(26, 26, 26, 0.04)",
    cardPeach: "#FF9E7D",
    cardSage: "#C5DEA7",
    cardPeriwinkle: "#D3DEEA",
    cardDark: "#1A1A1A",
    navBg: "#FFFFFF",
  },
  dark: {
    textPrimary: "#1A1A1A",
    textSecondary: "rgba(26, 26, 26, 0.7)",
    textMuted: "rgba(26, 26, 26, 0.45)",
    primary: "#FF9E7D",
    accent: "#C5DEA7",
    periwinkle: "#D3DEEA",
    success: "#C5DEA7",
    error: "#E76F51",
    backgroundRoot: "#F7F5F1",
    backgroundDefault: "#FFFFFF",
    backgroundTertiary: "#F2EFEB",
    buttonPrimaryText: "#1A1A1A",
    tabIconSelected: "#1A1A1A",
    border: "rgba(26, 26, 26, 0.08)",
    borderLight: "rgba(26, 26, 26, 0.04)",
    cardPeach: "#FF9E7D",
    cardSage: "#C5DEA7",
    cardPeriwinkle: "#D3DEEA",
    cardDark: "#1A1A1A",
    navBg: "#FFFFFF",
  },
};

export const Spacing = {
  xs: 8,
  sm: 16,
  md: 24,
  lg: 32,
  xl: 48,
  "2xl": 24,
  "3xl": 32,
  "4xl": 40,
  "5xl": 48,
  "6xl": 64,
};

export const BorderRadius = {
  xs: 8,
  sm: 12,
  md: 24,
  lg: 32,
  xl: 32,
  "2xl": 32,
  "3xl": 32,
  "4xl": 32,
  full: 999,
};

export const Typography = {
  display: { fontSize: 112, lineHeight: 112, fontWeight: "200" as const, letterSpacing: -4 },
  displayLarge: { fontSize: 112, lineHeight: 112, fontWeight: "200" as const, letterSpacing: -2 },
  displayMedium: { fontSize: 48, lineHeight: 56, fontWeight: "200" as const },
  h1: { fontSize: 36, lineHeight: 40, fontWeight: "400" as const, letterSpacing: -0.5 },
  h2: { fontSize: 28, lineHeight: 34, fontWeight: "400" as const },
  h3: { fontSize: 24, lineHeight: 30, fontWeight: "400" as const },
  h4: { fontSize: 20, lineHeight: 26, fontWeight: "500" as const },
  title: { fontSize: 18, lineHeight: 24, fontWeight: "600" as const },
  body: { fontSize: 15, lineHeight: 22, fontWeight: "400" as const },
  bodyMedium: { fontSize: 15, lineHeight: 22, fontWeight: "500" as const },
  small: { fontSize: 14, lineHeight: 20, fontWeight: "400" as const },
  smallMedium: { fontSize: 14, lineHeight: 20, fontWeight: "500" as const },
  caption: { fontSize: 12, lineHeight: 16, fontWeight: "400" as const },
  captionMedium: { fontSize: 12, lineHeight: 16, fontWeight: "600" as const },
  label: { fontSize: 12, lineHeight: 16, fontWeight: "600" as const, letterSpacing: 1 },
  labelSmall: { fontSize: 11, lineHeight: 14, fontWeight: "600" as const, letterSpacing: 0.8 },
  labelTitle: { fontSize: 12, lineHeight: 16, fontWeight: "600" as const, letterSpacing: 1 },
  link: { fontSize: 15, lineHeight: 22, fontWeight: "400" as const },
  stat: { fontSize: 56, lineHeight: 60, fontWeight: "300" as const },
  tiny: { fontSize: 10, lineHeight: 14, fontWeight: "400" as const },
  navLabel: { fontSize: 12, lineHeight: 14, fontWeight: "600" as const, letterSpacing: 0.5 },
};

export type Theme = typeof Colors.light;
