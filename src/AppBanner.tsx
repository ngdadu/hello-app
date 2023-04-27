import React from "react";

const AppBanner = () => {

    const helloWorld = () => {
        window.location.href = "/fire"
    }

    return (<>
        <h1 onClick={ () => helloWorld() }>Hello world!</h1>
        <div>test version 0.0.1</div>
    </>);
}
export default AppBanner;