import { Text, Link, Box, Col } from 'core/components';
import { PATH } from "config/const";
import UserAuthForm from "components/pages/account/UserAuthForm";
import AuthLayout from 'components/layout/AuthLayout';

export default function LoginPage() {
  return (
    <AuthLayout>
      <Box classes='text-center mb-5'>
        <Text
          h3
          transforms='uppercase'
          classes='mb-4 tracking-[.17em]'
        >Login</Text>
        <Text classes='text-sm'>Please enter your e-mail and password:</Text>
      </Box>

      <UserAuthForm/>

      <Col
        gap={4}
        justify='center'
        classes='text-center'
      >
        <Link
          href={PATH.ACCOUNT.FORGOT_PASSWORD}
          // classes='text-primary-gray'>
          underline
          classes='text-sm text-[#b5b5b8] mb-8 mt-4 hover:text-primary-black'
        >
          Forgot Password?
        </Link>

        <Text
          span
          classes='mr-1 text-primary-gray text-base'
        >Don&apos;t have an account?</Text>

        <Link
          href={PATH.ACCOUNT.REGISTER}
          classes='hover:decoration-black px-6 py-3 rounded-lg text-[15px]
          bg-white text-[#6f6f73] drop-shadow font-bold
          hover:opacity-80
          '
        >
          Create new account
        </Link>
      </Col>
    </AuthLayout>
  );
}
