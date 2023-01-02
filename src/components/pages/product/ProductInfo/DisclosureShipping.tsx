import { Tooltip } from 'react-tippy';
import * as React from "react";
import { Disclosure, Transition } from '@headlessui/react'

import { Icons, Box, Col, Link, NextImage, Row, Text } from 'core/components';
import { cn } from 'core/helpers';
import dayjs from "dayjs";

export const rangeDate = (from: number, to?: number) => {

  const month = (amount) => {
    return dayjs().add(amount, 'days').format("MMM")
  }

  const day = (amount) => {
    return dayjs().add(amount, 'days').format('DD')
  }

  if (!to) {
    return <>{month(from)} {day(from)}</>
  }
  return <>
    {month(from)} {day(from)}
    {' '} - {' '}
    {month(to) === month(from) ? '' : month(to)} {day(to)}
  </>
}

const dates = {
  estimatedArrival: rangeDate(3, 8),
  orderPlaced: rangeDate(0),
  orderShip: rangeDate(1, 2),
  delivered: rangeDate(3, 8),
  returnAndExchange: 21,
}

export default function DisclosureShipping() {
  return (
    // <Box classes='w-full laptop:w-[110%]'>
      <Box classes='mx-auto w-full max-w-4xl mx-auto rounded-2xl bg-white laptop:p-2'>
        <Disclosure
          as='div'
          className='mt-3'
        >
          {({ open }) => (
            <>
              <Disclosure.Button
                className='flex w-full justify-between rounded-lg
                     hover:bg-gray-custom-50 cursor-pointer
                     laptop:px-4 py-2 font-medium
                     '
              >
                <span className='text-base font-bold md:text-[18px] tracking-wide'>Shipping and return policies</span>
                <Icons.chevronUp
                  className={cn('h-5 w-5 text-primary-gray',
                    open ? '' : 'transform rotate-180',
                  )}
                />
              </Disclosure.Button>
              <Transition
                enter="transition-opacity ease-linear duration-200"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Disclosure.Panel className='px-4'>
                  <Box classes='mt-2'>
                    {/* @ts-ignore*/}
                    <Tooltip
                      html={
                        <Box classes='text-left'>
                          <Text span classes='text-white'>
                            &quot;This is an estimate based on the purchase date, the seller&apos;s location, and
                            processing time,
                            and the shipping destination and carrier.
                            <br/>
                            <br/>
                            Other factors—such as shipping carrier delays or placing an order on weekend/holiday—may
                            push the arrival of your item beyond this date.&quot;
                          </Text>
                        </Box>
                      }
                      animation='fade'
                      position="right"
                      arrow
                      arrowSize='big'
                      interactive
                    >
                      <Text classes='text-sm text-primary-gray w-fit underline decoration-dashed underline-offset-4 cursor-help mb-3'>
                        Estimated arrival
                      </Text>
                    </Tooltip>
                    <Text classes='text-[26px] block mb-8'>
                      {dates.estimatedArrival}
                    </Text>

                    <Row align='center'>
                      <Box classes='w-1/3'>
                        <Row align="center" gap={2}>
                          <Icons.hand className='rounded-full bg-gray-custom-52 p-4 w-6 h-6 p-1.5'/>
                          {/*<GiftIcon className='rounded-full bg-gray-custom-52 p-4 w-6 h-6 p-1.5'/>*/}
                          <Box classes='flex-auto h-1/2 w-auto  border-0 border-b-2 border-gray-custom-52'></Box>
                        </Row>
                        <Col>
                          <Text classes='text-xs mt-2 font-bold'>{dates.orderPlaced}</Text>
                          {/* @ts-ignore*/}
                          <Tooltip
                            title="After you place your order, Mori will take 1-2 business days to prepare it for shipment."
                            animation='fade'
                            position="bottom"
                            arrow={true}
                            arrowSize='big'
                            interactive
                          >
                            <Text span classes='text-sm underline decoration-dashed underline-offset-4 cursor-help'>Order
                              placed</Text>
                          </Tooltip>
                        </Col>
                      </Box>
                      <Box classes='w-1/3'>
                        <Row justify='center' align="center" gap={2}>
                          <Box classes='flex-auto h-1/2 w-auto  border-0 border-b-2 border-gray-custom-52'></Box>
                          <Icons.truck className='rounded-full bg-gray-custom-52 p-4 w-6 h-6 p-1.5'/>
                          <Box classes='flex-auto h-1/2 w-auto  border-0 border-b-2 border-gray-custom-52'></Box>
                          {/*<Box classes='flex-auto h-1/2  border-0 border-b-2 border-gray-custom-52 mx-2'></Box>*/}
                        </Row>
                        <Col classes='text-center'>
                          <Text classes='text-xs mt-2 font-bold'>
                            {dates.orderShip}
                          </Text>
                          {/* @ts-ignore*/}
                          <Tooltip
                            title="Mori puts your order in the mail. "
                            animation='fade'
                            position="bottom"
                            arrow={true}
                            arrowSize='big'
                            interactive
                          >
                            <Text span classes='underline decoration-dashed underline-offset-4 text-sm cursor-help'>Order
                              ships</Text>
                          </Tooltip>
                        </Col>
                      </Box>
                      <Box classes='w-1/3'>
                        <Row align="center" gap={2}>
                          <Box classes='flex-auto h-1/2 w-auto  border-0 border-b-2 border-gray-custom-52'></Box>
                          <Icons.gift className='rounded-full bg-gray-custom-52 p-4 w-6 h-6 p-1.5'/>
                          {/*<Box classes='flex-auto h-1/2  border-0 border-b-2 border-gray-custom-52 mx-2'></Box>*/}
                        </Row>
                        <Col classes='text-right'>
                          <Text classes='text-xs mt-2 font-bold'>
                            {dates.delivered}
                          </Text>
                          {/* @ts-ignore*/}
                          <Tooltip
                            html={
                              <Text classes='text-white'>
                                Estimated to arrive at your doorstep {' '}
                                {dates.delivered}
                              </Text>
                            }
                            animation='fade'
                            position="bottom"
                            arrow={true}
                            arrowSize='big'
                            interactive
                          >
                            <Text
                              span
                              classes='text-sm underline decoration-dashed underline-offset-4 cursor-help'
                            >Delivered!</Text>
                          </Tooltip>
                        </Col>
                      </Box>
                    </Row>
                  </Box>

                  <Box classes='mt-10 mb-2'>
                    <Text classes='text-xs text-primary-gray'>Cost to ship</Text>
                    <Text h3>Free</Text>
                  </Box>

                  <Text classes='p-4 bg-gray-custom-52 my-6 rounded-lg text-sm'>
                    Mori offsets carbon emissions from shipping and packaging on this purchase.
                  </Text>

                  <Box classes='mt-10 space-y-3'>
                    <Row classes='mb-8'>
                      <Box classes='w-1/2'>
                        <Text classes='text-xs text-primary-gray'>Returns & exchanges</Text>
                        <Text h3>Accepted</Text>
                      </Box>
                      <Box classes='w-1/2'>
                        <Text classes='text-xs text-primary-gray'>Return & exchange window</Text>
                        <Text h3>{dates.returnAndExchange} days</Text>
                      </Box>
                    </Row>
                    <Row gap={4} align='center'>
                      <NextImage
                        src='/images/product/hand.png'
                        height={48}
                        width={48}
                      />
                      <Text classes='w-full text-xs leading-5'>
                        <Text b>Mori Purchase Protection:</Text> Shop confidently on Etsy knowing if something goes
                        wrong with an
                        order,
                        we&apos;ve got your back for all eligible purchases — {' '}
                        <Link href='/' underline openNewTab>
                          see program terms
                        </Link>
                      </Text>
                    </Row>
                  </Box>

                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </Box>
  )
}
