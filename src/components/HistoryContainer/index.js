import React, {Component} from 'react';
import History from '../History';
//import { addResult } from '../../../actions';
import {connect} from "react-redux";

const mapStateToProps = state => ({
    results : state.results.results,
  })
  
  const mapDispatchToProps = dispatch => ({
   // onAddResult: ( res ) => dispatch(addResult( res )),
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(History)