import React from "react"
import { DashboardOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Menu } from "antd"

type MenuItem = Required<MenuProps>["items"][number]

const items: MenuItem[] = [
	{
		key: "/dashboard",
		label: "Dashboard",
		icon: <DashboardOutlined />,
	},
]

const Sidebar = () => {
	const onClick: MenuProps["onClick"] = (e) => {
		console.log("click ", e)
	}

	return (
		<Menu
			onClick={onClick}
			defaultOpenKeys={["sub1"]}
			mode="inline"
			items={items}
			className="h-screen"
		/>
	)
}

export default Sidebar
