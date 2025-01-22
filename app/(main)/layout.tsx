import { AppSidebar } from "@/components/app-sidebar"
import Header from "@/components/custom/header/Header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

export default function MainLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
      <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <Header/>
        <main>
          <>{children}</>
        </main>
      </SidebarInset>
    </SidebarProvider>
    );
  }