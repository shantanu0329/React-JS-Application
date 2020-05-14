import React from 'react';
import PacmanLoader from "react-spinners/PacmanLoader";

function Loader() {

    return (<div>
            <div className="loadit">
                <PacmanLoader
                css={""}
                size={30}
                color={"red"}
                loading={true}
                />
            </div>
        </div>
    );
}

export default Loader;
