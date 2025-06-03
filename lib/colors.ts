// Central color configuration for the entire application
export const colors = {
  // Primary brand colors
  primary: {
    50: "#E8F5F0",
    100: "#D1EBE1",
    200: "#A3D7C3",
    300: "#75C3A5",
    400: "#47AF87",
    500: "#0B8457", // Main primary
    600: "#096A46",
    700: "#074F35",
    800: "#053524",
    900: "#021A12",
    DEFAULT: "#0B8457",
  },

  // Accent colors
  accent: {
    50: "#FEF7E8",
    100: "#FDEFD1",
    200: "#FBDFA3",
    300: "#F9CF75",
    400: "#F7BF47",
    500: "#F9A826", // Main accent
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

  // Cart badge - prominent red for visibility
  cart: {
    badge: "#DC2626", // Bright red for cart notifications
    badgeHover: "#B91C1C",
  },

  // Notification colors
  notification: {
    badge: "#EF4444", // Red for notifications
    badgeHover: "#DC2626",
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
    950: "#030712",
  },

  // Background colors
  background: {
    primary: "#FFFFFF",
    secondary: "#F9FAFB",
    tertiary: "#F3F4F6",
    dark: "#1F2937",
    darker: "#111827",
  },

  // Text colors
  text: {
    primary: "#111827",
    secondary: "#6B7280",
    tertiary: "#9CA3AF",
    inverse: "#FFFFFF",
    muted: "#6B7280",
  },

  // Border colors
  border: {
    light: "#E5E7EB",
    medium: "#D1D5DB",
    dark: "#9CA3AF",
  },

  // Gradient definitions
  gradients: {
    primary: "linear-gradient(135deg, #0B8457 0%, #0a7249 100%)",
    accent: "linear-gradient(135deg, #F9A826 0%, #e09620 100%)",
    hero: "linear-gradient(135deg, #0B8457 0%, #0a7249 100%)",
    card: "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%)",
  },

  // Shadow definitions
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    primary: "0 4px 6px -1px rgba(11, 132, 87, 0.1), 0 2px 4px -1px rgba(11, 132, 87, 0.06)",
    accent: "0 4px 6px -1px rgba(249, 168, 38, 0.1), 0 2px 4px -1px rgba(249, 168, 38, 0.06)",
  },
} as const

// Export individual color palettes for easier access
export const primaryColors = colors.primary
export const accentColors = colors.accent
export const grayColors = colors.gray
export const statusColors = {
  success: colors.success,
  warning: colors.warning,
  error: colors.error,
}

// Helper function to get color with opacity
export const withOpacity = (color: string, opacity: number) => {
  return `${color}${Math.round(opacity * 255)
    .toString(16)
    .padStart(2, "0")}`
}

// CSS custom properties for dynamic theming
export const cssVariables = {
  "--color-primary": colors.primary.DEFAULT,
  "--color-primary-50": colors.primary[50],
  "--color-primary-100": colors.primary[100],
  "--color-primary-500": colors.primary[500],
  "--color-primary-600": colors.primary[600],
  "--color-primary-700": colors.primary[700],
  "--color-accent": colors.accent.DEFAULT,
  "--color-accent-500": colors.accent[500],
  "--color-accent-600": colors.accent[600],
  "--color-success": colors.success.DEFAULT,
  "--color-warning": colors.warning.DEFAULT,
  "--color-error": colors.error.DEFAULT,
  "--color-cart-badge": colors.cart.badge,
  "--color-notification-badge": colors.notification.badge,
  "--gradient-primary": colors.gradients.primary,
  "--gradient-accent": colors.gradients.accent,
  "--gradient-hero": colors.gradients.hero,
  "--shadow-primary": colors.shadows.primary,
  "--shadow-accent": colors.shadows.accent,
}
