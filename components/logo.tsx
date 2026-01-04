interface LogoProps {
  variant?: "default" | "light" | "dark"
  size?: "sm" | "md" | "lg"
  showText?: boolean
}

export function Logo({ variant = "default", size = "md", showText = true }: LogoProps) {
  const sizes = {
    sm: { icon: 20, text: "text-sm", gap: "gap-1.5" },
    md: { icon: 24, text: "text-base", gap: "gap-2" },
    lg: { icon: 32, text: "text-lg", gap: "gap-2.5" },
  }

  const textColors = {
    default: "text-foreground",
    light: "text-white",
    dark: "text-foreground",
  }

  const { icon, text, gap } = sizes[size]
  const textColor = textColors[variant]

  return (
    <div className={`flex items-center ${gap}`}>
      <svg
        width={icon}
        height={icon}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0"
      >
        <path
          d="M13 2L4 14H11L10 22L20 10H13L13 2Z"
          fill="#FF4D00"
          stroke="#FF4D00"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {showText && (
        <span className={`font-bold ${text} ${textColor} tracking-tight`}>
          rapid<span className="text-[#FF4D00]">fix</span>
        </span>
      )}
    </div>
  )
}
