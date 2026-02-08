import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="bg-muted/40 border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <ol className="flex items-center gap-1.5 py-3 text-sm overflow-x-auto" itemScope itemType="https://schema.org/BreadcrumbList">
          <li className="flex items-center shrink-0" itemProp="itemListElement" itemScope itemType="https://schema.org/ListItem">
            <Link
              href="/"
              className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              itemProp="item"
            >
              <Home className="w-3.5 h-3.5" />
              <span itemProp="name" className="sr-only">Inicio</span>
            </Link>
            <meta itemProp="position" content="1" />
          </li>
          {items.map((item, i) => (
            <li
              key={i}
              className="flex items-center gap-1.5 shrink-0"
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
              {item.href ? (
                <Link
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap"
                  itemProp="item"
                >
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <span className="text-foreground font-medium whitespace-nowrap" itemProp="name">
                  {item.label}
                </span>
              )}
              <meta itemProp="position" content={String(i + 2)} />
            </li>
          ))}
        </ol>
      </div>
    </nav>
  )
}
