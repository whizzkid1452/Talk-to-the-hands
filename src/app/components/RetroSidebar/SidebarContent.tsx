import React from "react";
import { SidebarHeader } from "./SidebarHeader";
import { SidebarProfile } from "./SidebarProfile";
import { SidebarMenu } from "./SidebarMenu";
import { SidebarCategories } from "./SidebarCategories";
import { SidebarFooter } from "./SidebarFooter";
import { SidebarContentProps } from "./types";

export function SidebarContent({ menuItems, onClose }: SidebarContentProps) {
  return (
    <div className="h-full flex flex-col overflow-x-hidden">
      <SidebarHeader />
      <SidebarProfile />
      <SidebarMenu 
        menuItems={menuItems} 
        onItemClick={onClose} 
      />
      <SidebarCategories />
      <SidebarFooter />
    </div>
  );
}