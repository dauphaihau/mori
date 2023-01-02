import { Box, Col, NextImage, Row, Text } from "core/components";
import { formatDollarUS } from "core/helpers";
import RatingStars from "./RatingStars";
import QuantitySelector from "./QuantitySelector";
import { useProductContext } from "context/ProductContext";
import { rangeDate } from "./DisclosureShipping";

export default function ProductMainInfo () {
  const { product } = useProductContext()
  const { name, salePrice, price } = product;
  const stockQuantity = product.quantity

  return (
    <Box>
      <Text
        h1
        classes='text-xl tablet:text-2xl laptop:text-4xl mt-2 mb-5'
        text={name}
      />
      <Row align='center' classes='mb-5'>
        <RatingStars initialValue={product.rating}/>
        <Text classes='mt-2 ml-4 mt-0' text='11 reviews'/>
      </Row>
      <Text
        classes={['text-2xl tablet:text-3xl laptop:text-[22px] relative tracking-wide mb-5',
          { 'text-primary-red': salePrice }
        ]}
      >
        {salePrice ? formatDollarUS(salePrice) : formatDollarUS(price)}
        <Text
          hideIf={!price || !salePrice}
          span
          classes='text-lg ml-2.5 line-through text-primary-gray'
        >
          {formatDollarUS(price)}
        </Text>
      </Text>

      <Text classes='mb-5 block mt-4'>Available: {stockQuantity}</Text>
      <QuantitySelector/>
      <Col gap={2}>
        <Row
          gap={4}
          align='center'
        >
          <NextImage
            src='/images/product-page/cart.png'
            height={52}
            width={55}
            objectFit='contain'
          />
          <Text classes='w-full text-sm'>
            <Text b>Other people want this.</Text> 6 people have this in their carts right now.
          </Text>
        </Row>
        <Row
          gap={4}
          align='center'
        >
          <NextImage
            src='/images/product-page/star.png'
            height={52}
            width={55}
            objectFit='contain'
          />
          <Text classes='w-full text-sm'>
            Star Seller. This seller consistently earned 5-star reviews, shipped on time, and replied quickly to any
            messages they received.
          </Text>
        </Row>
        <Row
          gap={4}
          align='center'
        >
          <NextImage
            src='/images/product-page/car.png'
            height={52}
            width={55}
            objectFit='contain'
          />
          <Text classes='w-full text-sm'>
            <Text b>
              Arrives by {rangeDate(3, 8)}
            </Text> {' '}
            if you order today.
          </Text>
        </Row>
      </Col>
    </Box>
  );
}
