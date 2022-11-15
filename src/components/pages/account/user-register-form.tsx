import * as Yup from "yup";
import { HTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Text, Link, Checkbox, Input, Box, Row } from 'core/components';
import { useAutoFocus } from 'core/hooks';
import { accountService } from 'services/account';
import Enums from "config/enums";
import { IUserAuthSchema } from "lib/validation/auth";
import { cn } from "core/helpers";

const validationSchema = Yup.object().shape({
  name: Yup.string().min(6, 'Name must be at least 6 characters'),
  email: Yup.string()
  .email('Email is invalid')
  .required('Email is required'),
  password: Yup.string()
  .required('Password is required')
  .min(6, 'Password must be at least 6 characters'),
});

type FormData = {
  name: string
} & IUserAuthSchema

interface UserRegisterFormProps extends HTMLAttributes<HTMLDivElement> {}

export default function UserRegisterForm({ className }: UserRegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const emailInputRef = useAutoFocus();
  const router = useRouter();

  const { register, handleSubmit, setError, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(validationSchema),
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true)
    const { isLoading, data, message } = await accountService.register(values)
    setIsLoading(isLoading)

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
  }

  return (
    <Box
      form
      onSubmit={handleSubmit(onSubmit)}
      classes={cn('space-y-4', className)}
    >
      {/*<Text>{contentForm.message}</Text>*/}
      {/*<div className={`-mt-4`}>*/}
      <Input
        name='name'
        label='Name'
        register={register}
        helperText={errors?.name?.message}
      />
      <Input
        name='email'
        type='email'
        label='Email'
        register={register}
        helperText={errors?.email?.message}
        ref={emailInputRef}
      />
      <Input.Password
        name='password'
        label='Password'
        register={register}
        helperText={errors?.password?.message}
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
        text='Sign up'
      />
    </Box>
  );
}
