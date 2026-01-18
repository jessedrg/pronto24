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
        <circle cx="12" cy="12" r="10" fill="#00B8A9" />
        <path
          d="M12 6V12L15 15"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {showText && (
        <span className={`font-bold ${text} ${textColor} tracking-tight`}>
          pronto<span className="text-[#00B8A9]">24</span>
        </span>
      )}
    </div>
  )
}
