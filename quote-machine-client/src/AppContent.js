import React, { Component } from 'react';
import axios from 'axios';
import Radium from 'radium';
import Title from './Title.js'

import '../node_modules/font-awesome/css/font-awesome.min.css'; 

class AppContent extends Component {
  constructor() {
    super();
    this.state = {
      quote: '',
      quoteAuthor: '',
      opacityZero: true
    };
    this.getRandomQuote = this.getRandomQuote.bind(this);
    this.changeBackgroundColor = this.changeBackgroundColor.bind(this)
  }

  getRandomQuote() {    
     axios.get('/api/quotes/random').then(response => {
        this.setState( 
          {
            quote: response.data.quoteText,
            quoteAuthor: response.data.author,
            opacityZero: false
          } );
          setTimeout(_=>this.setState( {opacityZero: true} ),100)
      })
  }

  changeBackgroundColor() {
    function generateRandomColor() {
      var letters = '0123456789ABCDEF';
      var color = '#';
      for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  
    document.getElementById('background').style.backgroundColor = generateRandomColor(); 
  }

  render() {
    return (
        <div className="app" style={ styles.appContent }>          
          {/* <div className="portfolioBar">
            <div className="arrowContainer">
              <a href='https://jake-guss.herokuapp.com/portfolio' className="fa fa-long-arrow-left fa-5x" aria-hidden="true"></a>
            </div>
          </div> */}
          {/* <ParticleContainer style ={styles.particleBackground}></ParticleContainer> */}
          <div style={ styles.aboveParticles }>
              <Title words="QUOTE MACHINE" style={styles.title}/>
              <div  style={ styles.quoteBox }>
                <h2 id="quoteText" className= {!this.state.opacityZero ? "opacity0" : "quoteText"}  style={styles.quoteText  }>{ this.state.quote }</h2>
                <h2 id="quoteAuthor" className={!this.state.opacityZero ? "opacity0" : "quoteAuthor"} style={  styles.quoteAuthor }>{ this.state.quoteAuthor }</h2>
              </div>
              <button className ="button"  onClick={ ()=>{this.getRandomQuote(); this.changeBackgroundColor(); } } style={ styles.button }>Retrieve a Quote</button>
          </div>
        </div>
    );
  }

  componentDidMount = () => {
    // document.getElementById('quoteText').style.opacity = 1;
  }

};



const styles = {
  appContent: {
    textAlign: 'center'
  },

  aboveParticles: {
    zIndex: '9999'
  },

  quoteBox: {
    margin: '0 auto',
    padding: '50px',
    maxWidth: '530px',
    minHeight: '200px',
    backgroundColor: '#FFF586',

  },
  quoteText: {
    fontFamily: 'Fira Sans',
    
  },
  quoteAuthor: {
    textAlign: 'right',
    height: '15%',
    marginTop: '50px',
    fontFamily: 'Fira Sans',
    fontStyle: 'italic'
  },
  button: {
    marginTop: '50px',
    color: 'white',
    backgroundColor: 'blue',
    height: '60px',
    width: '300px',
    borderRadius: '31px',
    borderStyle: 'none',
    fontSize: '30px',
    fontFamily: 'Eczar, serif',
    outline: 'none',
    ':hover': {
                borderStyle:'solid',
                borderWidth: '3px',
                borderColor: 'white',
                cursor: 'pointer' }

  },
  particleBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    zIndex: '-1'
  }
 
}

AppContent = Radium(AppContent);

export default AppContent

