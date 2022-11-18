import React from 'react';
import { NextImage, Box, Col, Link, Row, Text } from 'core/components';
import { formatDollarUS, slugify } from 'core/helpers';
import Enums from "config/enums";
import { config } from "config";

const ResultSearch = ({ searchValue, products }) => {

  const renderResult = () => {
    if (!searchValue) return null;
    if (products.length === 0) {
      return (
        <Box classes='laptop:pt-4'>
          <Text classes='mb-2'>Products</Text>
          <Text classes='border-t py-4'
                data-testid="noResultsText"
          >
            No results could be found
          </Text>
        </Box>
      )
    }
    if (products.length) {
    // if (products && products.length > 0) {
      return (
        <Box classes='relative'>
          <Text classes='pb-2 border-b sticky top-0 py-4 bg-white z-10'>{products.length} result</Text>
          <Box
            data-testid="productsList"
          >
            {
              products.map((item, index) => {
                return (
                  <Box
                    classes='py-4'
                    key={index}
                  >
                    <Row>
                      <Box classes='cursor-pointer ipad:w-auto  relative bg-light rounded-lg p-1'>
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
                        <Link href={`${Enums.PATH.PRODUCT._}/${slugify(item.name)}`}>
                          <Text
                            h1
                            size={17}
                            classes='m-0 '
                            // classes='m-0 text-gray-600'
                            data-testid={item.name}
                          >
                            {item.name}
                          </Text>
                        </Link>
                        <Row>
                          {item.salePrice ?
                            <>
                              <Text
                                weight='bold'
                                size={12}
                              >{formatDollarUS(item.salePrice)}</Text>
                              {
                                item.price
                                &&
                                <Text
                                  size={12}
                                  classes='ml-2 line-through'
                                  // classes='ml-2 line-through text-gray-400'
                                >
                                  {formatDollarUS(item.price)}</Text>
                              }
                            </>
                            : <Text
                              size={12}
                              classes='tracking-wide'
                            >{formatDollarUS(item.price)}</Text>
                          }
                        </Row>
                      </Col>
                    </Row>
                  </Box>
                )
              })
            }
          </Box>
        </Box>
      )
    }
  }

  return (
    <Col classes='max-h-[650px] overflow-y-auto overflow-x-hidden bg-white px-4 laptop:rounded-lg laptop:mt-4'>
      {renderResult()}
    </Col>
  );
}

export default ResultSearch;
