import React, { Component } from 'react';
import styled from 'styled-components';
import Movie from './Movie';
import { connect } from 'react-redux';
import * as actions from '../actions';
// import _ from 'lodash';
import InfiniteScroll from 'react-infinite-scroller';

class MovieList extends Component {
  state = {
    hasMoreItems: true
  };

  // componentDidMount() {
  //   this.props.fetchMovies();
  // }

  loadItems = page => {
    if (page < this.props.totalPages || this.props.totalPages === 0) {
      this.props.fetchMovies(page);
    } else {
      this.setState({ hasMoreItems: false });
    }
  };

  createMoviesArray = movies => {
    const moviesArray = [];
    for (let movie in movies) {
      moviesArray.push(movies[movie]);
    }
    moviesArray.sort((a, b) => {
      return b.popularity - a.popularity;
    });
    return moviesArray;
  };

  render() {
    // const movies = _.map(this.props.movies, m => {
    //   return <Movie id={m.id} key={m.id} title={m.title} img={m.poster_path} />;
    // });

    const movies = this.createMoviesArray(this.props.movies).map(m => {
      return <Movie id={m.id} key={m.id} title={m.title} img={m.poster_path} />;
    });

    return (
      <InfiniteScroll
        loadMore={this.loadItems}
        pageStart={0}
        hasMore={this.state.hasMoreItems}
      >
        <MovieGrid>{movies}</MovieGrid>
      </InfiniteScroll>
    );
  }
}

const mapStateToProps = state => {
  return { movies: state.movies, totalPages: state.total_pages };
};

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
