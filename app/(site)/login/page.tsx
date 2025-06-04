"use client";
import { Form, Input, Button, Card, Typography, Divider, message } from "antd";
import { GoogleOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

const { Title, Text } = Typography;

export default function LoginPage() {
  const { login, isLoading } = useAuthStore();
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      await login(values.email, values.password);
      message.success("Login successful!");
      router.push("/dashboard");
    } catch (error) {
      message.error("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-16">
        <Card className="shadow-lg">
          <div className="text-center mb-8">
            <Title level={2} className="mb-2">
              Welcome Back
            </Title>
            <Text type="secondary">Sign in to your Homindi account</Text>
          </div>

          <Form name="login" onFinish={onFinish} layout="vertical" size="large">
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: "Please input your email!" },
                { type: "email", message: "Please enter a valid email!" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="Enter your email" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Enter your password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isLoading}
              >
                Login
              </Button>
            </Form.Item>
          </Form>

          <Divider>Or</Divider>

          <Button icon={<GoogleOutlined />} size="large" block className="mb-4">
            Continue with Google
          </Button>

          <div className="text-center">
            <Text type="secondary">
              Don't have an account?{" "}
              <Link
                href="/register"
                className="text-[#0B8457] hover:text-[#0a7249]"
              >
                Sign up here
              </Link>
            </Text>
          </div>
        </Card>
      </div>
    </div>
  );
}
