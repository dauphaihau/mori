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
import { userNameSchema } from "lib/validation/user";
import { useAuth } from "components/context/authContext";

type FormData = Yup.InferType<typeof userNameSchema & typeof userAuthSchema>

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

const formOptions = { resolver: yupResolver(userAuthSchema) };

const LoginRegisterDialog = ({ showLoginDialog, setShowLoginDialog }) => {
  const router = useRouter();
  const [currentForm, setCurrentForm] = useState<string>('login')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const emailInputRef = useAutoFocus();
  const { loginRegisterSuccess } = useAuth();

  useEffect(() => {
    reset();
    setCurrentForm('login')
  }, [showLoginDialog])

  useEffect(() => {
    setShowLoginDialog(false)
  }, [router.asPath])

  const {
    register, handleSubmit, reset, setError,
    formState: { errors }
  } = useForm<FormData>(formOptions);

  async function onSubmit(values: FormData) {
    setIsLoading(true)
    const {
      data, isLoading, status, message
    } = currentForm === 'register' ? await accountService.register(values) : await accountService.login(values)
    setIsLoading(isLoading)

    if (status === 200) {
      loginRegisterSuccess(data)
      reset({ password: '', email: '', name: '' });
      setShowLoginDialog(false);
    } else {
      if (errors) {
        setError('email', {
          type: 'server',
          message
        });
      }
    }
  }

  const checkKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(onSubmit)()
    }
  };

  return (
    <Dialog
      isOpen={showLoginDialog}
      closeDialog={setShowLoginDialog}
      classes='w-[390px] max-w-sm absolute top-[35%] left-1/2 -translate-x-2/4 -translate-y-2/4'
      noPadding
      data-testid='signInForm'
    >
      <Dialog.Content
        closeDialog={setShowLoginDialog}
        classes='px-6 py-4 lg:p-8'
      >
        <Text h3>{formType[currentForm].title}</Text>
        <Text>{formType[currentForm].message}</Text>

        <form
          onKeyDown={(e) => checkKeyDown(e)}
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-6 subscribe-letter-bg mt-4'
        >
          {
            currentForm === 'register' &&
            <Input
              name='name'
              label='Full Name'
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
            onKeyPress={(e:React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => { e.key === 'Enter' && e.preventDefault(); }}
            helperText={errors?.password?.message}
            onKeyDown={e => e.key === 'Enter' ? handleSubmit(onSubmit) : ''}
          />
          {
            currentForm === 'login' &&
            <Row
              justify='between'
              align='center'
            >
              {/*<Checkbox*/}
              {/*  value=''*/}
              {/*  name='rememberMe'*/}
              {/*  label='Remember me'*/}
              {/*  onChange={() => {}}*/}
              {/*/>*/}
              <div></div>
              <Link href={PATH.ACCOUNT.FORGOT_PASSWORD}>
                <Text
                  // weight='med'
                  as='button'
                  classes='text-sm text-gray-500 underline decoration-1 underline-offset-2 hover:text-[#da615d] animate  pt-[2px]'
                >Forgot Password?</Text>
              </Link>
            </Row>
          }
          <Button
            type='submit'
            width='full'
            data-testid='btn-submit-login'
            isLoading={isLoading}
          >
            {formType[currentForm].textButton}
          </Button>

          {
            formType[currentForm].textFooter &&
            <Row classes='text-sm font-medium text-gray-500 dark:text-gray-300' justify={'center'}>
              <Text span classes='mr-1 text-primary-gray'>{formType[currentForm].textFooter}</Text>

              <Text
                span
                // weight='semibold'
                as='button'
                // color='black'
                classes='text-primary-gray underline decoration-1 underline-offset-2 hover:text-[#da615d] animate'
                onClick={() => {
                  setCurrentForm(currentForm === 'register' ? 'login' : 'register');
                  reset();
                }}
              >
                {formType[currentForm].linkTextFooter}
              </Text>
            </Row>
          }
        </form>


      </Dialog.Content>
    </Dialog>
  );
}

export default LoginRegisterDialog;
