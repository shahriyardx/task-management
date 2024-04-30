import LoginForm from "@/components/LoginForm"
import { Flex } from "antd"
import React from "react"

const Home = () => (
	<div className="App">
		<div
			className="container"
			style={{
				paddingBlock: "20px",
			}}
		>
			<h2 style={{ fontSize: "40px", fontWeight: "bold", textAlign: "center" }}>
				Task Management Login
			</h2>
		</div>

		<div
			style={{
				width: "100%",
				marginTop: "100px",
				padding: "0",
				marginInline: "auto",
        maxWidth: '600px'
			}}
		>
			<LoginForm />
		</div>
	</div>
)

export default Home
