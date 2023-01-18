import * as Yup from "yup";
import { HTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Input, Box } from 'core/components';
import { useAutoFocus } from 'core/hooks';
import { accountService } from 'services/account';
import { PATH } from "config/const";
import { cn } from "core/helpers";
import ErrorServer from "components/common/ErrorServer";
import { userRegisterSchema } from "lib/validation/register";

type FormData = Yup.InferType<typeof userRegisterSchema>

interface UserRegisterFormProps extends HTMLAttributes<HTMLDivElement> {
}

export default function UserRegisterForm({ className }: UserRegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [errorServer, setErrorServer] = useState('')
  const emailInputRef = useAutoFocus();
  const router = useRouter();

  const { register, handleSubmit, setError, formState: { errors } } = useForm<FormData>({
    resolver: yupResolver(userRegisterSchema),
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true)
    const { isLoading, message, status } = await accountService.register(values)
    setIsLoading(isLoading)

    switch (status) {
      case 200:
        router.push(PATH.ACCOUNT._)
        break
      case 409:
        setError('email', {
          type: 'server',
          message
        });
        break
      default:
        setErrorServer(message)
    }
  }

  return (
    <Box
      form
      onSubmit={handleSubmit(onSubmit)}
      classes={cn('space-y-4', className)}
    >
      <ErrorServer
        message={errorServer}
        onClick={() => setErrorServer('')}
      />
      <Box classes='space-y-5 mb-8'>
        <Input
          name='name'
          label='Full Name'
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
      </Box>
      <Button
        type='submit'
        classes='font-bold'
        // classes='w-[calc(100%-3rem)] laptop:w-[calc(100%-2rem)] font-bold'
        size='lg'
        width='full'
        isLoading={isLoading}
        text='Sign up'
      />
    </Box>
  );
}
