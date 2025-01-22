import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import * as Lucide from "lucide-react"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const NavRoutes = [
  {
    title: "Dashboard",
    url: "/",
    icon: Lucide.LayoutDashboard,
    isActive: false,
  },
  {
    title: "Finance",
    url: "/finance",
    icon: Lucide.Banknote,
    isActive: false,
  },
  {
    title: "Product",
    url: "/product",
    icon: Lucide.Package,
    isActive: false,
  },
  {
    title: "Sales",
    url: "/sales",
    icon: Lucide.ChartNoAxesCombined,
    isActive: false,
  },
  {
    title: "Customer",
    url: "/customer",
    icon: Lucide.NotebookTabs,
    isActive: false,
  },
  {
    title: "Marketing",
    url: "/marketing",
    icon: Lucide.Megaphone,
    isActive: false,
  },
  {
    title: "Procurement",
    url: "/procurement",
    icon: Lucide.ReceiptText,
    isActive: false,
  },
  {
    title: "Employee",
    url: "/employee",
    icon: Lucide.Users,
    isActive: false,
  },
]