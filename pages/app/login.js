import Head from 'next/head';
import Link from 'next/link';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import style from '../../styles/form.module.scss';

const Login = () => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

	return (
		<>
			<Head>
				<title>Game News | Login</title>
			</Head>

			<div className={style.Login}>
				<Form
                    name="login-form"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <h1>Login Form</h1>

                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your username' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>
                        <Link href="/app/forget"><a className={style.login_form_forgot}>Forgot password</a></Link>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className={style.login_form_button}>
                            Log in
                        </Button>
                        Or <Link href="/app/register"><a>register now!</a></Link>
                    </Form.Item>
                </Form>
			</div>
		</>
	);
};

export default Login;
