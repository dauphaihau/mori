import { Text, Link, Box, Row } from 'core/components';
import { PATH } from "config/const";
import UserRegisterForm from "components/pages/account/user-register-form";

export default function RegisterPage() {
  return (
    <Box
      classes='h-[90vh] max-w-[414px] m-auto px-6 pb-4 space-y-4 pt-4
       lg:px-8 pb-6 xl:pb-8 subscribe-letter-bg
      flex flex-col justify-center'
    >
      <Box classes='text-center'>
        <Text
          h1
          transforms='uppercase'
          classes='mb-4 text-xl tracking-[.17em]'
        >Register</Text>
        <Text
          classes='text-sm'
        >Please fill in the information below:</Text>
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
    </Box>
  );
}
