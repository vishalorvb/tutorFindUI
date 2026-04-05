// ─── Centralized Theme Configuration ───
// Change these values to update colors across the entire app.

export const colors = {
  // Primary brand
  primary: "#7c3aed",        // violet-600
  primaryDark: "#6d28d9",    // violet-700
  primaryLight: "#8b5cf6",   // violet-500
  primaryLighter: "#a78bfa",  // violet-400
  primaryLightest: "#c4b5fd", // violet-300

  // Secondary brand
  secondary: "#4f46e5",      // indigo-600
  secondaryLight: "#6366f1",  // indigo-500
  secondaryLighter: "#818cf8", // indigo-400

  // Gold / Accent
  gold: "#f59e0b",           // amber-500
  goldLight: "#fbbf24",      // amber-400
  orange: "#f97316",         // orange-500

  // Success
  success: "#059669",        // emerald-600
  successLight: "#10b981",   // emerald-500

  // Info
  sky: "#0ea5e9",            // sky-500
  skyDark: "#0284c7",        // sky-600

  // Accent
  pink: "#ec4899",           // pink-500
  pinkDark: "#db2777",       // pink-600
  red: "#ef4444",            // red-500

  // WhatsApp
  whatsapp: "#25d366",
  whatsappDark: "#128c7e",

  // Dark backgrounds
  navy: "#0f172a",
  navyMid: "#1e293b",
  darkBg1: "#0f0c29",
  darkBg2: "#1a1060",
  darkBg3: "#24243e",

  // Light backgrounds
  lightPurple: "#f8f7ff",
  lightBlue: "#f0f4ff",
} as const;

// ─── Gradients ───
export const gradients = {
  primary: `linear-gradient(135deg, ${colors.primary} 0%, ${colors.secondary} 50%, ${colors.primaryDark} 100%)`,
  gold: `linear-gradient(135deg, ${colors.goldLight}, ${colors.orange})`,
  success: `linear-gradient(135deg, ${colors.success}, ${colors.successLight})`,
  darkBg: `linear-gradient(135deg, ${colors.darkBg1} 0%, ${colors.darkBg2} 40%, ${colors.darkBg3} 100%)`,
} as const;

// ─── Shadows ───
export const shadows = {
  primaryButton: `0 8px 24px rgba(124,58,237,0.35)`,
  primaryGlow: `0 0 40px rgba(124,58,237,0.3)`,
} as const;

// ─── Opacity helpers (for badges, overlays, etc.) ───
export function withAlpha(hex: string, alpha: number): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}
