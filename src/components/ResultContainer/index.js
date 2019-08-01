import React, {Component} from 'react';
import Result from '../Result';
import {connect} from "react-redux";

const getPrepareData = (arr)=>{
  const first = arr.length ? 0 : null;
  const res = (first == null) ? 'No results': arr[0];
  return res
}

const mapStateToProps = state => ({
    results : getPrepareData(state.results.results),
  })
  
  const mapDispatchToProps = dispatch => ({
   // onAddResult: ( res ) => dispatch(addResult( res )),
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Result)