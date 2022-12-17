import { Button, Row, Text } from "core/components";
import { formatDollarUS } from "core/helpers";
import getStripe from "lib/get-stripejs";
import { config } from "config";

export default function PostCheckoutButton({ context }) {
  const { numberOfItemsInCart, cart, total } = context

  const IsEmptyCart = numberOfItemsInCart === Number(0)

  async function handleCheckout() {
    const stripe = await getStripe();
    const response = await fetch(config.api.checkout._, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart),
    });

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
      onClick={handleCheckout}
    >
      <Row
        justify='between'
        classes='cursor-pointer'
      >
        <Text classes='mr-2'>Proceed to check out</Text>
        <Text classes='border-white border-l pl-4'>{formatDollarUS(total)}</Text>
      </Row>
    </Button>
  );
}
