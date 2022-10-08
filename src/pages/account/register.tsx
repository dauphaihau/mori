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

const formType = {
  login: {
    title: 'Login',
    subTitle: 'Please enter your e-mail and password:',
    // title: 'Log in',
    message: '',
    textButton: 'Login to your account',
    textFooter: 'Don\'t have an account?',
    linkTextFooter: 'Create one'
  },

  register: {
    title: 'Create account',
    message: '',
    textButton: 'Sign up',
    textFooter: 'Already have an account?',
    linkTextFooter: 'Login'
  },
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
  defaultValues: {
    email: 'customer@mail.com',
    password: '111111'
  }
};

const Login = () => {

  const router = useRouter();
  const [currentForm, setCurrentForm] = useState('login')
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

  useEffect(() => {
    if (currentForm === 'login') {
      setValue('email', 'customer@mail.com')
      setValue('password', '111111')
    } else {
      setValue('email', '')
      setValue('password', '')
    }
  }, [currentForm])

  const onSubmit = async (values) => {
    setIsBtnLoading(true)
    const {
      isSuccess,
      isLoading,
      data,
      message
    } = currentForm === 'register' ? await accountService.register(values) : await accountService.login(values)
    setIsBtnLoading(isLoading)

    if (isSuccess) {
      router.push(currentForm === 'login' && Enums.PATH.ACCOUNT._)
      // setUser({ ...user, ...data.profile })
      setShowLoginDialog(false);
    } else {
      console.log('dauphaihau debug: message', message)
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
        >{formType[currentForm].title}</Text>
        <Text
          weight='medium'
          classes='text-sm'
        >{formType[currentForm].subTitle}</Text>
      </Box>

      {/*<Text>{formType[currentForm].message}</Text>*/}
      {/*<div className={`-mt-4`}>*/}
        <Input
          name='email'
          type='email'
          label='Email'
          register={register}
          errors={errors}
          ref={emailInputRef}
        />
      {/*</div>*/}

      <div className={``}>
        <Input.Password
          name='password'
          label='Password'
          register={register}
          errors={errors}
        />
      </div>
      <Row
        justify='between'
        align='center'
        classes='!mt-3'
      >
        <Checkbox
          name='rememberMe'
          label='Remember me'
        />
        <Link href='/account/forgot-password'>
          <Text
            as='button'
            classes='text-sm text-black hover:underline pt-[2px]'
          >Forgot Password?</Text>
        </Link>
      </Row>

      <Button
        type='submit'
        width='full'
        classes={currentForm === 'forgotPassword' && '!mt-[5px]'}
        size='lg'
        isLoading={isBtnLoading}
        text={formType[currentForm].textButton}
      />
      <Row
        justify='center'
        classes='text-sm font-medium text-gray-500 dark:text-gray-300'
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
          onClick={() => {
            setCurrentForm(currentForm === 'register' ? 'login' : 'register');
            reset();
          }}
        >
          {formType[currentForm].linkTextFooter}
        </Text>
      </Row>
    </Box>

  );
}

export default Login;
