import React from "react"
import type { FormProps } from "antd"
import { Button, Checkbox, Form, Input } from "antd"
import { useAuth } from "@/hooks/useAuth"
import { Alert } from "antd"

export type LoginForm = {
	username: string
	password: string
}

const LoginForm = () => {
	const { login, authError } = useAuth()

	const onFinish: FormProps<LoginForm>["onFinish"] = (values) => {
		login(values)
	}

	return (
		<div>
			<Form
				name="basic"
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				style={{ maxWidth: 500 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
				autoComplete="off"
			>
				<Form.Item<LoginForm>
					label="Username"
					name="username"
					rules={[{ required: true, message: "Please input your username!" }]}
				>
					<Input />
				</Form.Item>

				<Form.Item<LoginForm>
					label="Password"
					name="password"
					rules={[{ required: true, message: "Please input your password!" }]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type="primary" htmlType="submit">
						Submit
					</Button>
				</Form.Item>
			</Form>
			{authError && <Alert message={authError} type="error" />}
		</div>
	)
}

export default LoginForm
