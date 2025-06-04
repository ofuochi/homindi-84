"use client";
import {
  Form,
  Input,
  Button,
  Card,
  Typography,
  Divider,
  message,
  Select,
} from "antd";
import {
  GoogleOutlined,
  MailOutlined,
  LockOutlined,
  UserOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { COUNTRIES } from "@/lib/constants";

const { Title, Text } = Typography;
const { Option } = Select;

export default function RegisterPage() {
  const { register, isLoading } = useAuthStore();
  const router = useRouter();

  const onFinish = async (values: any) => {
    try {
      await register(values);
      message.success("Account created successfully!");
      router.push("/dashboard");
    } catch (error) {
      message.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-md mx-auto px-4 py-16">
        <Card className="shadow-lg">
          <div className="text-center mb-8">
            <Title level={2} className="mb-2">
              Join Homindi
            </Title>
            <Text type="secondary">Create your account to start shopping</Text>
          </div>

          <Form
            name="register"
            onFinish={onFinish}
            layout="vertical"
            size="large"
          >
            <Form.Item
              name="name"
              label="Full Name"
              rules={[
                { required: true, message: "Please input your full name!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Enter your full name"
              />
            </Form.Item>

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
              name="phone"
              label="Phone Number"
              rules={[
                { required: true, message: "Please input your phone number!" },
              ]}
            >
              <Input
                prefix={<PhoneOutlined />}
                placeholder="Enter your phone number"
              />
            </Form.Item>

            <Form.Item
              name="preferredCountry"
              label="Country"
              rules={[
                { required: true, message: "Please select your country!" },
              ]}
            >
              <Select placeholder="Select your country">
                {COUNTRIES.map((country) => (
                  <Option key={country} value={country}>
                    {country}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name="password"
              label="Password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Create a password"
              />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Confirm Password"
              dependencies={["password"]}
              rules={[
                { required: true, message: "Please confirm your password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match!"));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm your password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                block
                loading={isLoading}
              >
                Create Account
              </Button>
            </Form.Item>
          </Form>

          <Divider>Or</Divider>

          <Button icon={<GoogleOutlined />} size="large" block className="mb-4">
            Continue with Google
          </Button>

          <div className="text-center">
            <Text type="secondary">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#0B8457] hover:text-[#0a7249]"
              >
                Sign in here
              </Link>
            </Text>
          </div>
        </Card>
      </div>

    </div>
  );
}
