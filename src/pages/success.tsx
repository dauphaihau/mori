import { useEffect } from "react";
import { shootFireworks } from "lib/canvas";
import { useShoppingCart } from "components/context/cartContext";
import { Loading, Text, Box, Icons, Row } from "core/components";
import { useCheckSessionId } from "../services/payment";
import { useRouter } from "next/router";
import { useUIController } from "components/context/UIControllerContext";

export default function SuccessPage() {
  const router = useRouter();
  const { clearCart } = useShoppingCart();
  const { setAmountAllItemsCart } = useUIController();
  const { data, isLoading, isError } = useCheckSessionId(router.query.session_id)

  useEffect(() => {
    if (data) {
      setAmountAllItemsCart(0)
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
      <Box classes="py-4 px-8 rounded-md max-w-lg m-auto h-full">
        {
          isLoading ?
            <Row justify='center' classes='my-4 h-full' align={'center'}>
              <Loading classes='fill-black h-8 w-8'/>
            </Row>
            :
            <Text h2 classes="text-4xl font-semibold flex flex-col items-center space-x-1 mt-32">
              <Icons.check className="w-16 h-16 flex-shrink-0 text-green-600 mb-4"/>
              <Text span>Thanks you</Text>
              <Text classes="text-lg mt-3">Your order was completed successfully</Text>
            </Text>
        }
      </Box>
    </Box>

  );
}
