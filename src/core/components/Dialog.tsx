import { Dialog } from '@headlessui/react'
import { Transition } from '@headlessui/react'
import { Fragment, ReactNode } from 'react'
import { Box, Row } from './Layout';

interface DialogProps {
  isOpen: boolean,
  children: ReactNode,
  width?: number,
  height?: number,
  noPadding?: boolean,
  nonDarkMode?: boolean,
  preventClose?: boolean,
  style?: object,
  classes?: string,
  closeDialog?: () => void
}

export default function DialogCustom({
  children, style,
  isOpen = false,
  noPadding, width, height,
  nonDarkMode,
  classes,
  closeDialog = () => {},
  preventClose,
  ...others
}: DialogProps) {

  return (
    <Transition
      appear
      show={isOpen}
      as={Fragment}
      {...others}
    >
      <Dialog
        as='div'
        className='relative z-30'
        onClose={preventClose ? () => {
        } : closeDialog}
        {...others}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25'/>
        </Transition.Child>
        <Box classes='fixed inset-0 overflow-y-auto '>
          <Row
            align='center'
            justify='center'
            classes='min-h-full p-4 text-center'
          >
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                style={style}
                className={`dialog-content gradient-to-tl overflow-visible
                  ${noPadding ? 'p-0' : 'p-8'}
                  ${nonDarkMode && 'dialog-content--nonDarkMode'}
                  ${classes}
                  `}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </Row>
        </Box>
      </Dialog>
    </Transition>
  )
}

const Title = ({ title }) => {
  return (
    <Dialog.Title
      as='h3'
      className='dialog-title'
    >
      {title}
    </Dialog.Title>
  )
}

const Content = ({ children }) => <>{children}</>;

DialogCustom.Title = Title;
DialogCustom.Content = Content;
