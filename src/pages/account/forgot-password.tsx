import { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';

import { Box, Col, Row, Button, Input, Link, Text } from 'core/components';
import { accountService } from 'services/account';
import { useUIController } from 'context/UIControllerContext';

const formType = {
  forgotPassword: {
    title: 'Forgot Password',
    message: () => 'Enter the email address you used when you joined and we’ll send you instructions to reset your password.',
    textButton: 'Send reset link',
    textFooter: 'Remember your password?',
    linkTextFooter: 'Back to login'
  },
  emailSent: {
    title: 'Email Sent',
    message: (email) => `We sent an email to ${email} with a link to reset your password`,
    textButton: 'Continue visit store',
    linkTextFooter: '',
    textFooter: '',
  }
}

const ForgotPasswordPage = () => {
  const { dispatch } = useUIController();
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const [email, setEmail] = useState(null)
  const [currentForm, setCurrentForm] = useState('forgotPassword')
  const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email('Email is invalid')
    .required('Email is required'),
  });
  const { register, handleSubmit, setError, formState: { errors }, } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async ({ email }) => {
    setIsBtnLoading(true)
    setEmail(email)
    const { isLoading, status } = await accountService.forgotPassword({ email })
    setIsBtnLoading(isLoading)
    if (Number(status) === 401) {
      setError('email', {
        type: 'server',
        message: 'No profile found with that email.'
      })
      return
    }
    setCurrentForm('emailSent')
  }

  return (
    <Box
      form
      onSubmit={handleSubmit(onSubmit)}
      classes='px-6 pb-4 space-y-6 pt-4 lg:px-8 pb-6 xl:pb-8 mx-auto max-w-md'
    >
      <Text
        h1
        weight='medium'
        color='gray-900'
      >
        {formType[currentForm].title}
      </Text>
      <Text>{formType[currentForm].message(email)}</Text>
      <Col classes={currentForm === 'emailSent' ? 'hidden' : 'block'}>
        <Input
          name='email'
          type='email'
          label='Email'
          register={register}
          errors={errors}
        />
        <Button
          type='submit'
          width='full'
          size='lg'
          isLoading={isBtnLoading}
        >
          {formType[currentForm].textButton}
        </Button>
      </Col>
      <Link
        href='/'
        classes={currentForm === 'forgotPassword' ? 'hidden' : 'block'}
      >
        <Button
          type='submit'
          width='full'
          classes='mt-5'
          size='lg'
          isLoading={isBtnLoading}
        >
          {formType[currentForm].textButton}
        </Button>
      </Link>
      <Row
        classes={`text-sm font-medium text-gray-500 dark:text-gray-300 ${currentForm === 'emailSent' ? 'hidden' : ''}`}
      >
        <Text
          span
          classes='mr-2'
        >{formType[currentForm].textFooter}</Text>
        <Text
          as='button'
          span
          color='black'
          weight='medium'
          classes='hover:underline'
          // onClick={() => dispatch({ type: 'OPEN_ADDRESS_MODAL' })}
        >
          {formType[currentForm].linkTextFooter}
        </Text>
      </Row>
    </Box>
  );
}

export default ForgotPasswordPage;
