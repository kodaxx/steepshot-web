import React from 'react';
import {connect} from 'react-redux';
import Modal from './Modal/Modal';
import {withRouter} from 'react-router-dom';
import {closeAllModals} from '../../actions/modal';

class Modals extends React.Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const {history} = this.props;
    this.unsubscribeFromHistory = history.listen(this.handleLocationChange);
    this.handleLocationChange(history.location);
  }

  componentWillUnmount() {
    if (this.unsubscribeFromHistory) this.unsubscribeFromHistory();
  }

  handleLocationChange = () => {
    if (this.props.modals.length > 0) {
      this.props.closeAllModals();
    }
  };

  componentWillReceiveProps(newProps) {
    if (Object.keys(newProps.modals).length) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }

  render() {
    let modals = [];
    for (let key in this.props.modals) {
      modals.push(<Modal key={key} index={key}/>);
    }
    return (
      <div className="modals-component_mod">
        {modals}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    modals: state.modals,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeAllModals: () => {
      dispatch(closeAllModals());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Modals));
