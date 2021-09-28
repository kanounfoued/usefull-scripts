import React, { Component } from "react";

// the lazy loading hoc, a component as parameter.
const lazyLoading = (importComponent) => {
  // return an anonnymous class.
  return class extends Component {
    state = {
      // store the component, we would to return back
      component: null,
    };

    componentDidMount() {
      importComponent().then((imp) => {
        // the imp variable refers to the component we want to return.
        this.setState({ component: imp.default });
      });
    }

    render() {
      // store the compoenent in the C variable.
      const C = this.state.component;
      return C ? <C {...this.props} /> : null;
    }
  };
};

export default lazyLoading;
