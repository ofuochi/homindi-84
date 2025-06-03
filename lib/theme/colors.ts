// Central color configuration for the entire application
export const colors = {
  // Primary brand colors
  primary: {
    50: "#E8F5F0",
    100: "#D1EBE1",
    200: "#A3D7C3",
    300: "#75C3A5",
    400: "#47AF87",
    500: "#0B8457", // Main primary color
    600: "#096A46",
    700: "#074F35",
    800: "#053524",
    900: "#021A12",
    DEFAULT: "#0B8457",
  },

  // Secondary/accent colors
  secondary: {
    50: "#FEF7E8",
    100: "#FDEFD1",
    200: "#FBDFA3",
    300: "#F9CF75",
    400: "#F7BF47",
    500: "#F9A826", // Main secondary color
    600: "#E09620",
    700: "#C7841A",
    800: "#AE7214",
    900: "#95600E",
    DEFAULT: "#F9A826",
  },

  // Status colors
  success: {
    50: "#F0FDF4",
    100: "#DCFCE7",
    200: "#BBF7D0",
    300: "#86EFAC",
    400: "#4ADE80",
    500: "#22C55E",
    600: "#16A34A",
    700: "#15803D",
    800: "#166534",
    900: "#14532D",
    DEFAULT: "#22C55E",
  },

  warning: {
    50: "#FFFBEB",
    100: "#FEF3C7",
    200: "#FDE68A",
    300: "#FCD34D",
    400: "#FBBF24",
    500: "#F59E0B",
    600: "#D97706",
    700: "#B45309",
    800: "#92400E",
    900: "#78350F",
    DEFAULT: "#F59E0B",
  },

  error: {
    50: "#FEF2F2",
    100: "#FEE2E2",
    200: "#FECACA",
    300: "#FCA5A5",
    400: "#F87171",
    500: "#EF4444",
    600: "#DC2626",
    700: "#B91C1C",
    800: "#991B1B",
    900: "#7F1D1D",
    DEFAULT: "#EF4444",
  },

  info: {
    50: "#EFF6FF",
    100: "#DBEAFE",
    200: "#BFDBFE",
    300: "#93C5FD",
    400: "#60A5FA",
    500: "#3B82F6",
    600: "#2563EB",
    700: "#1D4ED8",
    800: "#1E40AF",
    900: "#1E3A8A",
    DEFAULT: "#3B82F6",
  },

  // Neutral colors
  gray: {
    50: "#F9FAFB",
    100: "#F3F4F6",
    200: "#E5E7EB",
    300: "#D1D5DB",
    400: "#9CA3AF",
    500: "#6B7280",
    600: "#4B5563",
    700: "#374151",
    800: "#1F2937",
    900: "#111827",
    DEFAULT: "#6B7280",
  },

  // Special colors
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",

  // Cart and notification specific colors
  cart: {
    badge: "#EF4444", // Prominent red for cart badge
    background: "#FEF2F2",
    border: "#FECACA",
  },

  notification: {
    badge: "#EF4444", // Red for notifications
    background: "#FEF2F2",
    border: "#FECACA",
  },

  // Background colors
  background: {
    primary: "#FFFFFF",
    secondary: "#F9FAFB",
    tertiary: "#F3F4F6",
    dark: "#1F2937",
  },

  // Text colors
  text: {
    primary: "#111827",
    secondary: "#6B7280",
    tertiary: "#9CA3AF",
    inverse: "#FFFFFF",
  },

  // Border colors
  border: {
    light: "#E5E7EB",
    medium: "#D1D5DB",
    dark: "#9CA3AF",
  },

  // Shadow colors
  shadow: {
    light: "rgba(0, 0, 0, 0.1)",
    medium: "rgba(0, 0, 0, 0.15)",
    dark: "rgba(0, 0, 0, 0.25)",
  },
} as const

// Color utility functions
export const getColorWithOpacity = (color: string, opacity: number): string => {
  return `${color}${Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0")}`
}

export const getGradient = (from: string, to: string, direction = "135deg"): string => {
  return `linear-gradient(${direction}, ${from} 0%, ${to} 100%)`
}

// Predefined gradients
export const gradients = {
  primary: getGradient(colors.primary[500], colors.primary[600]),
  secondary: getGradient(colors.secondary[500], colors.secondary[600]),
  success: getGradient(colors.success[500], colors.success[600]),
  error: getGradient(colors.error[500], colors.error[600]),
  primaryToSecondary: getGradient(colors.primary[500], colors.secondary[500]),
  darkPrimary: getGradient(colors.primary[600], colors.primary[700]),
} as const

export default colors
