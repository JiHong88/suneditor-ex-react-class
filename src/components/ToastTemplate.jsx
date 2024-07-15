import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Toast } from 'react-bootstrap';
import './ToastTemplate.css';
import { CheckCircleOutline, ErrorOutline, Close } from '@mui/icons-material';

class ToastTemplate extends Component {
	constructor(props) {
		super(props);
		this.state = {
			show: false,
		};
	}

	close() {
		this.setState({
			show: false,
		});
	}

	getIcon() {
		switch (this.props.toasts?.type) {
			case 'success':
				return <CheckCircleOutline className={'success mr-1'} />;
			case 'warning':
				return <ErrorOutline className={'warning mr-1'} />;
			case 'danger':
				return <Close className={'danger mr-1'} />;
			default:
				return null;
		}
	}

	componentWillReceiveProps(nextProps) {
		const { toasts } = nextProps;
		if (!toasts) return false;

		const { show, time } = toasts;
		if (this.props.toasts?.show && show) {
			clearTimeout(this.state.showID);
			this.setState({
				show: false,
			});
			this.setState({
				showID: +setTimeout(() => {
					this.setState({
						show: true,
					});
				}, 150),
			});
		} else {
			this.setState({ show });
		}

		if (show && time !== false) {
			this.setState({
				showID: +setTimeout(() => {
					this.setState({
						show: false,
					});
				}, time || 1500),
			});
		}
	}

	render() {
		return (
			<Toast className={`toast-template toast-type-${this.props.toasts?.type}`} show={this.state.show} onClose={this.close.bind(this)}>
				<Toast.Header>
					{this.getIcon()}
					<strong className={'mr-auto'}>{this.props.toasts?.header}</strong>
				</Toast.Header>
				<Toast.Body>{this.props.toasts?.body}</Toast.Body>
			</Toast>
		);
	}
}

export default connect(
	(state) => ({
		toasts: state.toast.toasts,
	}),
	null,
)(ToastTemplate);
