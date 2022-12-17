import { Box } from 'core/components';

const AccountLayout = ({ children }) => {
  return (
    <Box classes='bg-gray-custom-52a py-28'>
      <Box classes='w-9/12 max-w-[1420px] mx-auto'>
        {children}
      </Box>
    </Box>
  );
}

export default AccountLayout;
