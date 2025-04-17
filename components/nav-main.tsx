'use client';

import { type Icon } from '@tabler/icons-react';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import {
  IconCamera,
  IconChartBar,
  IconDashboard,
  IconDatabase,
  IconFileAi,
  IconFileDescription,
  IconFileWord,
  IconFolder,
  IconHelp,
  IconInnerShadowTop,
  IconListDetails,
  IconReport,
  IconSearch,
  IconSettings,
  IconUsers,
} from '@tabler/icons-react';
import { useRouter, usePathname } from 'next/navigation';

const navMain = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: IconDashboard,
  },
  {
    title: 'Team',
    url: '/teams',
    icon: IconUsers,
  },
  {
    title: 'Lifecycle',
    url: '#',
    icon: IconListDetails,
  },
  {
    title: 'Analytics',
    url: '#',
    icon: IconChartBar,
  },
  {
    title: 'Projects',
    url: '#',
    icon: IconFolder,
  },
];

export function AdminNavPanel() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Admin Panel</SidebarGroupLabel>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {navMain.map((item) => (
            <SidebarMenuItem
              key={item.title}
              onClick={(e) => {
                e.preventDefault();
                router.push(item.url);
              }}
              data-active={pathname === item.url}
              className={pathname === item.url ? 'bg-sidebar-primary/30 rounded' : ''}
            >
              <SidebarMenuButton tooltip={item.title} className='hover:bg-primary/40'>
                {item.icon && <item.icon />}
                <span>{item.title}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
