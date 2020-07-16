import React,{Component} from 'react';
import  './App.css';
import currencies from './Currency';
import { Select,MenuItem,TextField,Typography,Grid } from '@material-ui/core';

class App extends Component{
  
  constructor(){
  super();
  this.state={baseCurrency:'USD',fromSymbol:"$",exhangeData:[],toCurrency:'BSD',toSymbol:'$',amount:0}
  }

  async getData(){
    const url='https://v6.exchangerate-api.com/v6/f1dca5591411bba028e1475a/latest/USD'
    let response=await fetch(url)
    let data=await response.json()
    console.log(data)
    return data
  }

  exhange(amount,from,to){
 return amount*1/from*to

  }
   componentDidMount(){
    this.getData().then(data => this.setState({exhangeData:data}) )
    
  }

update(event){
  let val;
if(event===null){ val=0}
else{ val=parseFloat(event.target.value) } 
const rates=this.state.exhangeData["conversion_rates"]

if(rates && val ){
//console.log("Data")
//console.log(event.target.value)
const from=parseFloat(rates[this.state.baseCurrency])
const to=parseFloat(rates[this.state.toCurrency])
const convertedCurrency=this.exhange(val,from,to).toString()
this.setState({amount:convertedCurrency})
const baseSymbol=currencies.filter(item => item.code===this.state.baseCurrency)
const exchangeSymbol=currencies.filter(item => item.code===this.state.toCurrency)
console.log(exchangeSymbol[0]["symbol_native"])
this.setState({fromSymbol:baseSymbol[0]["symbol_native"].toString(),toSymbol:exchangeSymbol[0]["symbol_native"].toString() })
}

}

  handleBaseChoice(event){
    this.setState({baseCurrency:event.target.value})
    this.setState({amount:0})
  }

  handletoChoice(event){
    this.setState({toCurrency:event.target.value})
    this.setState({amount:0})

  }
  
render(){

  return (
    <div className="App">
    <div className="DisplayConatiner"> 
    <Grid    container direction="row"  alignItems="center"> 
    <Grid item xs={7}>
    <Typography style={{fontSize:80}}>{ this.state.toSymbol.concat(Math.round(this.state.amount * 100) / 100) }</Typography>
    </Grid>
    <Grid item xs={2} >
    <Select defaultValue={this.state.toCurrency } style={{flex:1}} value={this.state.toCurrency} onChange={(event) => this.handletoChoice(event)} >
      {
        currencies.map(item =>(
          <MenuItem value={item.code} label={item.name_plural}>{item.name_plural}</MenuItem>

        ))
      }
      
    </Select> 
    </Grid> 
    </Grid>
    </div> 
    <Grid  direction="row" item xs={13} sm={15}>
    <TextField  placeholder="Enter Amount" defaultValue={0} onChange={(event)=>{this.update(event)}}></TextField>
    <Select defaultValue={this.state.baseCurrency }  value={this.state.baseCurrency} onChange={(event) => this.handleBaseChoice(event)} >
      {
        currencies.map(item =>(
          <MenuItem value={item.code} label={item.code}>{ "".concat(item.symbol_native).concat(" ").concat(item.name_plural)}</MenuItem>

        ))
      }
    </Select> 
    
    </Grid>
    </div>
  );
}}

export default App;
