import React, { Fragment, HTMLAttributes, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react'

import { Text, Divider, Box, Col, Grid, Row, NextImage } from 'core/components';
import Pagination from 'core/components/Table/Pagination';
import RatingStars from './ProductInfo/RatingStars';
import { cn } from 'core/helpers';
import { Icons } from 'core/components/Icons';

const sortReviews = [
  {
    label: 'Suggested',
    value: 'suggested'
  },
  {
    label: 'Most recent',
    value: 'most recent'
  },
]

interface CustomerReviewProps extends HTMLAttributes<HTMLDivElement> {
}

{/* static data */}
export default function CustomerReview({ className }: CustomerReviewProps) {
  return (
    <Box classes={['mt-12 laptop:w-11/12', className]}>
      <Row justify='between'>
        <Text classes='text-lg tablet:text-2xl mb-4'>Customer Reviews</Text>
        <Box classes='hidden tablet:block'>
          <SortSelect/>
        </Box>
      </Row>

      <Row align='center'>
        <Text>3.8<Text
          span
          classes='sr-only'
        > Average review score </Text>
        </Text>
        <Col classes='ml-4'>
          <RatingStars initialValue={4}/>
          <Text classes='mt-0.5 text-xs text-gray-500'>Based on 48 reviews</Text>
        </Col>
      </Row>

      <Grid
        sx={1}
        lg={1}
        classes='mt-8 gap-x-16 gap-y-4'
      >
        <Divider classes='border-primary-gray'/>
        {
          data.map((o, idx) => {
            return <Fragment key={idx}>
              <Box
                blockquote
                classes='space-y-4 mb-6'
              >
                <RatingStars initialValue={o.customerData.rating}/>
                <Col classes='laptop:col-span-5 desktop:col-span-6 w-11/12'>
                  <Text
                    classes='text-lg laptop:text-2xl mt-2 text-primary-gray font-base sm:mt-0'
                  >{o.customerData.comment}</Text>
                  <Text classes='mt-2 text-primary-gray'>{o.customerData.detailComment}</Text>
                </Col>

                <Row
                  classes='col-span-1 tablet:mb-4 laptop:mb-0'
                  gap={4}
                  align='center'
                >
                  <NextImage
                    width={100}
                    height={100}
                    className='h-10 w-10 mr-3'
                    imgClassName='rounded-full'
                    src={o.customerData.avatar}
                    alt='avatar'
                  />
                  <Text classes='text-xs text-primary-gray'>{o.customerData.name}</Text>
                  <Text classes='text-xs text-primary-gray'>{o.customerData.dateComment}</Text>
                </Row>
              </Box>
            </Fragment>
          })
        }

        <Box classes='flex-center mt-6'>
          <Pagination
            showOnlyButton
            rowsPerPageFromProps={20}
            rowsPerPage={4}
            currentPage={1}
            rowsChecked={4}
            quantityRows={30}
            onPageChange={() => {}}
          />
        </Box>
      </Grid>
    </Box>
  )
}

const SortSelect = () => {
  const [selected, setSelected] = useState(sortReviews[0])

  const focusReviews = () => {
    window.scrollTo({
      top: 400,
      behavior: "smooth",
    });
  };

  return (
    <Listbox
      value={selected}
      onChange={(option) => {
        focusReviews();
        setSelected(option)
      }}
    >
      {({ open }) => (
        <div className='form-select-input m-0'>
          <Listbox.Button
            className='
            relative
            bg-white text-sm
            pl-3 pr-10 tablet:pr-8 text-left cursor-pointer
            dark:bg-black dark:text-white
            rounded-md
            hover:bg-gray-custom-52 py-2'
          >
            <Text span weight='bold' classes=''>Sort by: {selected.label}</Text>
            <span className='ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none'>
            <Icons.chevronDown
              className='h-3 w-3 font-bold'
              aria-hidden='true'
            />
            </span>
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='form-select-input__options'>
              {
                sortReviews.map((option, index) => (
                  <Listbox.Option
                    key={index}
                    value={option}
                    className={({ active }) => cn(
                      active ? 'dark:text-white' : 'text-black dark:text-white',
                      ' hover:bg-gray-custom-50  cursor-default select-none relative py-2 rounded-[5px] pl-3 pr-0'
                    )}
                  >
                    {({ selected, active }) => (
                      <>
                        <Row
                          justify='between'
                          align='center'
                        >
                            <span className={cn(' block truncate')}>
                            {/*<span className={clns(selected ? 'font-semibold' : 'font-normal', ' block truncate')}>*/}
                              {option.label}
                            </span>
                          {selected ? (
                            <Icons.check
                              className='mr-2 h-4 w-4 text-black'
                              aria-hidden='true'
                            />
                          ) : null}
                        </Row>
                      </>
                    )}
                  </Listbox.Option>
                ))
              }
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  )
}

const data = [
  {
    customerData: {
      name: 'Baily',
      dateComment: '12th January, 2024',
      rating: 4,
      comment: 'High quality, comfy, and beautiful!',
      detailComment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam possimus fuga dolor rerum dicta, ipsum laboriosam est error quisquam ipsam asperiores! Iste?',
      avatar: 'https://i.pravatar.cc/300?img=7',
    },
    replyData: null
  },
  {
    customerData: {
      name: 'Maria',
      dateComment: '12th January, 2024',
      rating: 3,
      comment: 'Not for tall people. Not worth the investment',
      detailComment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam possimus fuga dolor rerum dicta, ipsum laboriosam est error quisquam ipsam asperiores! Iste?',
      avatar: 'https://i.pravatar.cc/300?img=10',
    },
    replyData: {
      comment: `Hey there - thanks for your review, though we're sorry to hear about the assembly experience you had. We pride ourselves on simple, quick assembly, and would love to hear more about your experience so we can do better in the future. If you're open to sharing, the team can be reached at support@drop.com. Thank you!`
    }
  },
  // {
  //   customerData: {
  //     name: 'Isaiah',
  //     dateComment: '12th January, 2024',
  //     rating: 5,
  //     comment: 'Great quality, and looks great',
  //     detailComment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam possimus fuga dolor rerum dicta, ipsum laboriosam est error quisquam ipsam asperiores! Iste?',
  //     avatar: 'https://i.pravatar.cc/300?img=4',
  //   },
  //   replyData: null
  // },
  // {
  //   customerData: {
  //     name: 'John Doe',
  //     dateComment: '12th January, 2024',
  //     rating: 3,
  //     comment: `Beautiful rug, but not if you're looking for vibrant colors`,
  //     detailComment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam possimus fuga dolor rerum dicta, ipsum laboriosam est error quisquam ipsam asperiores! Iste?',
  //     avatar: 'https://i.pravatar.cc/300?img=11',
  //   },
  //   replyData: {
  //     comment: `Hi there! Thanks for your feedback, though we're sorry to hear that you're not finding the coffin as\n      comfortable as you'd have hoped! Regarding the comfort, the cushions will soften with a bit of use, so\n    after a few movie nights, they'll start to break-in. That said, if you have any concerns in the coming\nweeks or months, please don't hesitate to contact our Customer Experience Team at support@drop.com.\n  Our goal is always to ensure that you are happy with your coffin, now and later!\n `
  //   }
  // },
]
