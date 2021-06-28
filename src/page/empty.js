import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {Table,TableBody ,TableCell,TableContainer, TableHead, TableRow,Paper } from '@material-ui/core';
import Upbit from '../component/getOrderList';
const exchange_key = '1eeda0edbe9e840a74addf6e';
const InvestChart =()=>{
    const [exchange, setExchange] = useState(0);
    // const [data,setData] = useState([]);
    const TAX_RATE = 0.07;
    function ccyFormat(num) {
        return `${num.toFixed(2)}`;
      }
      
      function priceRow(qty, unit) {
        return qty * unit;
      }
      
      function createRow(desc, qty, unit) {
        const price = priceRow(qty, unit);
        return { desc, qty, unit, price };
      }
      
      function subtotal(items) {
        return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
      }
      
      const rows = [
        createRow('Paperclips (Box)', 100, 1.15),
        createRow('Paper (Case)', 10, 45.99),
        createRow('Waste Basket', 2, 17.99),
      ];
      
      const invoiceSubtotal = subtotal(rows);
      const invoiceTaxes = TAX_RATE * invoiceSubtotal;
      const invoiceTotal = invoiceTaxes + invoiceSubtotal;
      const upbit = new Upbit();
    useEffect(async()=>{
        await getExchange();
    },[]);

    const getExchange=async()=>{
        await axios.get(`https://v6.exchangerate-api.com/v6/${exchange_key}/pair/USD/KRW`)
        .then(res=>{
            // console.log(Math.round(res.data.conversion_rate*100)/100);
            var ex = Math.round(res.data.conversion_rate*100)/100;
            setExchange(ex);
        })
        .catch(err=>{
            console.log("exchange ERR",err);
        })
    }

    return (
        //사용 거래소 현물/선물
        //추가 시점 환율 및 총계
        <>
            <label>현재 환율: {exchange}</label>
            
            <TableContainer component={Paper}>
                <Table aria-label="spanning table">
                    <TableHead>
                    <TableRow>
                        <TableCell align="center" colSpan={3}>
                        Details
                        </TableCell>
                        <TableCell align="right">Price</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>날짜</TableCell>
                        <TableCell>당일 환율</TableCell>
                        <TableCell>현물 시작 시드</TableCell>
                        <TableCell>현물 마감 시드</TableCell>
                        <TableCell>현물 수익</TableCell>
                        <TableCell>선물 시작 시드</TableCell>
                        <TableCell>선물 마감 시드</TableCell>
                        <TableCell>선물 수익</TableCell>
                        <TableCell>총 수익</TableCell>
                        <TableCell>현물 입출금</TableCell>
                        <TableCell>선물 입출금</TableCell>
                        <TableCell>수익률</TableCell>
                        <TableCell>목표 수익률 대비</TableCell>
                        <TableCell>비고</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.desc}>
                        <TableCell>{row.desc}</TableCell>
                        <TableCell align="right">{row.qty}</TableCell>
                        <TableCell align="right">{row.unit}</TableCell>
                        <TableCell align="right">{ccyFormat(row.price)}</TableCell>
                        </TableRow>
                    ))}

                    <TableRow>
                        <TableCell rowSpan={3} />
                        <TableCell colSpan={2}>Subtotal</TableCell>
                        <TableCell align="right">{ccyFormat(invoiceSubtotal)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Tax</TableCell>
                        <TableCell align="right">{`${(TAX_RATE * 100).toFixed(0)} %`}</TableCell>
                        <TableCell align="right">{ccyFormat(invoiceTaxes)}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan={2}>Total</TableCell>
                        <TableCell align="right">{ccyFormat(invoiceTotal)}</TableCell>
                    </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}
export default InvestChart;
