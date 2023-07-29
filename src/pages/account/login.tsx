import { Text, Link, Box, Col, Button } from 'core/components';
import { PATH } from "config/const";
import UserAuthForm from "components/pages/account/user-auth-form";
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
          underline
          classes='text-sm text-primary-gray my-4'
        >
          Forgot Password?
        </Link>

        <Text
          span
          classes='mr-1 text-primary-gray text-base'
        >Don&apos;t have an account?</Text>
        <Link href={PATH.ACCOUNT.REGISTER}>
          <Button
            variant={'secondary'}
            type='submit'
            width='full'
            size='md'
            text='Login to your account'
            classes={'text-[#6f6f73]'}
          >
              Create new account
          </Button>
        </Link>


      </Col>
    </AuthLayout>
  );
}
