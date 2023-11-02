export default function RecordingStatus() {

    return (
        <div className='flex flex-row gap-2 items-center'>
            <div className='bg-rose-400 w-3 h-3 rounded-full'>
                <div  className='bg-rose-500 w-3 h-3 rounded-full animate-ping' />
            </div>
            <p className='font-semibold text-rose-500 text-sm'>
                Recording
            </p>
        </div>
    )
}