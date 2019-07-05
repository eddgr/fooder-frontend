import React from 'react'

import adapter from '../services/adapter'

import SearchVenueCard from '../components/SearchVenueCard'

// needs to do a fetch request to the backend and filter out results

// local state

export default class Search extends React.Component {
  state = {
    results: true,
    venues: [],
    filteredVenues: [],
    search: ''
  }

  componentDidMount() {
    adapter.fetchRestaurants()
      .then(data => {
        this.setState({
          venues: data,
          filteredVenues: data
        })
      })
  }

  // HELPER FUNCTIONS
  handleSearchInput = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSearchSubmit = event => {
    event.preventDefault()

    const filterTheVenues = this.state.venues.filter(venue => {
      return venue.name.toLowerCase().includes(this.state.search.toLowerCase())
      // toLowerCase on name and search to unify search results
    })

    this.setState({
      filteredVenues: filterTheVenues,
      search: '',
    })
  }

  showAllVenues = () => {
    let results = this.state.filteredVenues.map(venue => {
      return (
        <SearchVenueCard
          key={venue.id}
          venue={venue} />
      )
    })

    return results
  }
  // end HELPER FUNCTIONS

  render() {
    console.log("SearchContainer state", this.state)
    return (
      <div>
        <form onSubmit={this.handleSearchSubmit} className="form-inline">
          <div className="input-group">
            <input
              type="text"
              name="search"
              onChange={this.handleSearchInput}
              value={this.state.search}
              className="form-control rounded-left border-right-0"
              placeholder="Find a venue by name" />
            <button className="btn-info rounded-right"><i className="fas fa-search text-light"></i></button>
          </div>
        </form>

        {this.showAllVenues()}
      </div>
    )
  }
}
