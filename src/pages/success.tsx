import { useEffect } from "react";
import { shootFireworks } from "lib/canvas";
import { useShoppingCart } from "components/context/cartContext";
import { Text, Box, Icons } from "core/components";
import { useCheckSessionId } from "../services/payment";
import { useRouter } from "next/router";

export default function SuccessPage() {
  const router = useRouter();
  const { clearCart } = useShoppingCart();
  const { data, isLoading, isError } = useCheckSessionId(router.query.session_id)

  useEffect(() => {
    if (data) {
      shootFireworks();
      clearCart();
    }
  }, [data]);

  if (isError) {
    router.push('/')
  }

  return (
    <Box
      classes='
        h-screen mx-auto space-y-4
        px-6 pt-4 pb-6 lg:px-8 xl:pb-48
    '
    >
      <Box classes="py-4 px-8 rounded-md max-w-lg mx-auto mt-32">
        {
          isLoading ? <Text>loading...</Text>
            :
            <Text h2 classes="text-4xl font-semibold flex flex-col items-center space-x-1">
              <Icons.check className="w-16 h-16 flex-shrink-0 text-green-600 mb-4"/>
              <Text span>Thanks you</Text>
              <Text classes="text-lg mt-3">Your order was completed successfully</Text>
            </Text>
        }
      </Box>
    </Box>

  );
}
