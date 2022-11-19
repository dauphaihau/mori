import { Col, Row, Link, Text, NextImage } from 'core/components';
import { formatDollarUS, sliceText, slugify } from 'core/helpers';
import Enums from "config/enums";
import { config } from "../../../config";

const ProductListView = ({ data, dataFade }) => {

  return (
    <Row
      data-fade={dataFade}
      classes='w-full tablet:w-1/2 mb-8 laptop:w-full'
    >
      <Link href={`${Enums.PATH.PRODUCT._}/${slugify(data?.name)}`}>
        <Col
          justify='center'
          align='center'
          classes='h-full w-[300px] rounded-lg bg-light hover:bg-light-200'
        >
          <NextImage
            alt={data.name}
            width={200}
            height={200}
            src={config.hostStaticSource + data?.images[0]}
            objectFit='contain'
          />
        </Col>
      </Link>
      <Col classes='text-left pl-4'>
        <Link href={`${Enums.PATH.PRODUCT._}/${slugify(data?.name)}`}>
          <Text
            weight='semibold'
            classes='mb-1'
          >{data.name}</Text>
        </Link>
        <Text classes='text-gray-700 mb-4'>{formatDollarUS(data.price)}</Text>
        <Text classes='text-gray-600 leading-7 pb-2'>
          {sliceText(data.description, 400)}
        </Text>
        <Link
          href={`${Enums.PATH.PRODUCT._}/${slugify(data?.name)}`}
          className='inline-flex items-center
          text-sm font-medium text-center
          text-black underline underline-offset-4 hover:no-underline
          hover:opacity-80'
        >
          View detail
        </Link>
      </Col>
    </Row>
  )
}

export default ProductListView
