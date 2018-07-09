import React from 'react';
import {connect} from "react-redux";
import './transfer.css';
import ChooseToken from "../../Common/ChooseToken/ChooseToken";
import {setToken} from "../../../actions/transfer";

class Transfer extends React.Component {

	changeToken(e) {
		this.props.setToken(e.target.value);
	}

	render() {
		const {username, selectedToken, amountToken} = this.props;
		return (
			<div className="container_transfer">
				<div className="header_transfer">
					<div className="title_transfer">
						TRANSFER TO ACCOUNT
					</div>
				</div>
				<div className="body_transfer">

					<div className="form-line_transfer">
						<div className="label_transfer">
							From
						</div>
						<div className="field_transfer">
							<div className="at_transfer">
								@
							</div>
							<input className="input_transfer" value={username} disabled={true}/>
						</div>
					</div>

					<div className="form-line_transfer">
						<div className="label_transfer">
							To
						</div>
						<div className="field_transfer">
							<div className="at_transfer">
								@
							</div>
							<input className="input_transfer" ref={ref => this.recipient = ref}/>
						</div>
					</div>

					<div className="form-line_transfer">
						<ChooseToken selectedToken={selectedToken}
						             amount={amountToken}
						             onChange={this.changeToken.bind(this)}/>
					</div>

					<div className="form-line_transfer">
						<div className="label_transfer">
							Amount
						</div>
						<div className="field_transfer">
							<input className="input_transfer" ref={ref => this.amount = ref} pattern="[0-9.]" placeholder="Amount"/>
						</div>
					</div>
					<div className="account-balance_transfer">
						Balance: 2345 STEEM
					</div>

					<div className="field-description_transfer">
						This memo is public
					</div>
					<div className="form-line_transfer">
						<div className="label_transfer">
							Memo
						</div>
						<div className="field_transfer">
							<input className="input_transfer" ref={ref => this.memo = ref} placeholder="memo"/>
						</div>
					</div>

					<div className="form-line_transfer">
						<div className="label_transfer">
							Active key
						</div>
						<div className="field_transfer">
							<input className="input_transfer" ref={ref => this.activeKey = ref} placeholder="Active Key"/>
						</div>
					</div>

					<button>Ok</button>
				</div>
			</div>
		);
	}
}


const mapStateToProps = state => {
	const {balance, sbd_balance} = state.userProfile.profile || {};
	const {token} = state.transfer;
	return {
		steem: balance,
		sbd: sbd_balance,
		selectedToken: token,
		amountToken: '323.01'
	}
};

const mapDispatchToProps = dispatch => {
	return {
		setToken: token => {
			dispatch(setToken(token))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Transfer);
