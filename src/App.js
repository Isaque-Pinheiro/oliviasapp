import React from "react";
import Router from "./router";
import { StatusBar, Platform } from "react-native";

export default App = () => {
    return (
        <>
        <StatusBar animated={true}
         backgroundColor="transparent"
         barStyle={"dark-content"}
         translucent
         />
        <Router />
        </>
    );
};
