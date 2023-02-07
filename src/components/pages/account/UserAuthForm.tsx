import * as Yup from "yup";
import { HTMLAttributes, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Input, Box } from 'core/components';
import { useAutoFocus } from 'core/hooks';
import { accountService } from 'services/account';
import { userAuthSchema } from "lib/validation/auth";
import ErrorServer from "components/common/ErrorServer";
import { useAuth } from "components/context/authContext";

interface UserAuthFormProps extends HTMLAttributes<HTMLDivElement> {
}

type FormData = Yup.InferType<typeof userAuthSchema>

export default function UserAuthForm({ className }: UserAuthFormProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorServer, setErrorServer] = useState('')
  const emailInputRef = useAutoFocus();
  const { loginRegisterSuccess } = useAuth();

  const {
    register, handleSubmit,
    reset, setError, setValue,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(userAuthSchema)
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true)
    const {data, isLoading, message, status } = await accountService.login(values)
    setIsLoading(isLoading)

    switch (status) {
      case 200:
        loginRegisterSuccess(data)
        break
      default:
        setErrorServer(message)
    }
  }

  return (
    <Box
      form
      onSubmit={handleSubmit(onSubmit)}
      classes={className}
    >
      <ErrorServer
        message={errorServer}
        onClick={() => setErrorServer('')}
      />
      <Box classes='space-y-5 mb-8'>
        <Input
          name='email'
          label='Email Address'
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
