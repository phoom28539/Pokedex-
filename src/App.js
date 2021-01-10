import React, { Component } from 'react'

import './App.css'
import PopUp from './PopUp' 
import ProgressBar from './progressbar2.js'
import axios from 'axios'
import cute from './cute.png'
const COLORS = {
  Psychic: "#f8a5c2",
  Fighting: "#f0932b",
  Fairy: "#c44569",
  Normal: "#f6e58d",
  Grass: "#badc58",
  Metal: "#95afc0",
  Water: "#3dc1d3",
  Lightning: "#f9ca24",
  Darkness: "#574b90",
  Colorless: "#FFF",
  Fire: "#eb4d4b"
}

class App extends Component {

  state = {
    seen:false,
    showx : [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false],
    pokedex:[],
    Info: []
  };

  componentDidMount(){ //ทำงานหลังrender กรณีไม่มีการupdate state
    this.getdata();
  }
  getdata(){
      let URL="http://localhost:3030/api/cards"
      axios.get(URL).then(res => { 
          console.log(res);
          this.setState({Info:res.data.cards});
        });
  }

  togglePop = ()=> {
    if (!this.state.seen) {
      document.addEventListener("click", this.handleOutsideClick, false);
    } else {
      document.removeEventListener("click", this.handleOutsideClick, false);
    }

    this.setState(prevState => ({
      seen: !prevState.seen
    }));
  };

  handleOutsideClick = e => {
    if (!this.node.contains(e.target)) this.togglePop();
  };

  setshowx = (index) =>{
    const x = this.state.showx;
    x[index] = true;
    this.setState({
        showx: x
    })
    };

  setnotshowx = (index) =>{
      const x = this.state.showx;
      x[index] = false;
      this.setState({
          showx: x
      })
      };

  transfertosearchlist = (id,name) => {
    let x;
    for(let i=0;i<this.state.pokedex.length;i++){
        if(this.state.pokedex[i].name.toLowerCase() === name.toLowerCase()) {
            x=i; 
            break;
        }
    }
    this.state.Info.push(this.state.pokedex[x]);
    this.setState({pokedex : this.state.pokedex.filter((info,index) => info.name.toLowerCase() !==name.toLowerCase())}); 
    
}

  getlength(val){

    if(val)
        return val.length;
    else{
        return 0;
    }
}

  getdamage(array){
      let damage=0;
      if(array){
          for(let i=0;i<array.length;i++){
              if(array[i].damage != ""){
                  let d = array[i].damage
                  if(d[d.length-1]==='+' || d[d.length-1]==='×'){
                      d=d.slice(0,d.length-1);
                  }
                  damage+=Number(d);
              }
              
          }
      }
      return damage;
  }

  setHp(hp){
      if(hp==="None") hp=0;
      if(hp>100) hp=100;
      if(hp<0) hp=0;
      return hp;
  }

  printemoji(hp,dmg,weakness){
      
      let x= Math.ceil(((hp/10)+(dmg/10)+10-(weakness))/5)
      let emoji= [];
      for(let i=0;i<x;i++){
          emoji.push(<img className='emoji'src={cute} />);
      }
      return emoji
  }

  render() {
    return (
      <div className="App" id="style-1">
        <header>
          <h1 className="title">My Pokedex</h1>
        </header>
        <div className="container2">
          {this.state.pokedex.map((info,index)=>(
            <div className="card-container2" onMouseEnter = {() => this.setshowx(index)} onMouseLeave={() => this.setnotshowx(index)}  >
              <div className="left-image2">
                  <img className='img2'src={info.imageUrl} />
              </div>
              <div className="right-information2">
                  <span className="name2">{info.name}</span>
                  {this.state.showx[index] && (<a id="add" href="##" onClick={() => this.transfertosearchlist(index,info.name)}>X</a>)}
                  <div id="R"><div id="label2">HP </div><ProgressBar  bgcolor='#f3701a' completed={this.setHp(info.hp)} ></ProgressBar></div>
                  <div id="R"><div id="label2">STR </div><ProgressBar  bgcolor='#f3701a' completed={this.getlength(info.attacks)*50} ></ProgressBar></div>
                  <div id="R"><div id="label2">WEAK </div><ProgressBar  bgcolor='#f3701a' completed={this.getlength(info.weaknesses)*100} ></ProgressBar></div>
                  <div id="R">{this.printemoji(this.setHp(info.hp),this.getdamage(info.attacks),this.getlength(info.weaknesses))}</div>
              </div>
          </div>
          ))}
        </div>
        <div className="bottom-bar">
          <div className="bottom-circle" >
            <a className="plus" href="##" onClick={this.togglePop} >+</a>
          </div>
        </div>
                
        {this.state.seen && (
          <div className="overlay"></div>
        )}
        <div ref={node => {this.node = node;}}>
          {this.state.seen && (<PopUp Info={this.state.Info} pokedex={this.state.pokedex}/>)}
        </div>
      </div>
    )
  }
}

export default App
