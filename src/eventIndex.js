import React from 'react';
import API from './event_data';
import EventIndexItem from './event_index_item';

class EventIndex extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      filterLabel: ''
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({
      modalIsOpen: true
    });
    
  }


  closeModal() {
    
    this.setState({
      modalIsOpen: false
    });
    
  }

    styleIt(top, left, height1, width1) {
      return ({
        container: {
          position: 'absolute',
          top: `${top*100}%`,
          left: `${left*100}%`,
          height: `${height1*100}%`,
          width: `${width1*100}%`,
          border: '1px solid blue'
        }
      });
    }



  render() {
    const events = API.mockResponse.events;
    
    
    return(
      <div className='event-index-wrapper'>
        <div className='list-header'>Event Predictions</div>
        <input type='text' placeholder='Filter label or score' value={this.state.filterLabel}
        onChange={(e) => this.setState({filterLabel: e.target.value})}
        />
        <ul className='event-index-list'>
        

        
          {events.map((event, idx) => {
            const curdate = new Date();
            const boundaries = event.predictions.map((prediction) => prediction.boundingBox);
            const predictions = event.predictions;
        
            curdate.setTime(event.timestamp * 1000);

            if (this.state.filterLabel) {
              return(
                predictions.map((prediction) => {
                  return(
                    prediction.scores.map((scoreObj, idx2) => {
                      if (scoreObj.label.toLowerCase().includes(this.state.filterLabel.toLowerCase())
                      || scoreObj.score === parseInt(this.state.filterLabel)
                      ) {
                        return (<EventIndexItem key={idx2} event={event} boundaries={boundaries}/>);
                      }
                    })
                  );
                })
              );
            } else {
              return (
                <li key={idx} >
                  <EventIndexItem key={idx} event={event} boundaries={boundaries}/>
                </li>
              );
            }

          })}
        </ul>
      </div>
    );
  }



}

export default EventIndex;