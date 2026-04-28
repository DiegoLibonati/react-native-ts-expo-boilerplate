import { palette } from "@/styles/colors";

export const theme = {
  colors: {
    primary: palette.blue600,
    primaryLight: palette.blue100,
    primaryDark: palette.blue700,

    text: {
      primary: palette.gray900,
      secondary: palette.gray500,
      disabled: palette.gray400,
      inverse: palette.white,
      link: palette.blue600,
    },

    background: {
      screen: palette.white,
      card: palette.gray50,
      input: palette.gray100,
    },

    border: {
      default: palette.gray200,
    },

    status: {
      success: palette.green500,
      error: palette.red500,
      warning: palette.amber500,
    },
  },

  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },

  typography: {
    sizes: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 20,
      xl: 24,
      xxl: 28,
      xxxl: 32,
    },
    weights: {
      regular: "400" as const,
      medium: "500" as const,
      semibold: "600" as const,
      bold: "700" as const,
    },
  },

  radius: {
    sm: 4,
    md: 8,
    lg: 12,
    full: 9999,
  },
};
