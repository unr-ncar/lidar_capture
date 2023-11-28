export type TagProps_t = {
    label: string;
    backgroundColorClass?: string;
    textColorClass?: string;
}

export default function Tag({label, backgroundColorClass, textColorClass}: TagProps_t) {
    return (
        <div className={`${backgroundColorClass ? backgroundColorClass : 'bg-black'} h-min w-min py-0.5 px-2 rounded`}>
            <p className={`${textColorClass ? textColorClass : 'text-white'} text-xs text-center font-semibold`}>
                { label }
            </p>
        </div>
    )
}