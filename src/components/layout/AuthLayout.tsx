import { Box, Col } from "core/components";

export default function AuthLayout({ children }) {
  return (
    // <Box classes='bg-gray-custom-52a'>
    <Box classes='bg-[#fcfcfc]'>
      <Col
        justify='center'
        classes='
        h-screen max-w-[414px] m-auto space-y-4
        px-6 pt-4 pb-6 lg:px-8 xl:pb-8
        '
      >
        {children}
      </Col>
    </Box>
  );
}
