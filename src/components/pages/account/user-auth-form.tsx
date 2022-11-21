import * as Yup from "yup";
import { HTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";

import { useAuth } from 'context/authContext';
import { Button, Text, Link, Checkbox, Input, Box, Row } from 'core/components';
import { useAutoFocus } from 'core/hooks';
import { accountService } from 'services/account';
import Enums from "config/enums";
import { cnn } from "core/helpers";
import { IUserAuthSchema as FormData } from "lib/validation/auth";
import { yupResolver } from "@hookform/resolvers/yup";

const validationSchema = Yup.object().shape({
  email: Yup.string()
  .email('Email is invalid')
  .required('Email is required'),
  password: Yup.string()
  .required('Password is required')
  .min(6, 'Password must be at least 6 characters'),
});

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

export default function UserAuthForm({ className }: UserAuthFormProps) {

  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { setUser, user } = useAuth();
  const emailInputRef = useAutoFocus();

  const {
    register, handleSubmit,
    reset, setError, setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(validationSchema)
  });

  // useEffect(() => {
  //     setValue('email', 'customer@mail.com')
  //     setValue('password', '111111')
  // }, [])

  async function onSubmit(values: FormData) {
    setIsLoading(true)
    const { data, isLoading, message } = await accountService.login(values)
    setIsLoading(isLoading)

    if (data) {
      router.push(Enums.PATH.ACCOUNT._)
      // setUser({ ...user, ...data.profile })
    } else {
      if (errors) {
        setError('email', {
          type: 'server',
          message
        });
      }
    }
  }

  return (
    <Box
      form
      onSubmit={handleSubmit(onSubmit)}
      classes={cnn('space-y-4', className)}
    >
      <Input
        name='email'
        type='email'
        label='Email'
        register={register}
        helperText={errors?.email ? errors?.email?.message : ''}
        ref={emailInputRef}
      />
      <Input.Password
        name='password'
        label='Password'
        register={register}
        helperText={errors?.password ? errors?.password?.message : ''}
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
        isLoading={isLoading}
        text='Login to your account'
      />
    </Box>
  );
}
