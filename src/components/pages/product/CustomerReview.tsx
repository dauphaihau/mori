import { Text, Divider, Box, Col, Grid, Row, NextImage } from 'core/components';
import Pagination from 'core/components/Table/Pagination';
import RatingStars from "./ProductInfo/RatingStars";
import React, { Fragment } from "react";
import { clns } from "core/helpers";

const CustomerReview = () => {
  return (
    <Box>
      <Text
        weight='bold'
        classes='text-lg tablet:text-2xl mb-4'
      >Customer Reviews</Text>
      <Row align='center'>
        <Text weight='medium'>3.8<Text
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
        sx={1} lg={1}
        classes='mt-8 gap-x-16 gap-y-12'
      >
        <Divider classes='border-primary-gray'/>

        {
          data.map((o, idx) => {
            return <Fragment key={idx}>
              <Box blockquote>
                <Grid sx={1} lg={6} xl={7}>
                  <Row classes='col-span-1 tablet:mb-4 laptop:mb-0'>
                    <NextImage
                      width={100}
                      height={100}
                      className='h-10 w-10 mr-3'
                      imgClassName='rounded-full'
                      src={o.customerData.avatar}
                      alt='avatar'
                    />
                    <Col>
                      <RatingStars initialValue={o.customerData.rating}/>
                      <Box classes='mt-2'>
                        <Text classes='text-xs text-primary-gray'>{o.customerData.name}</Text>
                        <Text classes='text-xs text-primary-gray'>{o.customerData.dateComment}</Text>
                      </Box>
                    </Col>
                  </Row>
                  <Col classes='laptop:col-span-5 desktop:col-span-6'>
                    <Text
                      classes='text-lg laptop:text-2xl mt-2 text-primary-gray font-base sm:mt-0'
                    >{o.customerData.comment}</Text>
                    <Text classes='mt-2 text-primary-gray'>{o.customerData.detailComment}</Text>
                  </Col>
                </Grid>
                {
                  o.replyData &&
                  <Grid
                    sx={1} lg={6} xl={7}
                    classes='mt-6 rounded-lg bg-gray-custom-52 p-4 laptop:pl-0'
                  >
                    <Row classes='col-span-1 laptop:pl-4'>
                      <Text classes='h-10 w-10 flex-center text-white bg-black rounded-full mr-3'>D</Text>
                      <Box classes='mt-2'>
                        <Text classes='text-xs text-primary-gray'>Mori</Text>
                        <Text classes='text-xs text-primary-gray'>12th January, 2024</Text>
                      </Box>
                    </Row>
                    <Box classes='laptop:col-span-5 desktop:col-span-6 mt-3 laptop:mt-0'>
                      <Text classes='mt-2 text-primary-gray'>
                        {o.replyData.comment}
                      </Text>
                    </Box>
                  </Grid>
                }
              </Box>
              <Divider classes={clns('border-primary-gray', data.length - 1 === idx && 'hidden')}/>
            </Fragment>
          })
        }

        <Box classes="flex-center mt-6">
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

export default CustomerReview

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
  {
    customerData: {
      name: 'Isaiah',
      dateComment: '12th January, 2024',
      rating: 5,
      comment: 'Great quality, and looks great',
      detailComment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam possimus fuga dolor rerum dicta, ipsum laboriosam est error quisquam ipsam asperiores! Iste?',
      avatar: 'https://i.pravatar.cc/300?img=4',
    },
    replyData: null
  },
  {
    customerData: {
      name: 'John Doe',
      dateComment: '12th January, 2024',
      rating: 3,
      comment: `Beautiful rug, but not if you're looking for vibrant colors`,
      detailComment: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ullam possimus fuga dolor rerum dicta, ipsum laboriosam est error quisquam ipsam asperiores! Iste?',
      avatar: 'https://i.pravatar.cc/300?img=11',
    },
    replyData: {
      comment: `Hi there! Thanks for your feedback, though we're sorry to hear that you're not finding the coffin as\n      comfortable as you'd have hoped! Regarding the comfort, the cushions will soften with a bit of use, so\n    after a few movie nights, they'll start to break-in. That said, if you have any concerns in the coming\nweeks or months, please don't hesitate to contact our Customer Experience Team at support@drop.com.\n  Our goal is always to ensure that you are happy with your coffin, now and later!\n `
    }
  },
]
