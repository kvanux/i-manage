'use client'

import React from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar'
import { Separator } from '@/components/ui/separator'
import { NavRoutes } from '@/lib/utils'
import { usePathname } from 'next/navigation'

export default function Header() {
    const pathName = usePathname();

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b border-b-neutral-200">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h2 className='text-lg text-neutral-800 font-medium'>{NavRoutes.find((nav) => pathName === nav.url)?.title}</h2>
          </div>
        </header>
    )
}