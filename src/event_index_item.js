import React from 'react';
import Moment from 'react-moment';
import Modal from 'react-modal';
import Score from './score';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'rgb(31, 131, 170)',
    width: 'auto'
    
  }
};

class EventIndexItem extends React.Component{
 constructor(props) {
   super(props);

   this.state = {
     modalIsOpen: false
   };

   this.openModal = this.openModal.bind(this);
   this.closeModal = this.closeModal.bind(this);
 }

 componentWillMount() {
   Modal.setAppElement('body');
 }

   styleIt(top, left, height, width) {
     return ({
       container: {
         position: 'absolute',
         top: `${top*100}%`,
         left: `${left*100}%`,
         height: `${height*100}%`,
         width: `${width*100}%`,
         border: '2px solid rgb(24, 165, 78)'
       }
     });
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


 render() {
    const curdate = new Date();
    curdate.setTime(this.props.event.timestamp * 1000);
    const image = {backgroundImage: `url(${this.props.event.imageSource})`};
   return(
    <div style={image } className='event-index-container'>
      <div className='stream-title'>
      </div> 
      

    <button className='modal-button'onClick={this.openModal}>
        <div className='stream-title-text'>

        {this.props.event.videoStream} 
        </div>
    
      <div className='time'>
        <Moment format='MMM DD, YYYY @ hh:mm A'>{curdate}</Moment>
      </div>
      <div className='prediction-text'>
        View Predictions
      </div>
    </button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <div className='modal-close'>
            <div className='x-text' onClick={this.closeModal}>X</div>
          </div>    
            <div className='event-wrapper2'>
            
              <div className='event-container'>

          
                {this.props.boundaries.map((boundary, idx2) => {
                  return(  
                  <div className='' key={idx2} 
                  style={this.styleIt(boundary.top, boundary.left, boundary.height, boundary.width).container
                  }></div>
                  ); 
                })}
              
              
                <img src={this.props.event.imageSource} className='event-image' alt='event'/>
              </div>
              
              <div className='event-info'>

              
                <div className='event-info-title'>{this.props.event.videoStream}</div>
                <Score predictions={this.props.event.predictions} />
              </div>
          </div>
        </Modal>



    </div>
   );
 }




}


export default EventIndexItem;