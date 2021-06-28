import {React,useState,useEffect} from 'react';
import {Button, Tabs,Tab,AppBar,Box,Paper,Grid,TextField,FormControlLabel,Checkbox, StepLabel} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Slider from '@material-ui/core/Slider';
import TableFooter from '@material-ui/core/TableFooter';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/styles';
import RefreshIcon from '@material-ui/icons/Refresh';
import binance from './binance';

const useStyles = makeStyles((theme) => ({
  label: {
      margin: "10px",
  },
  root: {
    'input' : {
        padding:0,
    }
  },
  input:{
      padding:0
  },
  td: {
    textAlign:'center',
  }
}));

export default function LimitOrder(props){
    const classes = useStyles();
    const [positionType,setPositionType] = useState("");
    const [price,setPrice] = useState(0);
    const [value, setValue] = useState(0);
    const [amount, setAmount] = useState(0);
    const [amountRate, setAmountRate] = useState(1);
    const [maxAmount, setMaxAmount] = useState(0);
    const [tradeType, setTradeType] = useState(0);
    const [leverage,setLeverage] = useState(1);
    const [type,setType] = useState(false);
    const [realTimeLimit, setRealTimeLimit] = useState(true);
    const [exchange, setExchange] = useState('USDT');
    const [sl,setSl] = useState(0);
    const [slRate,setSlRate] = useState(1);
    const [tp,setTp] = useState(0);
    const [tpRate,setTpRate] = useState(1);

    useEffect(async()=>{
        if(props) {
            // console.log(props.positionType);
            setPositionType(props.positionType);
            setLeverage(props.leverage);
        }
        console.info("롱: ", (await binance.futuresDepth( "BNBUSDT" )).bids[1][0] );
        console.info("숏: ", (await binance.futuresDepth( "BNBUSDT" )).asks[1][0] );
        // console.info( JSON.parse(JSON.stringify(await binance.futuresBalance())).filter(item=> {if(item.asset=="USDT") console.info(item)}) );
        var asset = JSON.parse(JSON.stringify(await binance.futuresBalance()));
        for(var item of asset) {
            if(item.asset=="USDT") {
                setMaxAmount(item.balance);
            }
        }
        await handleRealTimePrice();
    },[]);
    useEffect(()=>{
        console.log(price);
        handleSl();
        handleTp();
    },[price]);
    const handleSl=()=>{
        if(positionType&&positionType=="long") {
            setSl((price-price*(slRate/100)).toFixed(2));
        }else if(positionType&&positionType=="short") {
            setSl((price+price*(slRate/100)).toFixed(2));
        }
    }
    const handleTp=()=>{
        if(positionType&&positionType=="long") {
            setTp((price+price*tpRate/100).toFixed(2));
        }else if(positionType&&positionType=="short") {
            setTp((price-price*tpRate/100).toFixed(2));
        }
    }
    const handleAmount=()=>{
        setAmount(maxAmount*amountRate/100);
    }
    const handleRealTimePrice=async()=>{
        if(positionType&&positionType=="long"&&realTimeLimit) {
            setPrice(parseFloat(parseFloat(((await binance.futuresDepth( "BNBUSDT" )).bids[1][0])).toFixed(2)));
        }else if(positionType&&positionType=="short"&&realTimeLimit) {
            setPrice(parseFloat(parseFloat(((await binance.futuresDepth( "BNBUSDT" )).asks[1][0])).toFixed(2)));
        }
    }
    const handleTradeType = (event, newValue) => {
        setTradeType(newValue);
    };
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleLeverage=(e)=>{
        setLeverage(e.target.value);
    }
    const handleType=(e)=>{
        setType(e.target.value);
    }
    const handleRealTimeLimit = (event) => {
        setRealTimeLimit(event.target.checked);
    };
    const handleSliderChange = (event, newValue) => {
        setAmount(newValue);
    };
    return (
        <>
        <Table>
            <TableBody>
                <TableRow>
                    <TableCell className={classes.td}>
                    <label className={classes.label}>지정가</label>
                    </TableCell>
                    <TableCell>
                    <TextField id="outlined-basic" name="price" variant="outlined" size="small" style={{padding:0}} value={price} className={classes.input} onChange={(e)=>setPrice(parseFloat(e.target.value))}/>
                    </TableCell>
                    <TableCell style={{width:'200px'}}>
                        {/* <FormControlLabel
                            control={
                            <Checkbox
                                checked={realTimeLimit}
                                onChange={handleRealTimeLimit}
                                name="realTimeLimit"
                                color="primary"
                            />
                            }
                            style={{fontSize:'8px'}}
                            label="실시간 자동 지정"
                        /> */}
                        <Button onClick={()=>handleRealTimePrice()}><RefreshIcon /></Button>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className={classes.td}>
                    <label className={classes.label} >수량</label>
                    </TableCell>
                    <TableCell>
                    <TextField id="outlined-basic" name="amount" variant="outlined" size="small" style={{padding:0}} value={amount} onChange={(e)=>setAmount(parseFloat(e.target.value))}/>
                    </TableCell>
                    <TableCell>
                    <FormControl>
        
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={exchange}
                            onChange={(e)=>setAmount(e.target.value)}
                            variant="outlined"
                            style={{width:'100px',textAlign:'center',top:'10px'}}
                            >
                            <MenuItem value='USDT'>USDT</MenuItem>
                            <MenuItem value='BTC'>BTC</MenuItem>
                            </Select><br/>
                        </FormControl>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colspan="2">
                        <Slider
                        value={amountRate}
                        onChange={(e,newValue)=>{console.log(newValue); setAmountRate(newValue); handleAmount();}}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        style={{width:'300px'}}
                        /><label>{amountRate}%</label>
                    </TableCell>
                    <TableCell>
                        <label>최대 가능 수량 {maxAmount}</label>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className={classes.td}><label className={classes.label} >최대 손절비</label></TableCell>
                    <TableCell><label>{(100/leverage).toFixed(2)}%</label></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className={classes.td}><label className={classes.label} >청산가</label></TableCell>
                    <TableCell><label>{positionType&&positionType=="long"?(price-price*100/leverage/100).toFixed(2):(price+(price*100/leverage/100)).toFixed(2)}</label></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className={classes.td}><label className={classes.label} >수수료</label></TableCell>
                    <TableCell><label>{(price*(0.08*leverage/100)).toFixed(2)}</label></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className={classes.td}><label className={classes.label}>본절가</label></TableCell>
                    <TableCell><label>{positionType&&positionType=="long"?(price+(price*0.08*leverage/100)).toFixed(2):(price-price*0.08*leverage/100).toFixed(2)}</label></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{width:'150px',textAlign:'center'}}><label className={classes.label}>손절가</label></TableCell>
                    <TableCell><TextField id="outlined-basic" name="sl" variant="outlined" size="small" value={sl} onChange={(e)=>setSl(e.target.value)}/></TableCell>
                    <TableCell><label>{positionType&&positionType=="long"?"<  청산가":">  청산가"}</label></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colspan="2">
                        <Slider
                                value={slRate}
                                onChange={(e,newValue)=>{
                                    setSlRate(newValue); 
                                    handleSl();
                                }}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                style={{width:'300px'}}
                        /><label>{slRate}%</label>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{width:'150px',textAlign:'center'}}><label className={classes.label}>익절가</label></TableCell>
                    <TableCell><TextField id="outlined-basic" name="tp" variant="outlined" size="small" value={tp} onChange={(e)=>setTp(parseFloat(e.target.value))}/></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colspan="2">
                        <Slider
                                value={tpRate}
                                onChange={(e,newValue)=>{
                                    setTpRate(newValue); 
                                    handleTp();
                                }}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                style={{width:'300px'}}
                        /><label>{tpRate}%</label>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className={classes.td}><label className={classes.label} >총액</label></TableCell>
                    <TableCell><label>{price*amount+(price*(0.08*leverage/100))}</label></TableCell>
                </TableRow>

                <TableRow>
                    <TableCell colspan="3">
                        <Button style={{float:'right'}} variant="contained" color="primary">주문</Button>        
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
        </>
    );
}