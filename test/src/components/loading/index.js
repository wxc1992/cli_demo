import React, {Component} from 'react';
import {Spin, Alert} from 'antd';

class Loading extends React.Component {
	render() {
		return (
			<div className="example">
				<Spin tip="Loading..."  size="large" >
				<Alert
				message="sql管理平台"
				description="sql管理平台欢迎您，页面正在加载中，请您耐心等待，谢谢！"
				type="info"
				/>
				</Spin>
			</div>
		)
	}
}

export default Loading