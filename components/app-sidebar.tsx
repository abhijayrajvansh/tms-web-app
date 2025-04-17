'use client';

import * as React from 'react';
import { IconInnerShadowTop } from '@tabler/icons-react';

import { UserNavDocuments } from '@/components/nav-documents';
import { AdminNavPanel } from '@/components/nav-main';
import { ControlNavPanel } from '@/components/nav-secondary';
import { UserNavProfile } from '@/components/nav-user';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="data-[slot=sidebar-menu-button]:!p-1.5">
              <a href="#">
                <IconInnerShadowTop className="!size-5" />
                <span className="text-base font-semibold">Acme Inc.</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <AdminNavPanel />
        <UserNavDocuments />
        <ControlNavPanel className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <UserNavProfile />
      </SidebarFooter>
    </Sidebar>
  );
}
