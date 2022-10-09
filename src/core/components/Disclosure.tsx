import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/solid'
import { clns } from 'core/helpers';
import { Button } from "./Button";

interface DisclosureProps {
  data: {
    title: string,
    content: string,
  }[]
}

export default function DisclosureCustom({ data }: DisclosureProps) {
  // const { data } = props;

  return (
    <div className='w-[110%]'>
      {/*<div className='w-full'>*/}
      {/*<div className='w-full px-4'>*/}
      <div className='mx-auto w-full max-w-4xl mx-auto rounded-2xl bg-white p-2'>
        {
          data?.map((obj, index) => {
            return <Disclosure
              key={index}
              as='div'
              className='mt-3'
            >
              {({ open }) => (
                <>
                  <Disclosure.Button
                    className='flex w-full justify-between rounded-lg
                     hover:bg-gray-custom-50
                     {/*bg-gray-custom-50 hover:bg-gray-custom-52*/}
                     px-4 py-2 text-left text-sm font-medium text-primary-black
                     focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'
                  >
                    <span className='text-base font-bold md:text-[18px] tracking-wide'>{obj.title}</span>
                    <ChevronUpIcon
                      className={clns('h-5 w-5 text-primary-gray',
                        open ? 'rotate-180 transform' : '',
                      )}
                    />
                  </Disclosure.Button>
                  <Disclosure.Panel
                    className={clns('px-4 pt-4 pb-2 text-base text-primary-gray',
                      'overflow-hidden ease-in-out duration-500 pl-4',
                      open ? 'max-h-60' : 'max-h-0',
                    )}
                  >
                    {obj.content}
                  </Disclosure.Panel>
                </>
              )}
            </Disclosure>
          })
        }
      </div>
    </div>
  )
}
