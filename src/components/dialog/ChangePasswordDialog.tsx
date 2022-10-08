import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { yupResolver } from '@hookform/resolvers/yup';

import { useAuth } from 'context/authContext';
import { Dialog, Button, Text, Input, Box, Row } from 'core/components';
import { accountService } from 'services/account';
import { XIcon } from "@heroicons/react/solid";

const validationSchema = Yup.object().shape({
  password: Yup.string()
  .min(6, 'Password must be at least 6 characters')
  .required('Password is required'),
  confirmPassword: Yup.string()
  .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
  .required('Confirm Password is required'),
});
const formOptions = { resolver: yupResolver(validationSchema) };

const ChangePasswordDialog = ({ showDialog, setShowDialog }) => {
  const [isBtnLoading, setIsBtnLoading] = useState(false)
  const { user } = useAuth();
  const { register, handleSubmit, reset, formState, setError } = useForm(formOptions);
  const { errors } = formState;

  const onSubmit = async (values) => {
    delete values.confirmPassword
    const formatData = { ...values, email: user.email }

    setIsBtnLoading(true)
    const { isLoading, isSuccess, message } = await accountService.changePassword(formatData)
    setIsBtnLoading(isLoading)

    if (isSuccess) {
      toast.success('Update success!')
      reset();
      setShowDialog(false)
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
    <Dialog
      isOpen={showDialog}
      closeDialog={setShowDialog}
      classes='w-[390px]'
      noPadding
    >
      <Dialog.Content>
        <Row
          justify='end'
          classes='p-2 mb-[-44px]'
        >
          <XIcon
            className='btn-icon'
            onClick={() => setShowDialog(false)}
          />
        </Row>
        <Box
          classes='px-6 space-y-6 pt-4 lg:px-8 subscribe-letter-bg'
        >
          <Text
            h1
            weight='medium'
            color='gray-900'
          >
            Change your password
          </Text>
          <Box
            form
            onSubmit={handleSubmit(onSubmit)}
            classes='xl:pb-8 space-y-6 '
          >
            <Input
              name='password'
              type='password'
              label='Old Password'
              register={register}
              errors={errors}
            />
            <Input
              name='newPassword'
              type='password'
              label='New Password'
              register={register}
              errors={errors}
            />
            <Input
              name='confirmPassword'
              type='password'
              label='Confirm New Password'
              register={register}
              errors={errors}
            />
            <Button
              size='lg'
              width='full'
              type='submit'
              isLoading={isBtnLoading}
            >Change</Button>
          </Box>
        </Box>
      </Dialog.Content>
    </Dialog>
  );
}

export default ChangePasswordDialog;
