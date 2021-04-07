import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './App.css';
import Logo from './assets/titlte_groupe.png';
import Instagram from './assets/instagram.png';
import Facebook from './assets/facebook.png';
import Twitter from './assets/twitter.png';
import { Carousel } from 'react-bootstrap';
import LastA from './assets/last/last_a.png';
import LastB from './assets/last/last_b.png';
import Dezeer from './assets/deezer.png';
import Spotify from './assets/spotify.png';
import Bandcamp from './assets/bandcamp.png';
import Youtube from './assets/youtube.png';
import Lilimoon from './assets/Releases/lilimoon.png';
import Soulless from './assets/Releases/soulless.png';
import Skylight from './assets/Releases/skylight.png';
import GroupeDizorder from './assets/groupe.png';
import firebase from 'firebase';
import Concert from './models/Concert';

// import FlagFr from './assets/flag_fr.jpg';
// import FlagEn from './assets/flag_uk.png';

interface StateInterface {
  concerts: Concert[] | undefined
  selectedLang: string,
  text: any
}

class App extends Component {

  public state: StateInterface

  constructor(props: any) {
    super(props);
    this.state = {
      concerts: undefined,
      text: {

      },
      selectedLang: 'en'
    };
    this.handleClickALang = this.handleClickALang.bind(this);
  }

  componentDidMount() {
    firebase.firestore().collection('concert').get().then((queryDocs) => {
      const concerts = queryDocs.docs.map((d) => new Concert(d));
      console.log(concerts);
      this.setState({
        'concerts': concerts
      });
    }).catch((err) => {
      console.log(err);
    });

    firebase.firestore().collection('text').doc(this.state.selectedLang).get().then((doc) => {
      const text = doc.data();
      this.setState({
        'text': text
      });
    });
  }

