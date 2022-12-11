import { Text, Link, Box, Row } from 'core/components';
import Const from "config/const";
import UserAuthForm from "components/pages/account/user-auth-form";
import { Fragment } from "react";
import { Menu } from '@headlessui/react';


const links = [
  { href: '/account-settings', label: 'Account settings' },
  { href: '/support', label: 'Support' },
  { href: '/license', label: 'License' },
  { href: '/sign-out', label: 'Sign out' },
]

export default function LoginPage() {
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
        >Login</Text>
        <Text classes='text-sm'>Please enter your e-mail and password:</Text>
      </Box>



      <UserAuthForm/>
      <Row
        justify='center'
        classes='text-sm font-medium text-gray-500 dark:text-gray-300'
      >
        <Text
          span
          classes='mr-1 text-primary-gray'
        >Don&apos;t have an account?</Text>

        <Link
          href={Const.PATH.ACCOUNT.REGISTER}
          classes='hover:underline hover:decoration-black'
        >Create one</Link>
      </Row>
    </Box>
  );
}
