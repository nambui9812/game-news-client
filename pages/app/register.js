import Head from 'next/head';
import Link from 'next/link';
import { Form, Input, Button } from 'antd';

import style from '../../styles/form.module.scss';

const Register = () => {
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
		<>
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
		</>
	);
};

export default Register;
