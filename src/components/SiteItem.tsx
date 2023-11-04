import DeploymentItem from "./DeploymentItem.tsx";

export function SiteItem() {
    return (
        <div className='flex flex-row bg-white rounded-md shadow-md p-4'>
            <div>
                <div>
                    <p>
                        Artemisia Way
                    </p>
                    <p>
                        <span>
                            Site ID: 3
                        </span>
                    </p>
                </div>
                <p>
                    Reno, NV
                </p>
                <div>

                </div>
            </div>
            <div>
                <DeploymentItem selected={true} />
                <DeploymentItem selected={true} />
            </div>
        </div>
    )
}