import {React,useState,useEffect} from 'react';
import {Button, Tabs,Tab,AppBar,Box,Paper,Grid,TextField,FormControlLabel,Checkbox} from '@material-ui/core';
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

export default function MarketOrder (){
    const classes = useStyles();
    const [value, setValue] = useState(0);
    const [amount, setAmount] = useState(0);
    const [tradeType, setTradeType] = useState(0);
    const [leverage,setLeverage] = useState(1);
    const [type,setType] = useState(false);
    const [realTimeLimit, setRealTimeLimit] = useState(true);
    const [exchange, setExchange] = useState('USDT');
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
                    <label className={classes.label}>현재 시장가</label>
                    </TableCell>
                    <TableCell>
                    <label className={classes.label}>현재 시장가</label>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className={classes.td}>
                    <label className={classes.label} >수량</label>
                    </TableCell>
                    <TableCell>
                    <TextField id="outlined-basic" name="amount" variant="outlined" size="small" style={{padding:0}}/>
                    </TableCell>
                    <TableCell>
                    <FormControl>
        
                            <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={exchange}
                            //   onChange={handleChange}
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
                        value={amount}
                        onChange={handleSliderChange}
                        valueLabelDisplay="auto"
                        aria-labelledby="range-slider"
                        style={{width:'300px'}}
                        /><label>{amount}%</label>
                    </TableCell>
                    <TableCell>
                        <label>최대 가능 수량</label>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className={classes.td}><label className={classes.label} >최대 손절비</label></TableCell>
                    <TableCell><label>100/leverage</label></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className={classes.td}><label className={classes.label} >청산가</label></TableCell>
                    <TableCell><label>price-price*(100/leverage/100)</label></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className={classes.td}><label className={classes.label} >수수료</label></TableCell>
                    <TableCell><label>price*(100/0.08*leverage)</label></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className={classes.td}><label className={classes.label}>본절가</label></TableCell>
                    <TableCell><label>price+price*(100/0.08*leverage)</label></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{width:'150px',textAlign:'center'}}><label className={classes.label}>손절가<br/>(비율 지정시 % 포함)</label></TableCell>
                    <TableCell><TextField id="outlined-basic" name="sl" variant="outlined" size="small"/></TableCell>
                    <TableCell><label>{">  청산가, 최대 손절비"}</label></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell style={{width:'150px',textAlign:'center'}}><label className={classes.label}>익절가<br/>(비율 지정시 % 포함)</label></TableCell>
                    <TableCell><TextField id="outlined-basic" name="tp" variant="outlined" size="small"/></TableCell>
                </TableRow>
                <TableRow>
                    <TableCell className={classes.td}><label className={classes.label} >총액</label></TableCell>
                    <TableCell><label>price*amount+fee</label></TableCell>
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