  render() {
    return (
      <div className="App" style={{ backgroundColor: 'grey', width: '100%', height: '100%' }}>
        <div style={{ width: '100%', height: '100%', backgroundColor: '#444746' }}>

          <div className="top_bar" style={{ width: '100%', backgroundColor: 'black', height: '60px', display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
            <a className="insta"
              href="https://bit.ly/dizorderinstagram"
              style={{ width: '60px', height: '60px' }}
              onClick={() => {
                console.log('instagram')
              }}
            >
              <img src={Instagram} alt='instagram' style={{ width: '60px', height: '60px' }} />
            </a>
            <a className='facebook'
              style={{ marginLeft: '10px', width: '60px', height: '60px' }}
              href="https://bit.ly/dizorderfacebook"
              onClick={() => {
                console.log('facebook')
              }}
            >
              <img src={Facebook} alt={'facebook'} style={{ width: '60px', height: '60px' }} />
            </a>
            <a className='twitter'
              style={{ marginLeft: '10px', width: '60px', height: '60px' }}
              href="https://bit.ly/dizordertwitter"
              onClick={() => {
                console.log('twitter')
              }}
            >
              <img src={Twitter} alt={'twitter'} style={{ width: '60px', height: '60px' }} />
            </a>
            {/* <div className="lang_selector" style={{ height: '100%', marginLeft: '30%', display: 'flex', overflow: 'hidden' }}>
              <img src={FlagEn} alt="Anglais" style={{ width: '60px', height: '60px', marginTop: '0px' }} onClick={() => {
                this.handleClickALang('en');
              }} />
              <img src={FlagFr} alt="Français" style={{ width: '60px', height: '60px', marginLeft: '5px', marginTop: '0px' }} onClick={() => {
                this.handleClickALang('fr');
              }} />
            </div> */}
          </div>

          <div style={{ textAlign: 'center', color: 'white', fontSize: '100px', marginTop: '60px' }}>
            <div style={{ marginLeft: '20%', width: '60%' }}>
              <img src={Logo} alt="Dizorder" style={{ width: '100%' }} />
            </div>
          </div>

          <br />
          <br />


          <div className='pitch_yourself' style={{ textAlign: 'left', marginLeft: '15%', width: '70%', }}>
            {/* border: '1rem solid white', borderRadius: '30px' */}
            <div style={{}}>
              <div style={{ marginLeft: '30px', marginRight: '30px' }}>
                <h3 style={{ color: 'white', marginTop: '30px', fontFamily: 'Aileron' }}>THE BAND: </h3>
                <p className='P_pitch_your_self' style={{ color: 'white', fontFamily: 'Nexa_light' }}>
                  {this.state.text['introduction']}
                </p>
                <br />
                <img src={GroupeDizorder} alt="groupe" style={{ width: '100%', height: '70%', marginBottom: '30px' }} />
                <br />
              </div>
            </div>
          </div>

          <br />
          <br />

          <div className='last_album' style={{ marginLeft: '15%', width: '70%' }}>
            <h3 style={{ color: 'white', fontFamily: 'Aileron' }} > Shop </h3>
            <div style={{ marginTop: '10px', display: 'flex', width: '80%', marginLeft: '10%', color: 'white' }}>
              <div style={{ width: '100%', height: '100%' }}>
                <Carousel>
                  <Carousel.Item>
                    <a href="https://dizorder.bigcartel.com/"><img src={LastA} alt='derniére sortie' style={{ width: '100%', height: '100%', display: 'block' }} /></a>
                    <Carousel.Caption>
                      {/* <h3>Digipack Dizorder</h3> */}
                      {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                    </Carousel.Caption>
                  </Carousel.Item>
                  <Carousel.Item>
                    <a href="https://dizorder.bigcartel.com/"><img src={LastB} alt='derniére sortie' style={{ width: '100%', height: '100%', display: 'block' }} /></a>
                    <Carousel.Caption>
                      {/* <h3>Digipack Dizorder</h3> */}
                      {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                    </Carousel.Caption>
                  </Carousel.Item>
                </Carousel>
              </div>
            </div>
            <div style={{ marginLeft: '10%', width: '80%', marginTop: '20px' }}>
              <div style={{ borderTop: '1px solid #cbcbcb' }}>
                <div style={{ color: 'white' }}>
                  {/* <h3 style={{ color: 'white' }} >Dizorder</h3> */}
                  {/* <h5 style={{ color: 'white' }} >Disponible Maintenat</h5> */}
                </div>
                <br />
                <h3 style={{ fontFamily: 'Aileron', color: 'white' }}>{"Listen"}</h3>
                <div className="listen" style={{
                  width: '100%',
                  color: '#ffffff',
                  fontSize: '16px',
                  lineHeight: '59px',
                  textTransform: 'uppercase',
                  letterSpacing: '4px',
                  textAlign: 'center',
                }}>
                  <a className="dezeer" href="https://bit.ly/dizorderdeezer" style={{ display: 'block', color: '#929292', textDecoration: 'none', borderTop: '1px solid #414141', marginTop: '10px' }}>
                    <img src={Dezeer} alt="dezeer" style={{ width: '10%', height: '10%' }} />
                  </a>
                  <a className="spotify" href="https://open.spotify.com/artist/7k9jy6yMBgIBXSU1JlGEJM?si=yshFZ2A-SfaWWtK-VtMgrA" style={{ display: 'block', color: '#929292', textDecoration: 'none', borderTop: '1px solid #414141', marginTop: '10px' }}>
                    <img src={Spotify} alt="spotify" style={{ width: '10%', height: '10%' }} />
                  </a>
                  <a className="bandcamp" href="https://bit.ly/3fS0wia" style={{ display: 'block', color: '#929292', textDecoration: 'none', borderTop: '1px solid #414141', marginTop: '10px' }}>
                    <img src={Bandcamp} alt="bandcamp" style={{ width: '10%', height: '10%' }} />
                  </a>
                  <a className="youtube" href="https://www.youtube.com/channel/UC5BII7bb_UOYrMrhSgYnxBQ" style={{ display: 'block', color: '#929292', textDecoration: 'none', borderTop: '1px solid #414141', marginTop: '10px' }}>
                    <img src={Youtube} alt="youtube" style={{ width: '10%', height: '10%' }} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className='youtube' style={{ marginTop: '40px', marginLeft: '10%', width: '80%' }}>
            <Carousel
              interval={null}
            >
              <Carousel.Item>
                <iframe width="100%" height="600px" src="https://www.youtube.com/embed/uzQXfiWwrTY" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; allowfullscreen" title='lilimoon'></iframe>
                <Carousel.Caption>
                  {/* <h3>Lili / Moon</h3> */}
                  {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <iframe width="100%" height="600px" src="https://www.youtube.com/embed/RWYF2cAETpk" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; allowfullscreen" title="casa" ></iframe>
                <Carousel.Caption>
                  {/* <h3>My life is going on</h3> */}
                  {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <iframe width="100%" height="600px" src="https://www.youtube.com/embed/yETusgzKUj8" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; allowfullscreen" title="title"></iframe>
                <Carousel.Caption>
                  {/* <h3>The real face</h3> */}
                  {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>

          <div className={"carroussel"} style={{ marginLeft: '30%', width: '40%', marginTop: '40px' }}>
            <Carousel>
              <Carousel.Item>
                <a href="https://dizorder.fanlink.to/LiliMoon"><img src={Lilimoon} alt='Lili_moon' style={{ width: '100%', height: '100%' }} /></a>
                <Carousel.Caption>
                  {/* <h3>Lili / Moon</h3> */}
                  {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <a href="https://dizorder.fanlink.to/SoulLess"><img src={Soulless} alt='Soolless' style={{ width: '100%', height: '100%' }} /></a>
                <Carousel.Caption>
                  {/* <h3>Soul / Less </h3> */}
                  {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <a href="https://dizorder.fanlink.to/SkyLight"><img src={Skylight} alt='Skylight' style={{ width: '100%', height: '100%' }} /></a>
                <Carousel.Caption>
                  {/* <h3>Skylight</h3> */}
                  {/* <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>
          </div>

          {/* border: '1rem solid white', borderRadius: '30px' */}
          <div className="concert" style={{ marginTop: '40px', marginLeft: '15%', width: '70%', }}>
            <div style={{ color: 'white', marginTop: '30px', marginBottom: '30px', marginLeft: '10%', width: '80%', }}>
              <div style={{ borderTop: '1px solid #cbcbcb' }}>
                <div style={{ color: 'white' }}>
                  <br />
                  <h3 style={{ color: 'white', fontFamily: 'Aileron' }} >TOUR</h3>
                </div>
                <div className="listen" style={{
                  width: '100%',
                  color: '#ffffff',
                  fontSize: '16px',
                  lineHeight: '59px',
                  textTransform: 'uppercase',
                  letterSpacing: '4px',
                  textAlign: 'center',
                  // color: '#CCCCCC'
                }}>


                  {/*
                  */}
                  {
                    (this.state.concerts !== undefined && this.state.concerts.length !== 0)
                      ? this.state.concerts.map((aConcert) => {
                        return (
                          <a className="dezeer" href={`${aConcert.link}`} style={{ display: 'block', color: 'white', textDecoration: 'none', borderTop: '1px solid #414141', marginTop: '10px', fontFamily: 'Nexa_bold' }}>
                            {`Le ${aConcert.formatedDate} à ${aConcert.sale} de ${aConcert.lieu}`}
                          </a>
                        );
                      })
                      : <div style={{ textAlign: 'center', }}> No date</div>
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="footer" style={{
            // position: "fixed",
            height: '120px',
            left: 0,
            bottom: 0,
            width: "100%",
            backgroundColor: "black",
            color: '#CCCCCC',
            textAlign: "center",
          }}>
            <div style={{ display: 'flex', width: '100%', height: '100%', fontFamily: 'Nexa_light', fontWeight: 'bold' }}>
              <div style={{ display: 'inline-block', width: "50%", textAlign: 'left' }}>
                <div style={{ marginLeft: '20%', marginTop: '10px' }}>
                  <div><h5>Booking :  dizordermusic@gmail.com</h5></div>
                  <div><h5>Press : dominomedia@gmail.com</h5></div>
                  <div><h5>Management : dizordermusic@gmail.com</h5></div>
                </div>
              </div>
              <div style={{ display: 'inline-block', width: "50%", textAlign: 'center' }}>
                <h5>Subscribe to news letter</h5>
                <input style={{ width: '190px' }} type="text" id="new_letter_input"></input><br></br>
                <button style={{ width: '190px', marginTop: "10px" }} onClick={this.handleClickSubmitNewLetter}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  handleClickALang(lang: string) {
    firebase.firestore().collection('text').doc(lang).get().then((doc) => {
      this.setState({
        'text': doc.data()
      });
    })
  }

  handleClickSubmitNewLetter() {
    const input = document.getElementById('new_letter_input') as HTMLInputElement;
    console.log('click click', input?.value);
    if (input === null) {
      return
    }
    firebase.firestore().collection('new_letter').add({
      'email': input.value
    }).then(() => {
      input.value = "";
      window.alert('you have subscribed to the news letter');
    })
  }
}

export default App;
