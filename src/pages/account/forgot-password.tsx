import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { Box, Col, Row, Button, Input, Link, Text } from 'core/components';
import { accountService } from 'services/account';
import { userAuthSchema } from "lib/validation/auth";
import { PATH } from 'config/const';
import AuthLayout from "components/layout/AuthLayout";
import ErrorServer from "components/common/ErrorServer";

type FormData = Pick<Yup.InferType<typeof userAuthSchema>, 'email'>

const formType = {
  forgotPassword: {
    title: 'Forgot Password',
    message: () => 'Enter the email address you used when you joined and we’ll send you instructions to reset your password.',
    textButton: 'Send reset link',
    textFooter: 'Remember your password?',
    linkTextFooter: 'Back to login'
  },
  emailSent: {
    title: 'Forgot Password',
    message: (email) => `We sent an email to ${email} with a link to reset your password`,
    textButton: 'Continue visit store',
    linkTextFooter: '',
    textFooter: '',
  }
}

const validationSchema = Yup.object().shape({
  email: Yup.string()
  .email('Email is invalid')
});

const ForgotPasswordPage = () => {
  const [errorServer, setErrorServer] = useState('')
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const [email, setEmail] = useState(null)
  const [currentForm, setCurrentForm] = useState('forgotPassword')

  const { register, handleSubmit, setError, formState: { errors }, } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async ({ email }) => {
    setIsBtnLoading(true)
    setEmail(email)
    const { isLoading, status, message } = await accountService.forgotPassword({ email })
    setIsBtnLoading(isLoading)

    switch (status) {
      case 200:
        setCurrentForm('emailSent')
        setErrorServer('')
        break
      case 401:
        setError('email', {
          type: 'server',
          message
        });
        setErrorServer(message)
        break
      default:
        setErrorServer(message)
    }
  }

  return (
    <AuthLayout>
      <Box classes='mb-5'>
        <Text
          h1
          transforms='uppercase'
          classes='mb-4 text-xl tracking-[.17em]'
        >{formType[currentForm].title}</Text>
        <Text>{formType[currentForm].message(email)}</Text>
      </Box>

      <Box
        form
        onSubmit={handleSubmit(onSubmit)}
        classes='space-y-4'
      >
        <ErrorServer
          message={errorServer}
          onClick={() => setErrorServer('')}
        />
        <Col classes={currentForm === 'emailSent' ? 'hidden' : 'block'}>
          <Input
            name='email'
            type='email'
            label='Email'
            register={register}
            helperText={errors?.email?.message}
          />
          <Button
            type='submit'
            // classes='mt-5 w-[calc(100%-2rem)]'
            classes='mt-5'
            size='lg'
            width='full'
            isLoading={isBtnLoading}
          >
            {formType[currentForm].textButton}
          </Button>
        </Col>

        <Link
          href={PATH.HOME}
          classes={currentForm === 'forgotPassword' ? 'hidden' : ''}
        >
          <Button
            type='submit'
            width='full'
            // classes='mt-5 w-[calc(100%-2rem)]'
            classes='mt-5'
            size='lg'
            isLoading={isBtnLoading}
          >
            {formType[currentForm].textButton}
          </Button>
        </Link>
      </Box>

      <Row
        classes={[
          'text-sm font-medium text-gray-500 dark:text-gray-300',
          { 'hidden': currentForm === 'emailSent' }
        ]}
      >
        <Text span classes='mr-2'>{formType[currentForm].textFooter}</Text>
        <Link underline href={PATH.ACCOUNT.LOGIN}>
          {formType[currentForm].linkTextFooter}
        </Link>
      </Row>
    </AuthLayout>
  );
}

export default ForgotPasswordPage;
