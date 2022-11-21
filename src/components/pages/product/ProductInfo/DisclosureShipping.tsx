import { Disclosure, Transition } from '@headlessui/react'
import { ChevronUpIcon, GiftIcon } from '@heroicons/react/solid'
import { Box, Col, NextImage, Row } from 'core/components';
// import { Col, NextImage, Row, Tooltip } from 'core/components';
import { cn } from 'core/helpers';

import {
  Tooltip,
} from 'react-tippy';
import TooltipCustom from "../../../../core/components/TooltipCustom";
import * as React from "react";
import moment from "moment";
// import { MdOutlineLocalShipping } from "react-icons/all";

export default function DisclosureShipping() {

  return (
    <div className='w-full laptop:w-[110%]'>
      <div className='mx-auto w-full max-w-4xl mx-auto rounded-2xl bg-white laptop:p-2'>
        <Disclosure
          as='div'
          className='mt-3'
        >
          {({ open }) => (
            <>
              <Disclosure.Button
                className='flex w-full justify-between rounded-lg
                     hover:bg-gray-custom-50
                     laptop:px-4 py-2 font-medium
                     '
              >
                <span className='text-base font-bold md:text-[18px] tracking-wide'>Shipping and return policies</span>
                <ChevronUpIcon
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

                  <div className='mt-10 space-y-3'>
                    <p className='text-sm text-primary-gray underline decoration-dashed underline-offset-4'>
                      Estimated arrival
                    </p>
                    <h2 className=''>
                      {moment().add(3, 'days').format("MMM")} {' '}
                      {new Date().getDate() + 3}-{new Date().getDate() + 8}
                    </h2>

                    <Row align='center'>
                      <GiftIcon className='rounded-full bg-gray-custom-52 p-4 w-6 h-6 p-1.5'/>
                      <div className='flex-auto h-1/2  border-0 border-b-2 border-gray-custom-52 mx-2'></div>
                      <GiftIcon className='rounded-full bg-gray-custom-52 p-4 w-6 h-6 p-1.5'/>
                      {/*<MdOutlineLocalShipping/>*/}

                      <div className='flex-auto h-1/2  border-0 border-b-2 border-gray-custom-52 mx-2'></div>
                      <GiftIcon className='rounded-full bg-gray-custom-52 p-4 w-6 h-6 p-1.5'/>
                    </Row>

                    <Row
                      justify='between'
                      classes='gap-1'
                    >
                      <Col gap={2}>
                        <div className=''>
                          <p className={'font-semibold'}>
                            {moment().subtract(1, 'days').format("MMM")} {' '}
                            {new Date().getDate() - 1}
                          </p>
                          {/*<Tooltip content={'cahkcakchkaclkahlca'}>*/}

                          {/*<TooltipCustom content={<p>ackanckanc</p>}>*/}
                          {/*<li className='text-xl text-gray-700 dark:text-gray-200'>*/}
                          {/*  <current.icon />*/}
                          {/*</li>*/}

                          <Tooltip
                            title="After you place your order, Mori will take 1-2 business days to prepare it for shipment."
                            animation='fade'
                            position="bottom"
                            arrow={true}
                            arrowSize='big'
                            interactive
                            className={`bg-black p-0`}
                            // html={
                            //   <Box
                            //     classes={clns(
                            //       'inline-block rounded-md',
                            //       'max-w-[300px]'
                            //     )}
                            //   >
                            //     After you place your order, Mori will take 1-2 business days to prepare it for shipment.
                            //   </Box>
                            // }
                            // trigger="click"
                          >
                            <p className={'underline decoration-dashed underline-offset-4'}>Order placed</p>
                            {/*</TooltipCustom>*/}

                          </Tooltip>
                        </div>
                      </Col>
                      {/*<div className='w-44 h-1/2 pb-4 border-0 border-b-2 border-white mx-4'></div>*/}

                      <Col classes='text-center ml-[-1rem]'>
                        <p className={'font-semibold'}>

                          {moment().format("MMM")} {' '}
                          {new Date().getDate()}
                          -
                          {new Date().getDate() + 1}
                        </p>
                        <Tooltip
                          title="Mori puts your order in the mail. "
                          animation='fade'
                          position="bottom"
                          arrow={true}
                          arrowSize='big'
                          interactive
                        >
                          <p className='underline decoration-dashed underline-offset-4'>Order ships</p>
                        </Tooltip>
                      </Col>

                      {/*<div className='w-44 h-1/2 pb-4 border-0 border-b-2 border-white mx-4'></div>*/}

                      <Col classes='text-right'>
                        <p className={'font-semibold'}>
                          {moment().add(3, 'days').format("MMM")} {' '}
                          {new Date().getDate() + 3} - {new Date().getDate() + 8}
                        </p>
                        <Tooltip
                          html={
                            <p className='text-white'>
                              Estimated to arrive at your doorstep
                              {moment().add(3, 'days').format("MMM")} {' '}
                              {new Date().getDate() + 3} - {new Date().getDate() + 8}!
                            </p>
                          }
                          animation='fade'
                          position="bottom"
                          arrow={true}
                          arrowSize='big'
                          interactive
                          // className={`bg-black p-0`}
                        >
                          <p className='underline decoration-dashed underline-offset-4 cursor-newTab'>Delivered!</p>
                        </Tooltip>
                      </Col>
                    </Row>
                  </div>

                  <div className='mt-10 space-y-3'>
                    <p className='text-sm text-primary-gray'>
                      Cost to ship
                    </p>
                    <h2 className=''>
                      Free
                    </h2>

                    <p className='p-4 bg-gray-custom-52 my-6 rounded-lg'>
                      Mori offsets carbon emissions from shipping and packaging on this purchase.
                    </p>
                  </div>

                  <div className='mt-10 space-y-3'>
                    <Row classes='gap-x-28 mb-8'>
                      <Box>
                        <p className='text-sm text-primary-gray'>
                          Returns & exchanges
                        </p>

                        <h3 className=''>
                          Accepted
                        </h3>
                      </Box>
                      <Box>
                        <p className='text-sm text-primary-gray'>
                          Return & exchange window
                        </p>
                        <h3 className=''>
                          21 days
                        </h3>
                      </Box>
                    </Row>
                    {/*<p className='text-primary-gray'>*/}
                    {/*  Exceptions may apply*/}
                    {/*</p>*/}

                    <Row
                      gap={4}
                      align='center'
                    >

                      <NextImage
                        src='/images/product/hand.png'
                        height={48}
                        width={48}
                      />

                      <p className='w-full text-sm'>
                        Mori Purchase Protection: Shop confidently on Etsy knowing if something goes wrong with an
                        order,
                        we&apos;ve got your back for all eligible purchases — see program terms
                      </p>
                    </Row>
                  </div>


                </Disclosure.Panel>
              </Transition>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  )
}
