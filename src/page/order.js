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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slider from '@material-ui/core/Slider';
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
    const [tempLeverage,setTempLeverage] = useState(1);
    const [type,setType] = useState(false);
    const [realTimeLimit, setRealTimeLimit] = useState(true);
    const [marginMod, setMarginMod] = useState(false);
    const [leverageMod, setLeverageMod] = useState(false);

    useEffect(()=>{
        console.log(leverage);
    },[leverage])
    const handleMarginMod = () => {
        setMarginMod(!marginMod);
    };
    const handleLeverageMod = () => {
        setLeverageMod(!leverageMod);
    };
    const handleTradeType = (event, newValue) => {
        setTradeType(newValue);
    };
    const handlePositionType = (event, newValue) => {
        setPositionType(newValue);
        console.log(newValue);
    };
    
    return (
        <>
            
            
            <Paper square style={{width:"700px"}}>
            <label style={{fontWeight:"bold", fontSize:"24px",margin:'20px'}}>
                주문<br/>
            </label>
                
            
            <center><div><Button variant="outlined" color="primary" onClick={()=>handleMarginMod()}>{type?"교차":"격리"}</Button><Button variant="outlined" color="primary" onClick={()=>handleLeverageMod()}>레버리지 x{leverage}</Button></div></center>
            <Dialog
                open={marginMod}
                onClose={()=>handleMarginMod()}
            >
                <DialogTitle >{"무기한 마진 모드 변경"}</DialogTitle>
                <DialogContent>
                    <Button variant="outlined" color="primary" onClick={()=>setType(true)} style={{width:'50%'}}>교차</Button>
                    <Button variant="outlined" color="primary" onClick={()=>setType(false)} style={{width:'50%'}}>격리</Button>
                </DialogContent>
            </Dialog>
            <Dialog
                open={leverageMod}
                onClose={()=>handleLeverageMod()}
            >
                <DialogTitle >{"레버리지 변경"}</DialogTitle>
                <DialogContent>
                    <Slider
                                value={tempLeverage}
                                min={1}
                                
                                onChange={(e,newValue)=>{
                                    setTempLeverage(newValue); 
                                }}
                                valueLabelDisplay="auto"
                                aria-labelledby="range-slider"
                                style={{width:'300px'}}
                        /><label>x{tempLeverage}</label>
                </DialogContent>
                <DialogActions>
                    <Button onClick={()=>handleLeverageMod()} color="danger">
                        취소
                    </Button>
                    <Button onClick={()=>{handleLeverageMod(); setLeverage(tempLeverage);}} color="primary" autoFocus>
                        확인
                    </Button>
                </DialogActions>
            </Dialog>
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