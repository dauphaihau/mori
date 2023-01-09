import * as Yup from "yup";
import { HTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Input, Box, Text, Row, Icons } from 'core/components';
import { useAutoFocus } from 'core/hooks';
import { accountService } from 'services/account';
import { PATH } from "config/const";
import { cn } from "core/helpers";
import { userAuthSchema } from "lib/validation/auth";
import ErrorServer from "components/common/ErrorServer";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {}

type FormData = Yup.InferType<typeof userAuthSchema>

export default function UserAuthForm({ className }: UserAuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorServer, setErrorServer] = useState('')
  const emailInputRef = useAutoFocus();

  const {
    register, handleSubmit,
    reset, setError, setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(userAuthSchema)
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true)
    const { isLoading, message, status } = await accountService.login(values)
    setIsLoading(isLoading)

    switch (status) {
      case 200:
        router.push(PATH.ACCOUNT._)
        break
      default:
        setErrorServer(message)
    }
  }

  return (
    <Box
      form
      onSubmit={handleSubmit(onSubmit)}
      classes={cn('', className)}
    >
      <ErrorServer
        message={errorServer}
        onClick={() => setErrorServer('')}
      />
      <Box classes='space-y-5 mb-8'>
        <Input
          name='email'
          placeholder='Email Address'
          register={register}
          helperText={errors?.email?.message}
          ref={emailInputRef}
        />
        <Input.Password
          name='password'
          placeholder='Password'
          register={register}
          helperText={errors?.password?.message}
        />
      </Box>
      <Button
        type='submit'
        width='full'
        // classes='w-[calc(100%-3rem)] laptop:w-[calc(100%-2rem)] font-bold'
        classes='font-bold'
        size='lg'
        shadow
        isLoading={isLoading}
        text='Login to your account'
      />
    </Box>
  );
}
