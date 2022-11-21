import { Disclosure, Transition } from '@headlessui/react'
import { CubeTransparentIcon, HandIcon } from '@heroicons/react/outline';
import { ChevronUpIcon } from '@heroicons/react/solid'
import { Row } from 'core/components';
import { cn } from 'core/helpers';

export default function DisclosureHighlights() {
  return (
    <div className='w-full laptop:w-[110%]'>
    {/*<div className='w-[110%]'>*/}
      <div className='mx-auto w-full max-w-4xl mx-auto rounded-2xl bg-white laptop:p-2'>
        <Disclosure
          as='div'
          className='mt-3'
        >
          {({ open }) => (
            <>
              <Disclosure.Button
                className='flex w-full justify-between rounded-lg hover:bg-gray-custom-50 laptop:px-4 py-2 font-medium'
              >
                <span className='text-base font-bold md:text-[18px] tracking-wide'>Highlights</span>
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

                  <div className='mt-1 space-y-3'>

                    <Row gap={4} align='center'>
                      <HandIcon width={18} height={18}/>
                      <p className='w-full text-sm'>Handmade</p>
                    </Row>

                    <Row gap={4}>
                      <CubeTransparentIcon width={18} height={18}/>
                      <p className='w-full text-sm'>
                        Materials: Ceramic, Craquelure, Handmade Art Urn, Glazed, Handcrafted, Terracotta, Earthenware,
                        Stoneware, Pottery, Porcelain, Clay, Raku, Art Urn Raku
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
