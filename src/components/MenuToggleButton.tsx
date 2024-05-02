import { useSidebarState } from "@/states/sidebar";
import { Button } from "antd";
import React from "react";
import { MenuOutlined } from "@ant-design/icons";

const MenuToggleButton = () => {
  const { toggle } = useSidebarState();
  return (
    <Button onClick={() => toggle()} className="md:hidden">
      <MenuOutlined />
    </Button>
  );
};

export default MenuToggleButton;
