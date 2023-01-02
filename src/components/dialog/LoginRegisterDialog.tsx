import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Dialog, Button, Text, Link, Checkbox, Input, Box, Row } from 'core/components';
import { useAutoFocus } from 'core/hooks';
import { accountService } from 'services/account';
import { userAuthSchema } from "lib/validation/auth";
import { PATH } from 'config/const';
import { userNameSchema } from "../../lib/validation/user";

type FormData = Yup.InferType<typeof userNameSchema & typeof userAuthSchema>
// type FormData = Yup.InferType<typeof userNameSchema> & Yup.InferType<typeof userAuthSchema>
// type FormData = {name: string} & Yup.InferType<typeof userAuthSchema>

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

const formOptions = {
  resolver: yupResolver(userAuthSchema),
  // defaultValues: {
  //   email: 'customer@mail.com',
  //   password: '111111'
  // }
};

const LoginRegisterDialog = ({ showLoginDialog, setShowLoginDialog }) => {
  const router = useRouter();
  const [currentForm, setCurrentForm] = useState<string>('login')
  const [isLoading, setIsLoading] = useState<boolean>(false)
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

  // useEffect(() => {
  //   if (currentForm === 'login') {
  //     setValue('email', 'customer@mail.com')
  //     setValue('password', '111111')
  //   } else {
  //     setValue('email', '')
  //     setValue('password', '')
  //   }
  // }, [currentForm])

  async function onSubmit(values: FormData) {
    setIsLoading(true)
    const {
      isLoading,
      data,
      message
    } = currentForm === 'register' ? await accountService.register(values) : await accountService.login(values)
    setIsLoading(isLoading)

    if (data) {
      reset({ password: '', email: '' });
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
  }

  console.log('dauphaihau debug: errors', errors)

  return (
    <Dialog
      isOpen={showLoginDialog}
      closeDialog={setShowLoginDialog}
      classes='w-[390px] max-w-sm absolute top-[35%] left-1/2 -translate-x-2/4 -translate-y-2/4'
      // className='top-0 left-0'
      noPadding
      data-testid='signInForm'
    >
      <Dialog.Content
        closeDialog={setShowLoginDialog}
        classes='px-6 py-4 lg:p-8'
      >
        <Text h3>{formType[currentForm].title}</Text>
        <Text>{formType[currentForm].message}</Text>
        <Box
          form
          onSubmit={handleSubmit(onSubmit)}
          classes='space-y-6 subscribe-letter-bg mt-4'
        >
          {
            currentForm === 'register' &&
            <Input
              name='name'
              label='Name'
              register={register}
              helperText={errors?.name?.message}
            />
          }
          <Input
            clearable
            name='email'
            // type='email'
            label='Email'
            register={register}
            data-testid='emailInput'
            helperText={errors?.email?.message}
            ref={emailInputRef}
          />
          <Input.Password
            name='password'
            label='Password'
            data-testid='passwordInput'
            register={register}
            helperText={errors?.password?.message}
          />
          {
            currentForm === 'login' &&
            <Row
              justify='between'
              align='center'
            >
              <Checkbox
                name='rememberMe'
                label='Remember me'
                onChange={() => {}}
              />
              <Link href={PATH.ACCOUNT.FORGOT_PASSWORD}>
                <Text
                  as='button'
                  classes='text-sm text-black hover:underline pt-[2px]'
                >Forgot Password?</Text>
              </Link>
            </Row>
          }
          <Button
            type='submit'
            data-testid='btn-submit-login'
            classes='w-[calc(100%-2rem)]'
            size='lg'
            isLoading={isLoading}
          >
            {formType[currentForm].textButton}
          </Button>

          {
            formType[currentForm].textFooter &&
            <Row classes='text-sm font-medium text-gray-500 dark:text-gray-300'>
              <Text span classes='mr-2 text-primary-gray'>{formType[currentForm].textFooter}</Text>
              <Text
                span
                weight='bold'
                as='button'
                color='black'
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
