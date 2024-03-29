import React from 'react';
import { NextImage, Box, Col, Link, Row, Text, Divider } from 'core/components';
import { formatDollarUS, slugify } from 'core/helpers';
import { PATH } from "config/const";
import { config } from "config";

const ResultSearch = ({ products }) => {

  const Result = () => {
    if (products.length === 0) {
      return (
        <Box classes='px-4'>
          <Col>
            <Text size={13} classes='text-primary-gray py-2 sticky top-0 bg-white z-10'>Products</Text>
            <Divider classes='border-primary-gray border-b opacity-10'/>
          </Col>
          <Text size={14} classes='py-3 block ' data-testid="noResultsText">
            No results could be found
          </Text>
        </Box>
      )
    }
    if (products.length) {
      return (
        <Box classes='relative'>
          <Col classes='px-4'>
            <Text
              size={13}
              classes='text-primary-gray py-2 sticky top-0 bg-white z-10'
            >{products.length} result</Text>
            <Divider classes='border-primary-gray border-b opacity-10'/>
          </Col>

          <Box data-testid="productsList">
            {
              products.map((item, index) => {
                return (
                  <Link
                    key={index}
                    href={`${PATH.PRODUCT._}/${slugify(item.name)}`}
                    classes={'hover:bg-black'}
                  >
                    <Box classes='py-4 hover:bg-light-200 px-4'>
                      <Row>
                        <Box classes='cursor-pointer tablet:w-auto relative bg-light rounded-lg p-1'>
                          <NextImage
                            height={90}
                            width={100}
                            objectFit={`contain`}
                            className='m-0'
                            src={config.hostStaticSource + item.images[0]}
                            alt={item.name}
                          />
                        </Box>
                        <Col
                          justify='center'
                          classes='ml-4 w-[65%]'
                        >
                          <Text
                            h5
                            size={17}
                            classes='m-0 '
                            data-testid={item.name}
                          >
                            {item.name}
                          </Text>
                          <Row>
                            {item.salePrice ?
                              <>
                                <Text
                                  classes='text-primary-red'
                                  size={14}
                                >{formatDollarUS(item.salePrice)}</Text>
                                <Text
                                  hideIf={!item.price}
                                  size={14}
                                  classes='ml-2 line-through text-primary-gray'
                                >{formatDollarUS(item.price)}</Text>
                              </>
                              : <Text
                                size={14}
                                classes='tracking-wide text-primary-gray'
                              >{formatDollarUS(item.price)}</Text>
                            }
                          </Row>
                        </Col>
                      </Row>
                    </Box>

                  </Link>
                )
              })
            }
          </Box>
        </Box>
      )
    }
  }

  return (
    <Col classes='max-h-[650px] overflow-y-auto overflow-x-hidden bg-white laptop:rounded-lg laptop:mt-4'>
      <Result/>
    </Col>
  );
}

export default ResultSearch;
