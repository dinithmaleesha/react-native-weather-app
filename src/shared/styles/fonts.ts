export const Fonts = {
    NunitoBold: "Nunito-Bold",
    NunitoItalic: "Nunito-Italic",
    NunitoLight: "Nunito-Light",
    NunitoRegular: "Nunito-Regular"
} as const

export type FontName = keyof typeof Fonts