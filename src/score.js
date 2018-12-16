import React from 'react';

class Score extends React.Component {




  render() {
    const predictions = this.props.predictions;

    return(
    <div className='score'>
        <ul>
      {predictions.map((prediction, idx) => {
        return (

          
          <div key={idx}>
            <div className='event-info-prediction'>Prediction {idx + 1}</div>
          {prediction.scores.map((scoreObj, idx1) => {
            return (
              

              <li key={idx1} className='score'>{scoreObj.label}, Score: {scoreObj.score}</li>
              
              );
            })}
          
        
          </div>);
          
        })}
      
        </ul>
    
    </div>
    );
  }
}

export default Score;