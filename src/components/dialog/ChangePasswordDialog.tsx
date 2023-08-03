import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Dialog, Button, Text, Input, Box } from 'core/components';
import { accountService } from 'services/account';
import { userAuthSchema } from "lib/validation/auth";
import { updatePasswordSchema } from 'lib/validation/password';
import ErrorServer from "components/common/ErrorServer";

type FormData = {
  confirmPassword: string
  newPassword: string
} & Pick<Yup.InferType<typeof userAuthSchema>, 'password'>

const formOptions = { resolver: yupResolver(updatePasswordSchema) };

export default function ChangePasswordDialog({ showDialog, setShowDialog }) {
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const [errorServer, setErrorServer] = useState('')
  const { register, handleSubmit, reset, formState: { errors }, setError, resetField } = useForm<FormData>(formOptions);

  useEffect(() => {
     if (!showDialog) {
       setErrorServer('')
       resetField('password',)
       resetField('confirmPassword',)
     }
  },[showDialog])

  async function onSubmit(values: FormData) {
    delete values.confirmPassword

    setIsBtnLoading(true)
    const { isLoading, status, message } = await accountService.changePassword(values)
    setIsBtnLoading(isLoading)

    switch (status) {
      case 200:
        toast.success('Update success!')
        reset({ password: '', confirmPassword: '', newPassword: '' });
        setShowDialog(false)
        break
      case 401:
        setError('password', {
          type: 'server',
          message
        });
        break
      default:
        setErrorServer(message)
    }
  }

  return (
    <Dialog
      isOpen={showDialog}
      closeDialog={setShowDialog}
      classes='w-[390px] absolute top-[35%] left-1/2 -translate-x-2/4 -translate-y-2/4'
      noPadding
    >
      <Dialog.Content
        closeDialog={setShowDialog}
        classes='px-6 pb-4 pt-4 lg:p-8'
      >
        <Box classes=''>
          <Text h3>Change your password</Text>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='mt-4'
            // className='space-y-6 mt-4'
          >
            <ErrorServer
              message={errorServer}
              onClick={() => setErrorServer('')}
            />
            <Input
              classes={'mb-1'}
              name='password'
              type='password'
              label='Old Password'
              register={register}
              helperText={errors?.password?.message}
            />
            <Input
              classes={'mb-1'}
              name='newPassword'
              type='password'
              label='New Password'
              register={register}
              helperText={errors?.newPassword?.message}
            />
            <Input
              name='confirmPassword'
              type='password'
              label='Confirm New Password'
              register={register}
              helperText={errors?.confirmPassword?.message}
            />
            <Button
              classes={'mt-5'}
              type='submit'
              size='md'
              width='full'
              isLoading={isBtnLoading}
            >Change</Button>
          </form>
        </Box>
      </Dialog.Content>
    </Dialog>
  );
}
