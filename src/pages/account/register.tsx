import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Button, Text, Link, Checkbox, Input, Box, Row } from 'core/components';
import { useAutoFocus } from 'core/hooks';
import { accountService } from 'services/account';
import Enums from "config/enums";
import { isEmptyObject } from "core/helpers";

const contentForm = {
  title: 'Register',
  subTitle: 'Please fill in the information below:',
  message: '',
  textButton: 'Sign up',
  textFooter: 'Already have an account?',
  linkTextFooter: 'Login'
}

const validationSchema = Yup.object().shape({
  name: Yup.string().min(6, 'Name must be at least 6 characters'),
  email: Yup.string()
  .email('Email is invalid')
  .required('Email is required'),
  password: Yup.string()
  .required('Password is required')
  .min(6, 'Password must be at least 6 characters'),
});

const Register = () => {
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const emailInputRef = useAutoFocus();
  const router = useRouter();

  const { register, handleSubmit, setError, formState: { errors } } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (values) => {
    setIsBtnLoading(true)
    const { isLoading, data, message } = await accountService.register(values)
    setIsBtnLoading(isLoading)

    if (data) {
      router.push(Enums.PATH.ACCOUNT.LOGIN)
    } else {
      if (errors) {
        setError('email', {
          type: 'server',
          message
        });
      }
    }
  };

  return (
    <Box
      form
      onSubmit={handleSubmit(onSubmit)}
      classes='h-[90vh] m-auto px-6 pb-4 space-y-4 pt-4 lg:px-8 pb-6 xl:pb-8 subscribe-letter-bg
      flex flex-col justify-center
      '
    >
      <Box classes='text-center'>
        <Text
          h1
          transforms='uppercase'
          weight='medium'
          classes='mb-4 text-xl tracking-[.17em]'
        >{contentForm.title}</Text>
        <Text
          weight='medium'
          classes='text-sm'
        >{contentForm.subTitle}</Text>
      </Box>
      {/*<Text>{contentForm.message}</Text>*/}
      {/*<div className={`-mt-4`}>*/}
      <Input
        name='name'
        label='Name'
        register={register}
        helperText={isEmptyObject(errors?.name) ? '' : errors.name.message}
      />
      <Input
        name='email'
        type='email'
        label='Email'
        register={register}
        helperText={isEmptyObject(errors?.email) ? '' : errors.email.message}
        ref={emailInputRef}
      />
      <Input.Password
        name='password'
        label='Password'
        register={register}
        helperText={isEmptyObject(errors?.password) ? '' : errors.password.message}
      />
      <Row
        justify='between'
        align='center'
        classes='!mt-3'
      >
        <Checkbox
          name='rememberMe'
          label='Remember me'
        />
        <Link href={Enums.PATH.ACCOUNT.FORGOT_PASSWORD}>
          <Text
            as='button'
            classes='text-sm text-black hover:underline pt-[2px]'
          >Forgot Password?</Text>
        </Link>
      </Row>

      <Button
        type='submit'
        width='full'
        size='lg'
        isLoading={isBtnLoading}
        text={contentForm.textButton}
      />
      <Row
        justify='center'
        classes='text-base'
      >
        <Text
          span
          classes='mr-1 text-primary-gray'
        >{contentForm.textFooter}</Text>
        <Link
          href={Enums.PATH.ACCOUNT.LOGIN}
          classes='hover:underline hover:decoration-black'
          text={contentForm.linkTextFooter}
        />
      </Row>
    </Box>
  );
}

export default Register;
