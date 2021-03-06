import Head from 'next/head';
import Link from 'next/link';
import axios from 'axios';
import Cookies from 'cookies';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import MyLayout from '../../components/MyLayout';
import style from '../../styles/form.module.scss';

const Login = ({ auth }) => {
    const onFinish = async (values) => {
        try {
            const response = await axios.post(
                '/api/v1/users/login',
                JSON.stringify({
                    username: values.username,
                    password: values.password
                }),
                {
                    headers: { 'content-type': 'application/json' }
                }
            );

            console.log(response);
        }
        catch(err) {
            console.log(err.response.data);
        }
    };

	return (
		<MyLayout auth={auth}>
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
		</MyLayout>
	);
};

export async function getServerSideProps({ req, res }) {
    const cookies = new Cookies(req, res);
    const authToken = cookies.get('auth-token');

    if (authToken) {
        return {
            props: { auth: true },
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
  
    return { props: { auth: false } };
};

export default Login;
