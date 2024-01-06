import Map from "../../components/Map.tsx";


export default function StatusCaptureView() {
    return (
        <div className='flex flex-col h-full max-h-full md:flex-row'>
            <Map center={[39.538639, -119.817014]} zoom={18} scrollWheelZoom={false} zoomControl={false}
                 dragging={false} attributionControl={false}
                 className='hidden md:block md:basis-1/2 md:h-full lg:basis-auto lg:grow'/>
            <div
                className='grow overflow-y-auto md:basis-1/2 lg:basis-auto lg:grow-0 lg:w-3/4 lg:max-w-[400px]'>
                <p className='h-[2000px]'>
                    StatusCaptureView
                </p>
            </div>
        </div>
    )
}