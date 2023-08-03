import React, { Fragment, HTMLAttributes, useEffect, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react'
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";

import { Text, Divider, Box, Col, Grid, Row, NextImage, Loading } from 'core/components';
import Pagination from 'core/components/Table/Pagination';
import RatingStars from './ProductInfo/RatingStars';
import { cn } from 'core/helpers';
import { Icons } from 'core/components/Icons';
import WriteReviewDialog from "components/dialog/WriteReviewDialog";
import { useProductContext } from "components/context/ProductContext";
import { useReviews } from "services/product";
import { SORT_BY_REVIEW } from "config/const";

dayjs.extend(localizedFormat)

const sortByReviews = [
  { label: 'Suggested', value: SORT_BY_REVIEW.SUGGESTED },
  { label: 'Most recent', value: SORT_BY_REVIEW.MOST_RECENT },
]

interface CustomerReviewProps extends HTMLAttributes<HTMLDivElement> {
}

export default function CustomerReview({ className }: CustomerReviewProps) {
  const { product } = useProductContext()
  const [params, setParams] = useState({
    productId: product._id,
    page: 1,
    sortBy: sortByReviews[0].value,
    limit: 4,
  })
  const [selected, setSelected] = useState(sortByReviews[0])
  const [rating, setRating] = useState(product.rating)
  const { reviews, total, isLoading, mutate } = useReviews(params)

  const Reviews = () => {
    if (isLoading) {
      return <Row justify='center' classes='my-4'>
        <Loading classes='fill-black h-6 w-6 inline-flex'/>
      </Row>
    }

    return reviews.map((review, idx) => {
      return <Fragment key={idx}>
        <Box
          blockquote
          classes='space-y-4 pb-6 border-b'
        >
          <RatingStars initialValue={review.rating}/>
          <Col classes='laptop:col-span-5 desktop:col-span-6 w-11/12'>
            {
              review.title &&
              <Text classes='text-lg laptop:text-2xl my-2 text-primary-gray font-base sm:mt-0'>{review.title}</Text>
            }
            <Text classes='text-primary-gray'>{review.description}</Text>
          </Col>

          <Row
            classes='col-span-1 tablet:mb-4 laptop:mb-0'
            gap={3}
            align='center'
          >
            {/*<NextImage*/}
            {/*  width={100}*/}
            {/*  height={100}*/}
            {/*  className='h-10 w-10 mr-3'*/}
            {/*  imgClassName='rounded-full'*/}
            {/*  src={review.avatar}*/}
            {/*  alt='avatar'*/}
            {/*/>*/}
            <Text classes='text-xs text-primary-gray'>{review.customerId.name}</Text>
            <Text classes='text-xs text-primary-gray'>·</Text>
            <Text classes='text-xs text-primary-gray'>{dayjs(review.created_at).format('LL')}</Text>
          </Row>
        </Box>
      </Fragment>
    })
  }

  const focusReviews = () => {
    window.scrollTo({
      top: 720,
      behavior: "smooth",
    });
  };

  const SortSelect = () => {
    return (
      <Listbox
        value={selected}
        onChange={(option) => {
          focusReviews();
          setSelected(option)
          setParams({ ...params, sortBy: option.value, page: 1 })
        }}
      >
        {({ open }) => (
          <div className='form-select-input m-0 w-fit'>
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
                  sortByReviews.map((option, index) => (
                    <Listbox.Option
                      key={index}
                      value={option}
                      className={({ active }) => cn(
                        active ? 'dark:text-white' : 'text-black dark:text-white',
                        ' hover:bg-gray-custom-50  cursor-default select-none relative py-2 rounded-[5px] pl-3 pr-0'
                      )}
                    >
                      {({ selected, active }) => (
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

  return (
    <Box classes={['mt-12 laptop:w-11/12', className]}>
      <Row justify='between'>
        <Text classes='text-lg tablet:text-2xl mb-4'>Customer Reviews</Text>
        <Box classes='hidden tablet:block'>
          <SortSelect/>
        </Box>
      </Row>

      <Row align='center'>
        <Text>{rating.toFixed(1)}<Text
          span
          classes='sr-only'
        > Average review score </Text>
        </Text>
        <Col classes='ml-4'>
          <RatingStars initialValue={rating}/>
          {
            total > 0 ?
              <Text classes='mt-0.5 text-xs text-gray-500'>Based on {total} reviews</Text>
              :
              <Text classes='mt-0.5 text-xs text-gray-500'>No reviews yet</Text>

          }
        </Col>

      </Row>

      {
        rating === 0 ?
          <>
            <div className={'border-t-2 mt-3 mb-5'}/>
            <div className='text-left md:text-center'>
              <p>Have your say. Be the first to review the {product.name}.</p>
              <WriteReviewDialog classesBtn={'mt-2'} setRatingParent={setRating} mutateReviews={mutate}/>
            </div>
          </>
          :
          <>
            <WriteReviewDialog classesBtn={'mt-4'} setRatingParent={setRating} mutateReviews={mutate}/>

            <Grid sx={1} lg={1} classes='mt-8 gap-x-16 gap-y-4'>
                                                                 <Divider classes='border-b-2'/>
                                                                 <Reviews/>
              {
                total > params.limit &&
                <Box classes='flex-center mt-6'>
                  <Pagination
                    showOnlyButton
                    rowsPerPage={params.limit}
                    currentPage={params.page}
                    quantityRows={total}
                    onPageChange={(page) => {
                      // focusReviews()
                      setParams({ ...params, page })
                    }}
                  />
                </Box>
              }
                                                                 </Grid>
          </>
      }
    </Box>
  )
}
