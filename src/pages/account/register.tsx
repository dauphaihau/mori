import { Text, Link, Box, Row } from 'core/components';
import { PATH } from "config/const";
import UserRegisterForm from "components/pages/account/user-register-form";
import AuthLayout from 'components/layout/AuthLayout';

export default function RegisterPage() {
  return (
    <AuthLayout>
      <Box classes='text-center'>
        <Text
          h3
          transforms='uppercase'
          classes='mb-4 tracking-[.17em]'
        >Register</Text>
        <Text classes='text-sm'>Please fill in the information below:</Text>
      </Box>

      <UserRegisterForm/>

      <Row
        justify='center'
        classes='text-base'
      >
        <Text
          span
          classes='mr-1 text-primary-gray'
        >Already have an account?</Text>
        <Link
          href={PATH.ACCOUNT.LOGIN}
          classes='hover:underline hover:decoration-black'
          text='Login'
        />
      </Row>
    </AuthLayout>
  );
}
