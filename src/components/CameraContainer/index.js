import React, {Component} from 'react';
import Camera from '../Camera';
import { addResult } from '../../actions';
import {connect} from "react-redux";

const mapStateToProps = state => ({
    results : state.results,
  })
  
  const mapDispatchToProps = dispatch => ({
    onAddResult: ( res ) => dispatch(addResult( res )),
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Camera)