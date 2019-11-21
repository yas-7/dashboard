import React from 'react';

class Notification extends React.Component {

  componentDidUpdate (prevProps, prevState) {
    const { message } = this.props;
    if (message) {
      if (message !== prevProps.message) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => this.props.hideMessage(), 3000);
    }
  }

  render () {
    const { message } = this.props;
    if (message) {
      return (
        <div className="notification">
          <div className="notification__content">{message}</div>
        </div>
      );
    }
    return null;
  }
}

export default Notification;
