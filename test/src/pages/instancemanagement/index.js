import React, { useState, useRef, useEffect} from 'react';
import {Route, Switch,withRouter} from "react-router-dom";
const Instancemanagement = (props)=>{
  
  return(
    <>
       <Switch>
          <Route path='/instancemanagement/instancelist'  exact={true}  component={global.Instancelist} />
        </Switch>
    </>
  )
};
export default withRouter(Instancemanagement);
