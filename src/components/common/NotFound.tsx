import { useRouter } from "next/router";
import { Box, Button, Text } from "core/components";

export default function NotFound() {
  const router = useRouter()
  return (
    <Box classes='mx-auto min-h-[65vh] max-w-md flex-center'>
      <Box classes='text-center space-y-4'>
        <Text h3 classes='font-normal'>404</Text>
        <p className='text-[#757575] text-sm'>The page you are looking for cannot be found.</p>
        <Button onClick={() => router.push('/')}>Back to homepage</Button>
      </Box>
    </Box>
  );
}
