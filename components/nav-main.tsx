"use client"

import { type LucideIcon } from "lucide-react"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
  }[]
}) {
  const pathName = usePathname();
  // const current = data.navMain.find((nav) => nav.url === pathName);
  //   if (current)
  //   {
  //     console.log(current);
  //     current.isActive = true;    
  //   }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
            <SidebarMenuItem key={item.title}>
                <a href={item.url}>
                  <SidebarMenuButton tooltip={item.title} isActive={item.isActive} className={`${(item.url === pathName) && "bg-neutral-200 font-semibold"}`}>
                    {item.icon && <item.icon />}
                      <span>{item.title}</span>
                  </SidebarMenuButton>
                </a>
            </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
