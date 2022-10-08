import { Menu, Transition } from '@headlessui/react'
import React, { forwardRef, Fragment, ReactNode, useEffect, useRef } from 'react'

interface MenuDropdownProps {
  options: {
    label: string,
    value: string | number,
    href: string,
    feature: () => void,
    element: ReactNode,
  }[],
  children: ReactNode,
  trigger?: ReactNode
}

const Trigger = ({ children }) => {
  return <div>
    <Menu.Button className='menu-dropdown'>{children}</Menu.Button>
  </div>
}

const Item = ({ children }) => {

  return <Transition
    as={Fragment}
    enter='transition ease-out duration-100'
    enterFrom='transform opacity-0 scale-95'
    enterTo='transform opacity-100 scale-100'
    leave='transition ease-in duration-75'
    leaveFrom='transform opacity-100 scale-100'
    leaveTo='transform opacity-0 scale-95'
  >
    <Menu.Items className='menu-items'>
      <div className='p-1'>
        <Menu.Item>
          {({ active }) => (
            <button className={`menu-items__item group ${active ? 'text-gray-700 bg-light-200' : 'text-black'} `}>
              <div className='text-base ml-2 mr-4'>
                {children}
              </div>
            </button>
          )}
        </Menu.Item>
      </div>
    </Menu.Items>
  </Transition>
}

const Dropdown = forwardRef((props: MenuDropdownProps, ref) => {
  const { options, trigger, children } = props;
  const someInternalRef = useRef('someValue').current;

  useEffect(() => {
    if (!ref) return;
    typeof ref === 'function' ? ref(someInternalRef) : (ref.current = someInternalRef);
    return () => typeof ref === 'function' ? ref(null) : (ref.current = null);
  }, [someInternalRef, ref])

  return (
    <Menu
      as='div'
      className='menu'
    >
      {children}
    </Menu>
  )
})

Dropdown.Trigger = Trigger;
Dropdown.Item = Item;

export default Dropdown
