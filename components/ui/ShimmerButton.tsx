import React from 'react'

interface ShimmerButtonProps {
    title: string;
    icon?: React.ReactNode;
    position?: string;
    handleClick?: () => void;
    otherClasses?: string;
}

const ShimmerButton: React.FC<ShimmerButtonProps> = ({
    title,
    icon,
    position,
    handleClick,
    otherClasses
}) => {
  return (
    <div>
        <button
          className={`inline-flex h-12 animate-shimmer items-center justify-center rounded-xl border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-6 font-medium cursor-pointer hover:border-gray-200 hover:text-slate-300 duration-300 ease-in-out text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50 gap-1 ${otherClasses || ''}`}
          onClick={handleClick}
        >
          {icon && position === 'left' && <span className="mr-2">{icon}</span>}
          {title}
          {icon && position === 'right' && <span className="ml-2">{icon}</span>}
        </button>
    </div>
  )
}

export default ShimmerButton
