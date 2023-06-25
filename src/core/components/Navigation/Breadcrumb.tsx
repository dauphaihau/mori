import { Link } from 'core/components';
import { cn } from "core/helpers";

interface BreadcrumbProps {
  data: {
    path?: string,
    name: string,
  }[],
  classes?: string
}

const Breadcrumb = ({ data, classes }: BreadcrumbProps) => {
  if (data.length <= 1) return null
  return (
    <nav
      aria-label='Breadcrumb'
      className={cn('flex', classes)}
    >
      <ul className='inline-flex items-center space-x-1'>
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
                    hoverUnderline
                    href={path}
                    className='inline-flex items-center text-sm'
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
                    <span className='mx-2'>/</span>
                    <span className='text-sm'>{name}</span>
                  </div>
                </li>

              )
            }
            return (
              <li key={index}>
                <div className='flex items-center'>
                  <span className='mx-2'>/</span>
                  <Link
                    hoverUnderline
                    className='text-sm'
                    href={path}
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
