import * as Yup from 'yup';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { accountService } from 'services/account';
import { Col, Button, Input, Link, Text, Box } from 'core/components';
import { PATH } from "config/const";

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
    // textButton: 'Log in',
  }
}

const ResetPasswordPage = () => {

  const router = useRouter();
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const [currentForm, setCurrentForm] = useState('resetPassword')
  const { id, token } = router.query;

  const validationSchema = Yup.object().shape({
    newPassword: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
    confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
    .required('Confirm Password is required'),
  });

  const onSubmit = async ({ newPassword }) => {
    setIsBtnLoading(true)
    const { isLoading } = await accountService.updatePassword({ password: newPassword, userId: id, token })
    setIsBtnLoading(isLoading)
    setCurrentForm('passwordChanged')
  }

  const {
    register, handleSubmit, setError,
    formState: { errors },
  } = useForm({ resolver: yupResolver(validationSchema) });

  return (
    <Box
      form
      onSubmit={handleSubmit(onSubmit)}
      classes='px-6 pb-4 space-y-6 pt-4 lg:px-8 pb-6 xl:pb-8 mx-auto max-w-md'
    >
      <Text
        noDarkMode
        h1
        weight='medium'
        color='gray-900'
      >
        {formType[currentForm].title}
      </Text>
      <Text>
        {formType[currentForm].message}
      </Text>

      <Col classes={currentForm === 'passwordChanged' ? 'hidden' : 'block'}>
        <Input
          name='newPassword'
          type='password'
          label='New Password'
          register={register}
          errors={errors}
        />
        <Input
          name='confirmPassword'
          type='password'
          label='Confirm New Password'
          register={register}
          errors={errors}
        />
        <Button
          type='submit'
          width='full'
          classes='mt-5'
          size='lg'
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
          size='lg'
          isLoading={isBtnLoading}
        >
          {formType[currentForm].textButton}
        </Button>
      </Link>
    </Box>
  );
}

export default ResetPasswordPage;
