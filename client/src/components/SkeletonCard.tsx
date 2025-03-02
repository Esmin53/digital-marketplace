

const SkeletonCard = ({className}: {className?: string}) => {
    return (
      <div className={`max-w-80 w-full overflow-hidden font-rubik relative flex flex-col gap-1 animate-pulse ${className}`}>

          <div className="w-full aspect-square relative rounded-xl overflow-hidden shadow bg-accent-lightgray/50 ">
            <div className="min-w-24 px-2 h-7 bg-accent-teal-300  absolute bottom-0 right-0 z-40 rounded-tl-md flex items-center justify-center">
              
            </div>
              
          </div>
          <div className=" w-full px-1 py-0.5 text-[#1d2529] flex flex-col cursor-pointer " >
              <div className="bg-accent-lightgray/50 rounded-sm w-32 h-4" />
              <div className="flex items-center justify-between w-full flex-wrap">
                <div className="font-medium w-20 h-3 bg-accent-lightgray/50 rounded-sm" />
                <div className="flex items-center py-1.5">
                  <div className="w-20 h-3 bg-accent-lightgray/50 rounded-sm" />
                </div>
              </div>
          </div>
      </div>
    )
}

export default SkeletonCard