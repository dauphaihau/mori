import { Link } from 'core/components';
import { cn } from "core/helpers";

interface BreadcrumbType {
  data: {
    path?: string,
    name: string,
  }[],
  classes?: string
}

const Breadcrumb = ({ data, classes }: BreadcrumbType) => {
  if (data.length <= 1) return null
  return (
    <nav
      // className='flex'
      className={cn('flex', classes)}
      aria-label='Breadcrumb'
    >
      <ul className='inline-flex items-center space-x-1 md:space-x-3'>
        {
          data.map(({ path, name }, index) => {
            // first link
            if (index === 0) {
              return (
                <li
                  className='inline-flex items-center'
                  key={index}
                >
                  <Link
                    underline
                    href={path}
                    className=' inline-flex items-center text-sm text-primary-gray hover:text-gray-900 dark:text-gray-custom-52'
                  >
                    {name}
                  </Link>
                </li>
              )
            }
            // last link
            if (data.length - 1 === index) {
              return (
                <li key={index}>
                  <div className='flex items-center'>
                    <p className='pt-1'>/</p>
                    <div
                      className='dark:text-gray-custom-501 text-primary-black dark:text-white ml-1 text-sm font-medium md:ml-2'
                    >
                      {name}
                    </div>
                  </div>
                </li>

              )
            }
            return (
              <li key={index}>
                <div className='flex items-center'>
                  <p className='pt-1'>/</p>
                  <Link
                    underline
                    href={path}
                    className='dark:text-gray-custom-52 text-primary-gray ml-1 text-sm  hover:text-primary-black md:ml-2'
                  >
                    {name}
                  </Link>
                </div>
              </li>
            )
          })
        }
      </ul>
    </nav>
  );
}

export default Breadcrumb;
