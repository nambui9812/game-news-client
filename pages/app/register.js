import Head from 'next/head';
import Link from 'next/link';
import Cookies from 'cookies';
import { Form, Input, Button } from 'antd';

import MyLayout from '../../components/MyLayout';
import style from '../../styles/form.module.scss';

const Register = ({ auth }) => {
    const onFinish = (values) => {
        console.log('Success:', values);
    };

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 }
        }
    };

    const tailFormItemLayout = {
        wrapperCol: {
            xs: { span: 24, offset: 0 },
            sm: { span: 16, offset: 8 }
        }
    }

	return (
		<MyLayout auth={auth}>
			<Head>
				<title>Game News | Register</title>
			</Head>

			<div className={style.Register}>
				<Form
                    {...formItemLayout}
                    name="register-form"
                    onFinish={onFinish}
                    scrollToFirstError
                >
                    <h1>Register Form</h1>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email' },
                            { type: 'email', message: 'Please use correct email' }
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        hasFeedback
                        rules={[{ required: true, message: 'Please input your password' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item
                        name="confirmPassword"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                        {
                            required: true,
                            message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit" className={style.register_form_button}>
                            Register
                        </Button>
                        Or <Link href="/app/login"><a>login now!</a></Link>
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

export default Register;
