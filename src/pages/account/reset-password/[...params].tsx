import * as Yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { accountService, useCheckToken } from 'services/account';
import { Col, Button, Input, Link, Text, Box, Loading, Row } from 'core/components';
import { PATH } from "config/const";
import AuthLayout from 'components/layout/AuthLayout';
import { resetPasswordSchema } from "lib/validation/password";
import ErrorServer from "components/common/ErrorServer";

const formType = {
  resetPassword: {
    title: 'Reset Password',
    message: 'Please create a new password that you don\'t use on any other sites\n',
    textButton: 'Reset',
  },
  passwordChanged: {
    title: 'Password changed',
    message: 'Your password has been successfully changed',
    textButton: 'Continue visit store',
  },
}

type FormData = Yup.InferType<typeof resetPasswordSchema>

export default function ResetPasswordPage() {

  const router = useRouter();
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const [currentForm, setCurrentForm] = useState('resetPassword')
  const [errorServer, setErrorServer] = useState('')

  const [token, id] = router.query.params || []
  const { isLoading, isError } = useCheckToken(router.query?.params && { token, id })

  const onSubmit = async ({ newPassword }) => {
    setIsBtnLoading(true)
    const {
      isLoading: isLoadingResetPassword,
      message,
      status: statusResetPassword
    } = await accountService.resetPassword({
      password: newPassword,
      id,
      token
    })
    setIsBtnLoading(isLoadingResetPassword)

    switch (statusResetPassword) {
      case 200:
        setCurrentForm('passwordChanged')
        break
      default:
        setErrorServer(message)
    }
  }

  const {
    register, handleSubmit, setError,
    formState: { errors },
  } = useForm<FormData>({ resolver: yupResolver(resetPasswordSchema) });

  if (isLoading) {
    return (
      <AuthLayout>
        <Row justify='center' classes='my-4'>
          <Loading classes='h-10 w-10 fill-black'/>
        </Row>
      </AuthLayout>
    )
  }

  if (isError) {
    return (
      <AuthLayout>
        <Text
          h1
          transforms='uppercase'
          classes='mb-4 text-xl tracking-[.17em]'
        >
          Invalid or Expired reset link
        </Text>
        <Text>
          The email link you clicked is invalid or has expired. Please make sure you&apos;re using the password reset
          link from the most recent email.
        </Text>
        <Link href={PATH.ACCOUNT.FORGOT_PASSWORD}>
          <Button
            type='submit'
            width='full'
            size='md'
          >
            Forgot Password
          </Button>
        </Link>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <Text
        h1
        transforms='uppercase'
        classes='mb-4 text-xl tracking-[.17em]'
      >
        {formType[currentForm].title}
      </Text>
      <Text>
        {formType[currentForm].message}
      </Text>
      <ErrorServer
        message={errorServer}
        onClick={() => setErrorServer('')}
      />
      <Box
        form
        onSubmit={handleSubmit(onSubmit)}
        classes='space-y-4'
      >
        <Col classes={currentForm === 'passwordChanged' ? 'hidden' : 'block'}>
          <Input
            name='newPassword'
            type='password'
            label='New Password'
            register={register}
            helperText={errors?.newPassword?.message}
          />
          <Input
            name='confirmPassword'
            type='password'
            label='Confirm New Password'
            register={register}
            helperText={errors?.confirmPassword?.message}
          />
          <Button
            type='submit'
            width='full'
            classes='mt-5'
            size='md'
            isLoading={isBtnLoading}
          >
            {formType[currentForm].textButton}
          </Button>
        </Col>
        <Link
          href={PATH.DEFAULT}
          classes={currentForm === 'resetPassword' ? 'hidden' : 'block'}
        >
          <Button
            type='submit'
            width='full'
            size='md'
            isLoading={isBtnLoading}
          >
            {formType[currentForm].textButton}
          </Button>
        </Link>
      </Box>
    </AuthLayout>
  );
}
