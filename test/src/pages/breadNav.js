import React, { useState ,Component} from "react";
import "../css/index.less"
const BreadNav = (props)=>{
    console.log(props)
    return(
        <div
            className={'self-title'}
        >
            <div className={'bread-crumbs'}>
            <a className={'home'}
                style={{
                color: 'rgba(0, 0, 0, 0.45)',
                }}
                    onClick={()=>props.props.history.push(`/`)}
            >首页</a>
            <span
                style={{
                marginLeft: '8px',
                marginRight: '8px',
                color: 'rgba(0, 0, 0, 0.45)',
                }}
            >/</span>
            <span
                style={{
                color: props.childtitle?'rgba(0, 0, 0, 0.45)':"",
                }}
            >{props.title}</span>
            {
                props.childtitle?
                <>
                    <span
                        style={{
                        marginLeft: '8px',
                        marginRight: '8px',
                        color: 'rgba(0, 0, 0, 0.45)',
                    }}
                    >/</span>
                    <span>{props.childtitle}</span></>
                    :
                    null
                
            }
            
            </div>
        </div>
    )
    
}
export default BreadNav;