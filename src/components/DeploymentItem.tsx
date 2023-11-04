import {Deployment} from "../pages/CapturePage.tsx";
import {useState} from "react";

type DeploymentItemProps = {

    selected: boolean;
    value?: Deployment;

}
export default function DeploymentItem({selected, value}: DeploymentItemProps) {

    const [toggle, setToggle] = useState<boolean>(false);

    const handleClick = (event) => {

        if (toggle) {
            setToggle(false)
        } else {
            setToggle(true)
        }
    }

    return (
        <label>
            <input onChange={handleClick} type='checkbox' className='peer hidden' checked={toggle} defaultChecked={false} />
            <div className='peer-checked:bg-slate-400 '>
                <p className='font-semibold '>
                    SW
                </p>
            </div>
        </label>
    )
}