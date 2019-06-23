import React from 'react'
const Context = React.createContext()
const reducer = (state, action) => {
    switch(action.type){
        case 'SEARCH_TRACKS':
        return {
            ...state,
            track_list: action.payload,
            heading: 'Search Results'
        }
        default:
            return state
    }
}

export class Provider extends React.Component{
    state = {
        track_list: [] ,
        heading: 'TOP 10 Tracks',
        dispatch: action => this.setState(state => reducer(state, action))
    }

    componentDidMount(){
        fetch(`https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=10&page_size=10&country=it&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`)
        .then(res => {
            return res.json()
        }).then(res => {
            this.setState({track_list: res.message.body.track_list})
        }).catch(error => {
            alert(error)
        })
    }
    
    render(){
        return(
            <Context.Provider value={this.state}>
                {this.props.children}
            </Context.Provider>
        )
    }
}

export const Consumer = Context.Consumer
