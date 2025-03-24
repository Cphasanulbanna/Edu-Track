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
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getSidebarData } from "@/common/selector";
import { SidebarItem } from "@/types/redux";
import { iconMap } from "./constant";


const SidebarComponent = () => {
  const sidebarData = useSelector(getSidebarData);

  const renderSidebarData = (item: SidebarItem) => {
    const Icon= iconMap[item.icon]
    return (
      <SidebarMenuItem key={item.title}>
        <SidebarMenuButton asChild>
          <Link to={item.url}>
            <Icon />
            <span className="text-black">{item.title}</span>
          </Link>
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
                    return renderSidebarData(item)
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
