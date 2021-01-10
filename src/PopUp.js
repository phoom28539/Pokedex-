import React, { Component } from 'react'
// import {Modal,Button,Form} from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css'
import ProgressBar from './progressbar.js'
import './PopUp.css'
import cute from './cute.png'
import searchimg from './search.png'


class PopUp extends Component {
    constructor(props){

        super(props);
        this.state = {
            Info2 : this.props.Info,
            searchkey:'',
            showadd : [false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false,false]
            
        }
    }
    
    setsearch(value){
    this.setState({
        searchkey : value
    })
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


    setshowadd = (index) =>{
        const x = this.state.showadd;
        x[index] = true;
        this.setState({
            showadd: x
        })
        };

    setnotshowadd = (index) =>{
        const x = this.state.showadd;
        x[index] = false;
        this.setState({
            showadd: x
        })
        };

    
    transfertopokedex = (id,name) => {
        let x;
        for(let i=0;i<this.state.Info2.length;i++){
            if(this.state.Info2[i].name.toLowerCase() === name.toLowerCase()) {
                x=i; 
                break;
            }
        }
        this.props.pokedex.push(this.state.Info2[x]);
        this.setState({Info2 : this.state.Info2.filter((info,index) => info.name.toLowerCase() !==name.toLowerCase())}); 
        this.props.Info.splice(x,1);
    }
    

    render() {

        let filterinfo = this.state.Info2.filter((detail) => {
            if(this.state.searchkey === '') return this.state.Info2
            return detail.name.toLowerCase().indexOf(this.state.searchkey.toLowerCase()) !== -1 || detail.type.toLowerCase().indexOf(this.state.searchkey.toLowerCase()) !== -1;
        })
        return (
                <div className="outside-modal">
               <div className="modal" id="style-1">
                   <header>
                       <center>
                        <input className="searchbar" type='text' value={this.state.searchkey}  placeholder="Find pokemon"  onChange={e => this.setsearch(e.target.value)}/>
                        <img id="searchimg"src={searchimg}></img>
                      </center>
                    </header>
                   
                    <div className="content">
                    {filterinfo.map((info,index) => (
                        <div className="card-container"  onMouseEnter = {() => this.setshowadd(index)} onMouseLeave={() => this.setnotshowadd(index)} >
                            <div className="left-image">
                                <img className='img'src={info.imageUrl} />
                            </div>
                            <div className="right-information">
                                <span className="name">{info.name}</span>

                                {this.state.showadd[index] && (<a id="add" href="##" onClick={() => this.transfertopokedex(index,info.name)}>Add</a>)}

                                <div id="R"><div id="label">HP </div><ProgressBar  bgcolor='#f3701a' completed={this.setHp(info.hp)} ></ProgressBar></div>
                                <div id="R"><div id="label">STR </div><ProgressBar  bgcolor='#f3701a' completed={this.getlength(info.attacks)*50} ></ProgressBar></div>
                                <div id="R"><div id="label">WEAK </div><ProgressBar  bgcolor='#f3701a' completed={this.getlength(info.weaknesses)*100} ></ProgressBar></div>
                                
                                <div id="R">{this.printemoji(this.setHp(info.hp),this.getdamage(info.attacks),this.getlength(info.weaknesses))}</div>
                                
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            </div>
           
            
       
        )
    }
        
}
export default PopUp;