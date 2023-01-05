import { Dialog } from '@headlessui/react'
import { Transition } from '@headlessui/react'
import { cn } from 'core/helpers';
import { Fragment, ReactNode } from 'react'
import { Box, Row } from './Layout';
import { Icons } from "./Icons";

interface DialogProps {
  isOpen: boolean
  children: ReactNode
  width?: number
  height?: number
  noPadding?: boolean
  nonDarkMode?: boolean
  preventClose?: boolean
  style?: object
  classes?: string
  backdrop?: ReactNode
  closeDialog?: () => void
}

export default function DialogCustom({
  children, style,
  isOpen = false,
  noPadding, width, height,
  // nonDarkMode,
  classes,
  closeDialog = () => {},
  preventClose,
  backdrop,
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
        className='relative z-30 flex justify-center items-center top-0 left-0'
        // className='relative z-30'
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
          {backdrop || <div className='fixed inset-0 bg-black bg-opacity-25'/>}
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
                className={cn('dialog-content gradient-to-tl overflow-visible',
                  noPadding ? 'p-0' : 'p-8',
                  // nonDarkMode && 'dialog-content--nonDarkMode',
                  classes,
                )}
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

const Title = ({ title }: {title: string}) => {
  return (
    <Dialog.Title as='h3' className='dialog-title'>
      {title}
    </Dialog.Title>
  )
}

interface ContentProps {
  children: ReactNode,
  classes?: string,
  closeDialog?: () => void
  hideXIcon?: boolean
}

const Content = ({ children, classes, closeDialog, hideXIcon }: ContentProps) => (
  <div className={cn('relative', classes)}>
    {
      !hideXIcon && <Icons.x
        className='btn-icon--noBg absolute top-3 right-2.5'
        onClick={() => closeDialog()}
      />
    }
    {children}
  </div>
)

DialogCustom.Title = Title;
DialogCustom.Content = Content;
