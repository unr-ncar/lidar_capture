import Tag from "./Tag.tsx";

export default function SensorSelection() {
    return (
        <label className='flex flex-row gap-3 place-items-center bg-neutral-100 py-2 px-3 rounded-md'>
            <input type='checkbox' className='w-4 h-4' />
            <div className='flex flex-row justify-between w-full items-center'>
                <p className='flex font-semibold leading-tight'>
                    Virginia Street &bull; Artemisa Way
                </p>
                <Tag className='' label='SW' />
            </div>
        </label>
    )
}