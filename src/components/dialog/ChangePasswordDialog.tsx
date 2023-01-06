import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { Dialog, Button, Text, Input, Box } from 'core/components';
import { accountService } from 'services/account';
import { userAuthSchema } from "lib/validation/auth";
import { updatePasswordSchema } from 'lib/validation/password';

type FormData = {
  confirmPassword: string
  newPassword: string
} & Pick<Yup.InferType<typeof userAuthSchema>, 'password'>

const formOptions = { resolver: yupResolver(updatePasswordSchema) };

export default function ChangePasswordDialog({ showDialog, setShowDialog }) {
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const { register, handleSubmit, reset, formState: { errors }, setError } = useForm<FormData>(formOptions);

  async function onSubmit(values: FormData) {
    delete values.confirmPassword

    setIsBtnLoading(true)
    const { isLoading, isSuccess, message } = await accountService.changePassword(values)
    setIsBtnLoading(isLoading)

    if (isSuccess) {
      toast.success('Update success!')
      reset({ password: '', confirmPassword: '', newPassword: '' });
      setShowDialog(false)
    } else {
      if (errors) {
        setError('password', {
          type: 'server',
          message
        });
      }
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
          <Box
            form
            onSubmit={handleSubmit(onSubmit)}
            classes='space-y-6 mt-4'
          >
            <Input
              name='password'
              type='password'
              label='Old Password'
              register={register}
              helperText={errors?.password?.message}
            />
            <Input
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
              size='lg'
              classes='w-[calc(100%-2rem)]'
              type='submit'
              isLoading={isBtnLoading}
            >Change</Button>
          </Box>
        </Box>
      </Dialog.Content>
    </Dialog>
  );
}
