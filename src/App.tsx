import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './App.css';
import Logo from './assets/titlte_groupe.png';
import Instagram from './assets/instagram.png';
import Facebook from './assets/facebook.png';
import Twitter from './assets/twitter.png';
import { Carousel } from 'react-bootstrap';
import Dezeer from './assets/deezer.png';
import Spotify from './assets/Spotify.png';
import Bandcamp from './assets/Bandcamp.png';
import Youtube from './assets/Youtube.png';
import GroupeDizorder from './assets/groupe.png';
import firebase from 'firebase';
import Concert from './models/Concert';
import { isMobile } from 'react-device-detect';

interface StateInterface {
  concerts: Concert[] | undefined
  selectedLang: string,
  text: any,
  shopsItem: string[],
  releasesItem: string[]
}

class App extends Component {

  public state: StateInterface

  constructor(props: any) {
    super(props);
    this.state = {
      concerts: undefined,
      text: {

      },
      shopsItem: [],
      releasesItem: [],
      selectedLang: 'en'
    };
    this.handleClickALang = this.handleClickALang.bind(this);
  }

  componentDidMount() {
    firebase.auth().signInAnonymously().then((user) => {
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

      firebase.storage().ref().child('shops').listAll().then((list) => {
        const urlsPromise = list.items.map((aItem) => aItem.getDownloadURL());
        Promise.all(urlsPromise).then((res) => {
          console.log(res);
          this.setState({
            'shopsItem': res
          });
        });
      });

      firebase.storage().ref().child('releases').listAll().then((list) => {
        const urlsPromise = list.items.map((aItem) => aItem.getDownloadURL());
        Promise.all(urlsPromise).then((res) => {
          this.setState({
            'releasesItem': res
          });
        });
      })
    }).catch((err) => {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="App" style={{ backgroundColor: 'grey', width: '100%', height: '100%' }}>
        <div style={{ width: '100%', height: '100%', backgroundColor: '#1E1E1E' }}>

          <div className="top_bar" style={{ width: '100%', backgroundColor: 'black', height: (isMobile) ? '100px' : '70px', display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
            <a className="insta"
              href="https://www.instagram.com/dizorderofficial/"
              style={{ width: (isMobile) ? '40px' : '20px', height: (isMobile) ? '40px' : '20px', lineHeight: (isMobile) ? '100px' : '70px' }}
              onClick={() => {
                console.log('instagram')
              }}
            >
              <img src={Instagram} alt='instagram' style={{ width: (isMobile) ? '40px' : '20px', height: (isMobile) ? '40px' : '20px' }} />
            </a>
            <a className='facebook'
              style={{ marginLeft: '15px', width: (isMobile) ? '40px' : '20px', height: (isMobile) ? '40px' : '20px', lineHeight: (isMobile) ? '100px' : '70px' }}
              href="https://www.facebook.com/DizorderOfficial/"
              onClick={() => {
                console.log('facebook')
              }}
            >
              <img src={Facebook} alt={'facebook'} style={{ width: (isMobile) ? '40px' : '20px', height: (isMobile) ? '40px' : '20px' }} />
            </a>
            <a className='twitter'
              style={{ marginLeft: '15px', width: (isMobile) ? '40px' : '20px', height: (isMobile) ? '40px' : '20px', lineHeight: (isMobile) ? '100px' : '70px' }}
              href="https://twitter.com/dizordermusic"
              onClick={() => {
                console.log('twitter')
              }}
            >
              <img src={Twitter} alt={'twitter'} style={{ width: (isMobile) ? '40px' : '20px', height: (isMobile) ? '40px' : '20px' }} />
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

          <div className='youtube' style={{ marginTop: '40px', marginLeft: '15%', width: '70%' }}>
            <h3 style={{ color: 'white', fontFamily: 'Aileron', fontSize: (isMobile) ? "4rem" : "3rem" }} >WATCH OUT NEW MUSIC VIDEO NOW !</h3>
            <iframe width="100%" height="600px" src="https://www.youtube.com/embed/2CFNv6vw7Es" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; allowfullscreen" title='lilimoon'></iframe>
          </div>
          <br />

          <div className='pitch_yourself' style={{ textAlign: 'left', marginLeft: '15%', width: '70%', }}>
            {/* border: '1rem solid white', borderRadius: '30px' */}
            <div style={{}}>
              <div style={{ marginLeft: '30px', marginRight: '30px' }}>
                <h3 style={{ color: 'white', marginTop: '30px', fontFamily: 'Aileron', fontSize: (isMobile) ? "6rem" : "4rem" }}>THE BAND</h3>
                <p className='P_pitch_your_self' style={{ color: 'white', fontFamily: 'Nexa_light', textAlign: "justify", textJustify: "inter-character", fontSize: (isMobile) ? "2rem" : "1rem" }}>
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

          <div className='shop' style={{ marginLeft: '15%', width: '70%' }}>
            <h3 style={{ color: 'white', fontFamily: 'Aileron', fontSize: (isMobile) ? "6rem" : "4rem" }} > Shop </h3>
            <div style={{ marginTop: '10px', marginLeft: (isMobile) ? "0%" : "20%", display: 'flex', width: (isMobile) ? '100%' : '60%', color: 'white' }}>
              <div style={{ width: '100%', height: '100%' }}>
                <Carousel>
                  {this.state.shopsItem.map((aUrl, index) => (
                    <Carousel.Item key={index}>
                      <a href="https://dizorder.bigcartel.com/"><img src={aUrl} alt='last release' style={{ width: '100%', height: '100%', display: 'block' }} /></a>
                      <Carousel.Caption>

                      </Carousel.Caption>
                    </Carousel.Item>
                  ))
                  }

                </Carousel>
              </div>
            </div>
            <br />
            <br />
            <div style={{ marginLeft: '10%', width: '80%', marginTop: '40px' }}>
              <div style={{ borderTop: '1px solid #cbcbcb' }}>
                <div style={{ color: 'white' }}>
                  {/* <h3 style={{ color: 'white' }} >Dizorder</h3> */}
                  {/* <h5 style={{ color: 'white' }} >Disponible Maintenat</h5> */}
                </div>
                <br />
                <h3 style={{ fontFamily: 'Aileron', color: 'white', fontSize: (isMobile) ? "6rem" : "4rem" }}>{"Listen"}</h3>
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
                    <img src={Dezeer} alt="dezeer" style={{ width: (!isMobile) ? '30%' : '70%', height: (!isMobile) ? '30%' : '70%' }} />
                  </a>
                  <a className="spotify" href="https://open.spotify.com/artist/7k9jy6yMBgIBXSU1JlGEJM?si=yshFZ2A-SfaWWtK-VtMgrA" style={{ display: 'block', color: '#929292', textDecoration: 'none', borderTop: '1px solid #414141', marginTop: '10px' }}>
                    <img src={Spotify} alt="spotify" style={{ width: (!isMobile) ? '30%' : '70%', height: (!isMobile) ? '30%' : '70%' }} />
                  </a>
                  <a className="bandcamp" href="https://bit.ly/3fS0wia" style={{ display: 'block', color: '#929292', textDecoration: 'none', borderTop: '1px solid #414141', marginTop: '10px' }}>
                    <img src={Bandcamp} alt="bandcamp" style={{ width: (!isMobile) ? '30%' : '70%', height: (!isMobile) ? '30%' : '70%' }} />
                  </a>
                  <a className="youtube" href="https://www.youtube.com/channel/UC5BII7bb_UOYrMrhSgYnxBQ" style={{ display: 'block', color: '#929292', textDecoration: 'none', borderTop: '1px solid #414141', marginTop: '10px' }}>
                    <img src={Youtube} alt="youtube" style={{ width: (!isMobile) ? '30%' : '70%', height: (!isMobile) ? '30%' : '70%' }} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className='youtube' style={{ marginTop: '40px', marginLeft: '15%', width: '70%' }}>
            <h3 style={{ color: 'white', fontFamily: 'Aileron', fontSize: (isMobile) ? "6rem" : "4rem" }} >VIDEO</h3>
            <Carousel>
              {/* <Carousel.Item>
                <iframe width="100%" height="600px" src="https://www.youtube.com/embed/2CFNv6vw7Es" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; allowfullscreen" title='lilimoon'></iframe>
                <Carousel.Caption>
                </Carousel.Caption>
              </Carousel.Item> */}
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

          <div className={"carroussel"} style={{ marginLeft: (isMobile) ? '15%' : '27.5%', width: (isMobile) ? '70%' : '45%', marginTop: '40px' }}>
            <h3 style={{ color: 'white', fontFamily: 'Aileron', fontSize: (isMobile) ? "6rem" : "4rem" }} >RELEASES</h3>
            <Carousel>
              {
                this.state.releasesItem.sort((a, b) => (a < b) ? -1 : 1).map((aUrl, index) => {
                  const links = ['https://dizorder.fanlink.to/MoonPhases', 'https://dizorder.fanlink.to/LiliMoon', 'https://dizorder.fanlink.to/SoulLess', 'https://dizorder.fanlink.to/skylight',];
                  return (
                    <Carousel.Item>
                      <a href={links[index]}><img src={aUrl} alt={aUrl} style={{ width: '100%', height: '100%' }}></img></a>
                    </Carousel.Item>
                  );
                })
              }
            </Carousel>
          </div>

          {/* border: '1rem solid white', borderRadius: '30px' */}
          <div className="concert" style={{ marginTop: '40px', marginLeft: '15%', width: '70%', }}>
            <div style={{ color: 'white', marginTop: '30px', marginBottom: '30px', marginLeft: '10%', width: '80%', }}>
              <div style={{ borderTop: '1px solid #cbcbcb' }}>
                <div style={{ color: 'white' }}>
                  <br />
                  <h3 style={{ color: 'white', fontFamily: 'Aileron', fontSize: (isMobile) ? "6rem" : "4rem" }} >GIGS</h3>
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
            <div style={{ display: 'flex', width: '100%', height: '100%', fontFamily: 'Nexa_light', fontWeight: 'bold', fontSize: (isMobile) ? "6rem" : "4rem" }}>
              <div style={{ display: 'inline-block', width: "50%", textAlign: 'left' }}>
                <div style={{ marginLeft: '20%', marginTop: '10px' }}>
                  <div><h5>Booking :  dizordermusic@gmail.com</h5></div>
                  <div><h5>Press : dominomedia@gmail.com</h5></div>
                  <div><h5>Management : dizordermusic@gmail.com</h5></div>
                </div>
              </div>
              <div style={{ display: 'inline-block', width: "50%", textAlign: 'right', fontSize: '1rem' }}>
                <div style={{ marginRight: "20%", marginTop: "10px" }}>
                  <div><h5>Subscribe to newsletter</h5></div>
                  <div><input style={{ width: '220px' }} type="text" id="new_letter_input"></input></div>
                  <div><button style={{ width: '220px', marginTop: "10px" }} onClick={this.handleClickSubmitNewLetter}>Submit</button></div>
                </div>
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
