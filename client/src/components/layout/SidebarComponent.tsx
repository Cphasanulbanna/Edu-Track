import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { getSidebarData } from "@/common/selector";
import { SidebarItem } from "@/types/redux";
import { iconMap } from "@/constant/icons";

const SidebarComponent = () => {
  const sidebarData = useSelector(getSidebarData);

  const renderSidebarData = (item: SidebarItem) => {
    const Icon = iconMap[item.icon];
    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild>
          <NavLink
            className={({ isActive }) =>isActive ? "active": "" }
            to={item.url}
          >
            <Icon className="text-primary group-[.active]:text-white" />
            <span className="text-black font-semibold">{item.title}</span>
          </NavLink>
        </SidebarMenuButton>
      </SidebarMenuItem>
    );
  };

  return (
    <div>
      <SidebarProvider>
        <Sidebar collapsible="icon">
          <SidebarContent>
            <SidebarHeader>
              <SidebarTrigger />
            </SidebarHeader>
            <SidebarGroup>
              <SidebarGroupLabel>{sidebarData?.name} </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {sidebarData?.items.map((item: SidebarItem) => {
                    return renderSidebarData(item);
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
      </SidebarProvider>
    </div>
  );
};

export default SidebarComponent;
