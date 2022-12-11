import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuth } from 'context/authContext';
import { Dialog, Button, Text, Link, Checkbox, Input, Box, Row } from 'core/components';
import { useAutoFocus } from 'core/hooks';
import { accountService } from 'services/account';
import { Icons } from 'components/common/Icons';
import { IUserAuthSchema } from "lib/validation/auth";
import { PATH } from 'config/const';

type FormData = {
  name: string
} & IUserAuthSchema

const formType = {
  login: {
    title: 'Welcome back',
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
  // defaultValues: {
  //   email: 'customer@mail.com',
  //   password: '111111'
  // }
};

const LoginRegisterDialog = ({ showLoginDialog, setShowLoginDialog }) => {
  const router = useRouter();
  const [currentForm, setCurrentForm] = useState<string>('login')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { setUser, user } = useAuth();
  const emailInputRef = useAutoFocus();

  useEffect(() => {
    reset();
    setCurrentForm('login')
  }, [showLoginDialog])

  useEffect(() => {
    setShowLoginDialog(false)
  }, [router.asPath])

  const {
    register, handleSubmit,
    reset, setError, setValue,
    formState: { errors },
  } = useForm<FormData>(formOptions);

  useEffect(() => {
    // if (currentForm === 'login') {
    //   setValue('email', 'customer@mail.com')
    //   setValue('password', '111111')
    // } else {
    //   setValue('email', '')
    //   setValue('password', '')
    // }
  }, [currentForm])

  const onSubmit = async (values: FormData) => {
    setIsLoading(true)
    const {
      isLoading,
      data,
      message
    } = currentForm === 'register' ? await accountService.register(values) : await accountService.login(values)
    setIsLoading(isLoading)
    console.log('dauphaihau debug: is-loading', isLoading)
    // console.log('dauphaihau debug: data', data)
    if (data) {
      console.log('dauphaihau debug: data', data)
      if (currentForm === 'login') {
        router.push(PATH.ACCOUNT._)
        setShowLoginDialog(false);
      }
      setCurrentForm('login')
    } else {
      if (errors) {
        setError('email', {
          type: 'server',
          message
        });
      }
    }
  };

  if (!showLoginDialog) return null;
  return (
    <Dialog
      nonDarkMode
      isOpen={showLoginDialog}
      closeDialog={() => setShowLoginDialog(false)}
      classes='w-[390px]'
      noPadding
      data-testid='signInForm'
    >
      <Dialog.Content>
        <Row
          justify='end'
          classes='p-2 mb-[-44px]'
        >
          <Icons.x
            className='btn-icon--noBg'
            onClick={() => setShowLoginDialog(false)}
          />
        </Row>
        <Box
          form
          onSubmit={handleSubmit(onSubmit)}
          classes='px-6 pb-4 space-y-6 pt-4 lg:px-8 pb-6 xl:pb-8 subscribe-letter-bg'
        >
          <Text
            h4
            // weight='medium'
          >{formType[currentForm].title}</Text>
          <Text>{formType[currentForm].message}</Text>
          {currentForm === 'register' && <Input
            name='name'
            label='Name'
            register={register}
            helperText={errors?.name?.message}
          />}
          <Input
            clearable
            name='email'
            type='email'
            label='Email'
            register={register}
            data-testid='emailInput'
            helperText={errors?.email?.message}
            ref={emailInputRef}
          />
          {
            currentForm !== 'forgotPassword' &&
            <Input.Password
              name='password'
              label='Password'
              data-testid='passwordInput'
              register={register}
              helperText={errors?.password?.message}
            />
          }
          {
            currentForm === 'login' &&
            <Row
              justify='between'
              align='center'
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
          }
          <Button
            type='submit'
            width='full'
            data-testid='btn-submit-login'
            classes={currentForm === 'forgotPassword' && '!mt-[5px]'}
            size='lg'
            isLoading={isLoading}
          >
            {formType[currentForm].textButton}
          </Button>
          {
            formType[currentForm].textFooter &&
            <Row classes='text-sm font-medium text-gray-500 dark:text-gray-300'>
              <Text
                span
                classes='mr-2'
              >{formType[currentForm].textFooter}</Text>
              <Text
                span
                as='button'
                color='black'
                // weight='medium'
                classes='hover:underline'
                onClick={() => {
                  setCurrentForm(currentForm === 'register' ? 'login' : 'register');
                  reset();
                }}
              >
                {formType[currentForm].linkTextFooter}
              </Text>
            </Row>
          }
        </Box>
      </Dialog.Content>
    </Dialog>
  );
}

export default LoginRegisterDialog;
