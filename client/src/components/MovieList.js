import React, { Component } from 'react';
import styled from 'styled-components';
import Movie from './Movie';
import { connect } from 'react-redux';
import * as actions from '../actions';
import InfiniteScroll from 'react-infinite-scroller';
// import _ from 'lodash';

class MovieList extends Component {
  state = {
    hasMore: true
  };
  // This was causing it to load page 1 twice
  // componentDidMount() {
  //   this.props.fetchMovies();
  // }

  createMovieArray = movies => {
    const moviesArray = [];

    for (let movie in movies) {
      moviesArray.push(movies[movie]);
    }
    moviesArray.sort((a, b) => {
      return b.popularity - a.popularity;
    });
    return moviesArray;
  };

  loadItems = page => {
    if (page < this.props.totalPages || this.props.totalPages === 0) {
      this.props.fetchMovies(page);
    } else {
      this.setState({ hasMore: false });
    }
  };

  render() {
    // const movies = _.map(this.props.movies, m => {
    //   return <Movie id={m.id} key={m.id} title={m.title} img={m.poster_path} />;
    // });

    // My solution to the 'de-lodashing' problem
    const movies = this.createMovieArray(this.props.movies).map(m => {
      return <Movie id={m.id} key={m.id} title={m.title} img={m.poster_path} />;
    });

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadItems}
        hasMore={this.state.hasMore}
      >
        <MovieGrid>{movies}</MovieGrid>
      </InfiniteScroll>
    );
  }
}

function mapStateToProps(state) {
  return { movies: state.movies, totalPages: state.total_pages };
}

export default connect(
  mapStateToProps,
  actions
)(MovieList);

const MovieGrid = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 2em;
  margin: 0 auto;
`;
