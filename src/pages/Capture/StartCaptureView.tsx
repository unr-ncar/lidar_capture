import SensorSelection from "../../components/SensorSelection.tsx";

export default function StartCaptureView() {
    return (
        <div className='flex flex-col gap-4'>
            <SensorSelection />
            <SensorSelection />
            <SensorSelection />
        </div>
    )
}