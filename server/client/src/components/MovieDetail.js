import React, { Component, Fragment } from "react";
import styled from "styled-components";
import { Poster } from "./Movie";
import MovieDetailInner from "./MovieDetailInner";
import Overdrive from "react-overdrive";
import * as actions from '../actions';
import { connect } from "react-redux";

class MovieDetail extends Component {
  render() {
    const { movie } = this.props;
    
    return (
      <MovieDetailInner 
        type={'movie'}
        movie={this.props.movie} 
        authenticated={this.props.authenticated} 
        addMovieToWatchList={this.props.addMovieToWatchList}
      />
    );
  }
}

function mapStateToProps({ movies, auth }, ownProps) {
  return {
    movie: movies[ownProps.match.params.id],
    authenticated: auth.authenticated,
  }
}

export default connect(
  mapStateToProps,
  actions
)(MovieDetail)