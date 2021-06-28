import {React,useState,useEffect} from 'react';
import {Button, Tabs,Tab,AppBar,Box,Paper,Grid,TextField,FormControlLabel,Checkbox} from '@material-ui/core';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';
import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/styles';
import LimitOrder from '../component/LimitOrder';
import MarketOrder from '../component/MarketOrder';
import binance from '../component/binance';
import RefreshIcon from '@material-ui/icons/Refresh';
const useStyles = makeStyles((theme) => ({
  label: {
      margin: "10px",
  }
}));
export default function Order (){
    const classes = useStyles();
    const [positionType, setPositionType] = useState("long");
    
    const [price,setPrice] = useState(0);
    const [amount,setAmount] = useState(0);

    const [tradeType, setTradeType] = useState("limit");
    const [leverage,setLeverage] = useState(1);
    const [type,setType] = useState(false);
    const [realTimeLimit, setRealTimeLimit] = useState(true);
    const handleTradeType = (event, newValue) => {
        setTradeType(newValue);
    };
    const handlePositionType = (event, newValue) => {
        setPositionType(newValue);
        console.log(newValue);
    };
    
    return (
        <>
            <label style={{fontWeight:"bold", fontSize:"18px"}}>
                주문
            </label>
            <Paper square style={{width:"700px"}}>
                
            
            <center><div><Button variant="outlined" color="primary">{type?"교차":"격리"}</Button><Button variant="outlined" color="primary">레버리지 x{leverage}</Button></div></center>
            <TabContext value={positionType}>
                {/* <AppBar position="static" style={{backgroundColor:'white'}}> */}
                    <TabList onChange={handlePositionType}
                    
                    variant="fullWidth"
                    indicatorColor="secondary"
                    textColor="secondary">
                        <Tab label="롱" value="long" />
                        <Tab label="숏" value="short" />
                    </TabList>
                {/* </AppBar> */}
                <TabPanel value="long">
                    <TabContext value={tradeType}>
                        {/* <AppBar position="static" style={{backgroundColor:'white'}}> */}
                            <TabList onChange={handleTradeType}
                            
                            variant="fullWidth"
                            indicatorColor="secondary"
                            textColor="secondary">
                                <Tab label="지정가" value="limit"/>
                                <Tab label="시장가" value="market"/>
                            </TabList>
                        {/* </AppBar> */}
                        <TabPanel value="limit">
                            <LimitOrder positionType={positionType} leverage={leverage}/>
                        </TabPanel>
                        <TabPanel value="market">
                            <MarketOrder positionType={positionType} leverage={leverage}/>
                        </TabPanel>
                    </TabContext>
                </TabPanel>
                <TabPanel value="short">
                    <TabContext value={tradeType}>
                        {/* <AppBar position="static" style={{backgroundColor:'white'}}> */}
                            <TabList onChange={handleTradeType} aria-label="simple tabs example"
                            
                            variant="fullWidth"
                            indicatorColor="secondary"
                            textColor="secondary">
                                <Tab label="지정가" value="limit"/>
                                <Tab label="시장가" value="market"/>
                            </TabList>
                        {/* </AppBar> */}
                        <TabPanel value="limit">
                            <LimitOrder positionType={positionType} leverage={leverage}/>
                        </TabPanel>
                        <TabPanel value="market">
                            <MarketOrder positionType={positionType} leverage={leverage}/>
                        </TabPanel>
                    </TabContext>
                </TabPanel>
            </TabContext>
            
            </Paper>
        </>
    );
}