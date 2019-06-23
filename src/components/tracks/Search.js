import React from 'react'
import {Consumer} from '../../context'

class Search extends React.Component{
    state = {
        trackTitle: ''
    }

    onChange = (e) => {
        this.setState({
            trackTitle: e.target.value
        })
    }

    findTrack = (dispatch, e) => {
        e.preventDefault()

        fetch(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${this.state.trackTitle}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`)
        .then(res => {
            return res.json()
        }).then(res => {
            dispatch({
                type: 'SEARCH_TRACKS',
                payload: res.message.body.track_list 
            })

            this.setState({trackTitle: ''})
        }).catch(error => {
            alert(error)
        })
    }
    
    render(){
        return(
            <Consumer>
                {value => {
                    return (
                        <div className='card card-body mb-4 p-4'>
                            <h1 className='display-4 text-center'>
                                <i className='fas fa-music mr-2'></i>Search For A Song
                            </h1>
                            <p className='lead text-center'>Search lyrics for any song</p>
                            <form onSubmit={this.findTrack.bind(this, value.dispatch)}>
                                <div className='form-group'>
                                    <input className='form-control form-control-lg' placeholder='Song title..' name='trackTitle' value={this.state.trackTitle} onChange={this.onChange}/>
                                </div>
                                <button className='btn btn-lg btn-block btn-primary mb-5'>Get track lyrics</button>
                            </form>
                        </div>
                    )
                }}
            </Consumer>
        )
    }
}

export default Search