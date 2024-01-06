import {ReactElement} from "react";

export interface TagProps_t {
    iconElement?: ReactElement;
    label: string;
    description?: string;
    backgroundClassName?: string;
    textClassName?: string;
    className?: string;

    onClick?: () => void;
    disabled?: boolean;
}
export function Tag({iconElement, label, description, backgroundClassName, textClassName, className, onClick, disabled = false}: TagProps_t) {
    return (
        <button onClick={onClick} disabled={disabled} className={`${className} ${backgroundClassName}`}>
            <span className={`${textClassName}`}>
                { iconElement }
            </span>
            <div className={`${textClassName}`}>
                <p>
                    { label }
                </p>
                <p>
                    { description }
                </p>
            </div>
        </button>
    )
}