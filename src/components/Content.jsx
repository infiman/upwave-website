import PropTypes from 'prop-types';
import React from 'react';

class Content extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    registerAnimation: PropTypes.func.isRequired,
    skipAnimation: PropTypes.bool,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
    skipAnimation: false,
  };

  timeout = 0;

  state = {
    transitionStarted: false,
  };

  componentDidMount() {
    this.props.registerAnimation(this.props.name, this.transitionShouldStart);
  }

  transitionShouldStart = routerCallback => {
    this.setState({
      transitionStarted: true,
    },
    () => this.timeout = setTimeout(
      () => routerCallback(this.props.name), 500)
    );
  }

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  render() {
    const { className, skipAnimation } = this.props;
    const { transitionStarted } = this.state;

    return (
      <section
        className={`box-transition${skipAnimation ? ' ' : ' box-animation'}${transitionStarted ? ' box-animation-fade-out' : ''}${' ' + className}`}
      >
        {this.props.children}
      </section>
    );
  }
}

export default Content;
