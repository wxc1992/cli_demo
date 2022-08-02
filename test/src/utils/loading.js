import React, {Component} from 'react';
import {Spin, Alert} from 'antd';

class Loading extends React.Component {
	render() {
		return (
			<div className="example">
				<Spin tip="Loading..."  size="large" >
				<Alert
				message="loading..."
				description="页面正在加载中,请耐心等待"
				type="info"
				/>
				</Spin>
			</div>
		)
	}
}

export default Loading