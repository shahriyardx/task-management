import React from "react"
import { DashboardOutlined, OrderedListOutlined, BarChartOutlined, UsergroupAddOutlined } from "@ant-design/icons"
import type { MenuProps } from "antd"
import { Menu } from "antd"
import { useRouter } from "next/router"

type MenuItem = Required<MenuProps>["items"][number]

const items: MenuItem[] = [
	{
		key: "members",
		label: "Members",
		icon: <UsergroupAddOutlined />,
	},
	{
		key: "tasks",
		label: "Tasks",
		icon: <OrderedListOutlined />,
	},
	{
		key: "activities",
		label: "Activities",
		icon: <BarChartOutlined />,
	},
]

const Sidebar = () => {
	const router = useRouter()
	const onClick: MenuProps["onClick"] = (e) => {
		const projectId = router.query.projectId
		router.push(`/dashboard/projects/${projectId}/${e.key}`)
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
