import React, {useState} from 'react'
import { makeStyles } from '@material-ui/styles'
import { Grid } from '@material-ui/core'
import {Loader} from 'components'
import {
    Budget,
    TotalUsers,
    TasksProgress,
    TotalProfit,
    FinanceResume,
    DateSelector,
    Modal
  } from './components';

import {orderService, profitService} from 'firebaseService'
import { merge } from 'lodash';


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3)
    }
}))

const Finance = props => {
    const classes = useStyles()
    
    const [loading, setLoading] = useState(false)
    const [incomeEgressList, setIncomeEgressList] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [modalType, setModalType] = useState("egress")

    const orderToFinance = (order)=>{
        if(order.state === 'delivered'){
            const sellValue = order.products.reduce((prev,curr) => curr.price + prev, 0 )
            const buyValue = order.products.reduce((prev,curr) => curr.wholesalePrice + prev, 0 )
            const shippingPrice = order.shipping_price
            const value = sellValue - buyValue - shippingPrice

            return {
                title: "Entrega Pedido",
                description: "Ganancia por el pedido entregado de " + order.firstName,
                type:"income",
                date: order.deliveredDate,
                value,
                id: order.id
            }
        }

        return {
            title: "Devolución de Pedido",
            description: "Descuento del envio, debido a que el pedido no fue recibido",
            type: "egress",
            date: order.deliveredDate,
            value: parseInt(order.returnValue || 0),
            id: order.id 
        }
    }

    const handleOnUpdate = async (startDate, endDate)=>{
        setLoading(true)
        const data = await orderService.getCompleteOrdersByDate(startDate, endDate)
        const profits = await profitService.getProfitsByDate(startDate, endDate)

        console.log("Pedidos finalizados: " + data.length)

        const financeData = data.map(v => orderToFinance(v))
        //console.log(financeData)
        //console.log(profits)

        const mergeData = [...financeData, ...profits]

        const finalData = mergeData.sort((a,b)=> b.date.seconds - a.date.seconds)
        
        setIncomeEgressList(finalData)
        
        setLoading(false)
    }


    const handleSave = async (value)=>{
        console.log(value)
        setOpenModal(false)
        setLoading(true)
        await profitService.addProfit(value)
        setLoading(false)
        return
    }

    const handleClose = ()=>{
        setOpenModal(false)
    }

    const handleOpenModal = (type)=> ()=> {
        setModalType(type)
        setOpenModal(true)
    }
    
    return (
        <div className={classes.root}>
            <Loader loading={loading} />
            <Modal type={modalType} onClose={handleClose} onSave={handleSave} open={openModal}/>
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <DateSelector  onUpdate={handleOnUpdate}/>
                </Grid>

                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <Budget list={incomeEgressList} />
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <TotalUsers list={incomeEgressList} />
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <TasksProgress list={incomeEgressList} />
                </Grid>
                <Grid
                    item
                    lg={3}
                    sm={6}
                    xl={3}
                    xs={12}
                >
                    <TotalProfit list={incomeEgressList} />
                </Grid>

                <Grid item xs={12}>
                    <FinanceResume onAddProfit={handleOpenModal}  list={incomeEgressList}/>
                </Grid>
            </Grid>
        </div>
    )
}


export default Finance
