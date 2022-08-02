import React from 'react';
import notfoundImag from '../static/images/404.png'
export default function Notfound(){
    return (
       <div style={{width: '100%',height:'100%'}}>
           <div style={{position:'absolute',left:'50%',top:'50%',transform:'translate(-50%,-50%)'}}>
            <img src={notfoundImag}/>
           </div>
       </div>  
    )
   
}