import React, { useState } from "react";
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from "react-hot-toast";

import { Dialog, Button, Text, Input, Box, Row, NextImage } from 'core/components';
import Textarea from "core/components/Input/Textarea";
import { cn, formatDollarUS } from "core/helpers";
import { config } from "config";
import { useProductContext } from "components/context/ProductContext";
import { postReview } from "services/product";
import { LoginRegisterDialog } from "./index";
import { useAuth } from "components/context/authContext";

export const reviewSchema = Yup.object().shape({
  description: Yup.string().required('Review is required'),
  rating: Yup.number().min(1, 'Rating must be greater than or equal to 1')
});

type FormData = Yup.InferType<typeof reviewSchema>

interface WriteReviewDialogProps {
  mutateReviews: () => void
  setRatingParent: (averageStars) => void
  classesBtn?: string
}

const WriteReviewDialog = ({ mutateReviews, setRatingParent, classesBtn }: WriteReviewDialogProps) => {
  const { product } = useProductContext()
  const [isLoading, setIsLoading] = useState(false)
  const [showDialog, setShowDialog] = useState(false)
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const { isAuthenticated } = useAuth()

  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const {
    register, handleSubmit, reset, setValue, setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(reviewSchema),
    // @ts-ignore
    defaultValues: { rating: 0 }
  });

  async function onSubmit(values: FormData) {
    setIsLoading(true)
    if (!values.title) {
      delete values.title
    }

    values.productId = product._id as never
    const { status, message, data } = await postReview(values)
    setIsLoading(false)

    if (status === 200) {
      setRatingParent(data.averageStars)
      toast.success('Thanks for the Review!')
      mutateReviews()
      closeDialog()
    } else {
      toast.error(message ?? 'Ooops, something went wrong!')
    }
  }

  const checkKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit(onSubmit)()
    }
  };

  const Product = () => {
    return (
      <Row classes='mb-4 pb-4 border-b'>
        <Box classes='relative group bg-light rounded-lg p-1 cursor-pointer '>
          {
            product?.images &&
            <NextImage
              width={96}
              height={96}
              src={config.hostStaticSource + product.images[0]}
              alt={product.name}
              className={'h-24 w-24 tablet:h-28 tablet:w-28 m-0'}
              objectFit={'contain'}
            />
          }
        </Box>
        <Box classes='ml-4 w-[64%]'>
          <Text classes='text-gray-600 text-sm m-0 w-80'>{product.name}</Text>
          {
            product.salePrice ?
              <div className='mb-2 mt-1'>
                <Text span classes='text-gray-500 text-sm mr-2'>
                  Unit price:
                </Text>
                <Text span classes='text-primary-red text-sm mr-2'>
                  {formatDollarUS(product.salePrice)}
                </Text>
                <Text span classes='text-gray-500 text-sm line-through'>
                  {formatDollarUS(product.price)}
                </Text>
              </div>
              :
              <Text classes='text-gray-500 text-sm mb-2 mt-1'>
                Unit price: {formatDollarUS(product.price)}
              </Text>
          }
        </Box>
      </Row>
    )
  }

  const RatingInput = () => {
    const ActiveStar = () => {
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-6 h-6 text-primary-black'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'
          />
        </svg>
      )
    }
    const Star = () => {
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='w-6 h-6 text-gray-200'
          viewBox='0 0 20 20'
          fill='currentColor'
        >
          <path
            d='M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z'
          />
        </svg>
      )
    }

    return (
      <div className="mb-4">
        <label className='text-gray-700 font-bold block'>
          Overall rating <span className={'text-red-500'}>*</span>
        </label>
        {[...Array(5)].map((star, index) => {
          index += 1;
          return (
            <button
              type="button"
              key={index}
              onDoubleClick={() => {
                setRating(0);
                setHover(0);
              }}
              onClick={() => {
                // @ts-ignore
                setValue('rating', index)
                if (index > 0) {
                  // @ts-ignore
                  setError('rating', '')
                }
                setRating(index)
              }}
              onMouseEnter={() => setHover(index)}
              onMouseLeave={() => setHover(rating)}
            >
              {index <= (hover || rating) ? <ActiveStar/> : <Star/>}
            </button>
          );
        })}
        {errors?.rating?.message && <p className='text-red-500 text-sm mt-2'>{errors.rating.message}</p>}
      </div>
    )
  }

  const closeDialog = () => {
    setRating(0)
    setHover(0);
    reset()
    setShowDialog(false)
  }

  return (
    <>
      {
        !isAuthenticated && <LoginRegisterDialog
          showLoginDialog={showLoginDialog}
          setShowLoginDialog={setShowLoginDialog}
        />
      }

      <Dialog
        isOpen={showDialog}
        closeDialog={closeDialog}
        classes='absolute top-[40%] left-1/2 -translate-x-2/4 -translate-y-2/4'
        noPadding
      >
      <Dialog.Content
        classes='px-6 py-4 lg:p-8'
        closeDialog={closeDialog}
      >
        <Box>
          <h1 className='font-bold text-xl mb-8'>Leave a review</h1>
          <Product/>
          <form
            onKeyDown={(e) => checkKeyDown(e)}
            onSubmit={handleSubmit(onSubmit)}
          >
            <RatingInput/>
            <Textarea
              label='Your review'
              name='description'
              required
              register={register}
              rows={5}
              disabled={isLoading}
              helperText={errors?.description?.message}
            />
            <Input
              disabled={isLoading}
              label='Review title'
              name='title'
              register={register}
              helperText={errors?.title?.message}
              description={'Summarize your review in 150 characters or less.'}
            />

            <Row justify='end' classes='mt-8 gap-2'>
              <Button
                classes='w-fit '
                isLoading={isLoading}
                type='submit'
                text='Post your review'
              />
              <Button
                type='button'
                disabled={isLoading}
                onClick={closeDialog}
                text='Cancel'
                variant='secondary'
              />
            </Row>
          </form>
        </Box>
      </Dialog.Content>
    </Dialog>

    <div
      onClick={() => {
        if (!isAuthenticated) {
          setShowLoginDialog(true)
          return
        }
        setShowDialog(true)
      }}
      className={cn('cursor-pointer underline underline-offset-4 hover:opacity-60', classesBtn)}
    >
      Write a review
    </div>
    </>
  );
}

export default WriteReviewDialog;
