import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuth } from 'context/authContext';
import { Button, Text, Link, Checkbox, Input, Box, Row } from 'core/components';
import { useAutoFocus } from 'core/hooks';
import { accountService } from 'services/account';
import Enums from "config/enums";
import InputComp from "../../core/components/Input/InputTest";

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

const formOptions = {
  resolver: yupResolver(validationSchema),
};

const Register = () => {
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const { setUser, user } = useAuth();
  const emailInputRef = useAutoFocus();

  // useEffect(() => {
  //   reset();
  //   setCurrentForm('login')
  // }, [showLoginDialog])

  const {
    register, handleSubmit,
    reset, setError, setValue,
    formState: { errors },
  } = useForm(formOptions);

  const onSubmit = async (values) => {
    setIsBtnLoading(true)
    const { isSuccess, isLoading, data, message } = await accountService.register(values)

    setIsBtnLoading(isLoading)

    if (isSuccess) {
      // router.push(currentForm === 'login' && Enums.PATH.ACCOUNT._)
      // setUser({ ...user, ...data.profile })
    } else {
      if (errors) {
        setError('email', {
          type: 'server',
          message
        });
      }
    }
  };

  console.log('dauphaihau debug: content-form-message', contentForm.message)

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
        errors={errors}
      />
      <Input
        name='email'
        type='email'
        label='Email'
        register={register}
        errors={errors}
        ref={emailInputRef}
      />
      {/*<InputComp.Password name='pass'/>*/}

      <Input.Password
        name='password'
        label='Password'
        register={register}
        errors={errors}
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
