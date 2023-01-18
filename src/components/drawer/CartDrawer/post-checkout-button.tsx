import { Button, Row, Text } from "core/components";
import { formatDollarUS } from "core/helpers";
import getStripe from "lib/get-stripejs";
import { config } from "config";
import { checkoutService } from "../../../services/payment";
import { useState } from "react";
import { handleGetCookie } from "lib/cookie";
import { IToken } from "types/token";

export default function PostCheckoutButton({ context }) {
  const { numberOfItemsInCart, cart, total } = context
  const [isLoadingBtn, setIsLoadingBtn] = useState<boolean>(false)
  const IsEmptyCart = numberOfItemsInCart === Number(0)

  const authData = handleGetCookie<IToken>(config.cookies.auth)

  async function handleCheckout() {
    // setIsLoadingBtn(true)
    // const { status, isLoading } = await checkoutService.payment(cart)
    // setIsLoadingBtn(isLoading)

    const stripe = await getStripe();
    console.log('dauphaihau debug: auth-data', authData)
    const opts = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${JSON.stringify(authData)}`
      },
      body: JSON.stringify(cart),
    }
    if (!authData) {
      delete opts.headers.Authorization
    }
    const response = await fetch(config.api.checkout._, opts);

    if (response.status !== 200) {
      console.error(`Failed to Proceed because of ${response.status}`);
      // toast.error(`Failed to Proceed because of ${response.status}`);
      return;
    }

    const data = await response.json();

    console.log("Redirecting...");
    // toast.loading("Redirecting...");

    stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (
    <Button
      size='lg'
      disabled={IsEmptyCart}
      isLoading={isLoadingBtn}
      onClick={handleCheckout}
    >
      <Row
        justify='between'
        classes='cursor-pointer text-white'
      >
        <Text classes='mr-2 text-white'>Proceed to check out</Text>
        <Text classes='border-white border-l pl-4  text-white'>{formatDollarUS(total)}</Text>
      </Row>
    </Button>
  );
}
