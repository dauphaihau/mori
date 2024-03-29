import api from "lib/axios"
import { config } from "../config";
import getStripe from "../lib/get-stripejs";
import useSWR from "swr";

export const checkoutService = {
  payment: async (values) => {
    try {
      const stripe = await getStripe();
      const { status, data } = await api.post(config.api.checkout._, values)
      console.log('dauphaihau debug: data', data)

      // if (status !== 200) {
      //   console.error(`Failed to Proceed because of ${status}`);
      //   // toast.error(`Failed to Proceed because of ${status}`);
      //   return;
      // }

      if (status === 200) {
        console.log('dauphaihau debug: status', status)
        const dataJson = await data.json();

        console.log("Redirecting...");
        // toast.loading("Redirecting...");

        stripe.redirectToCheckout({ sessionId: dataJson.id });
      }

      return { status, isLoading: false };
    } catch ({ response }) {
      return {
        isLoading: false,
        status: response?.status,
        message: response?.data?.message,
      };
    }
  },
}

export function useCheckSessionId(id) {
  const fetcher = url => api.get(url).then(res => res.data)
  const { data, error } = useSWR(id ? `${config.api.checkout._}/${id}` : null, fetcher)
  return {
    // products: data?.products,
    data,
    isLoading: !data,
    isError: !!error,
  };

}
