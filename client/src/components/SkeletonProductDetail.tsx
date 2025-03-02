
const SkeletonProductDetail = () => {
  return (
    <div className="flex-1 h-full flex flex-col sm:flex-row gap-6 xl:gap-10 lg:py-8 xl:py-16">
                <div className='w-full max-w-72 sm:max-w-prose  sm:w-64 sm:h-64 md:w-80 md:h-80 lg:h-96 lg:w-96 aspect-square rounded-lg relative overflow-hidden border border-accent-lightgray/60 shadow-sm mx-auto bg-accent-lightgray/50 animate-pulse' />

                
                <div className="flex-1 flex flex-col md:gap-2 animate-pulse">
                  <div className="w-full flex items-center justify-between flex-wrap mt-1">
                    <div className="w-36 h-4 bg-accent-lightgray/50 rounded-sm" />
                    <div className="w-24 h-3 bg-accent-lightgray/50 rounded-sm" />
                  </div>
                  <div className="h-12 w-44 bg-accent-lightgray/50 rounded-sm mt-1"/>
                  <div className="text-sm font-medium h-2 w-28 bg-accent-lightgray/50 rounded-sm mt-1" />
                  <div className="text-4xl md:text-5xl font-bold font-smooch h-8 w-24 bg-accent-lightgray/50 rounded-sm mt-2"/>
                    <div className="h-3 w-20 bg-accent-lightgray/50 rounded-sm mt-1"/>
                    <div className="w-full flex flex-col gap-1">
                        <div className="h-3 w-full bg-accent-lightgray/50 rounded-sm mt-1" />
                        <div className="h-3 w-full bg-accent-lightgray/50 rounded-sm mt-1" />
                        <div className="h-3 w-full bg-accent-lightgray/50 rounded-sm mt-1" />
                        <div className="h-3 w-2/4 bg-accent-lightgray/50 rounded-sm mt-1" />
                    </div>

                    <div className="w-full max-w-96 rounded-md h-12 mt-auto mb-2 bg-accent-lightgray/50"/>

                </div>
            </div>
  )
}

export default SkeletonProductDetail