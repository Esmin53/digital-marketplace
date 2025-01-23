import { ReactNode } from "react"
import { twMerge } from 'tailwind-merge';

interface MaxWidthWrapperProps {
    children: ReactNode
    className?: string
}

const MaxWidthWrapper = ({children, className}: MaxWidthWrapperProps) => {
  return (
    <div className={twMerge('w-full flex items-center justify-center px-2 xl:px-4', className)}>
        <div className="flex w-full max-w-7xl">
            {children}
        </div>
    </div>
  )
}

export default MaxWidthWrapper