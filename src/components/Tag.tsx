export type TagProps_t = {
    className?: string;
    label?: string;
    backgroundColorClass?: string;
    textColorClass?: string;
}

export default function Tag({className, label, backgroundColorClass, textColorClass}: TagProps_t) {
    return (
        <div className={`${className && className} ${backgroundColorClass ? backgroundColorClass : 'bg-black'} h-min w-fit py-0.5 px-2 rounded ${textColorClass ? textColorClass : 'text-white'} text-xs text-center font-semibold`}>
            { label }
        </div>
    )
}