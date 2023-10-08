import React, { useEffect } from 'react'
import './OrderForm.css'
import OrderCard from './OrderCard'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { supabase } from '../supabaseClient'
import emailjs from 'emailjs-com';
// import { Routes, Route, Navigate } from 'react-router-dom'

const OrderForm = (props) => {
    const [fetchError, setFetchError] = useState(null)
    const [supply, setSupply] = useState(null)

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [plainQuantity, setPlainQuanity] = useState(0);
    const [chocolateWalnutQuantity, setChocolateWalnutQuantity] = useState(0)
    const [special1Quantity, setSpecial1Quantity] = useState(0)
    const [special2Quantity, setSpecial2Quantity] = useState(0)
    const [muffinQuantity, setMuffinQuantity] = useState(0)
    const [applePieQuantity, setApplePieQuantity] = useState(0)
    const [discountCode, setDiscountCode] = useState('empty')
    const plainPrice = 4.00;
    const cwPrice = 5.00;
    const special1Price = 5.00;
    const special2Price = 5.00;
    const muffinPrice = 3.00;
    const applePiePrice = 5.00;
    // var discount = 0

    //for discounts
    const [freeLoaves, setFreeLoaves] = useState(0.0)
    const [discount, setDiscount] = useState(0.0)
    const [count, setCount] = useState([0, 0, 0, 0])

    const [submitConfirm, setSubmitConfirm] = useState(false)
    const [submissionProcessing, setSubmissionProcessing] = useState(false)
    const [submissionError, setSubmissionError] = useState(false)

    useEffect(() => {
        const fetchSupply = async () => {
            const {data, error} = await supabase
                .from('bb_inventory')
                .select()
            
                if(error){
                    setFetchError('Could not fetch data')
                    setSupply(null)
                    console.log(error)
                }
                if(data){
                    setSupply(data)
                    setFetchError(null)
                    console.log(data)
                    console.log(data[0])
                    console.log(data[0].apple_pie)
                }
        }
        fetchSupply()
    }, [])

    const submit = async (order) => {
        console.log(JSON.stringify(order))

        const { error } = await supabase.from('orders').insert(order)

        console.log(error)
        if (error != null) {
            sendErrorEmail(order)
            setSubmissionError(true)
            setSubmissionProcessing(false)
            setSubmitConfirm(false)
        } else {
            setSubmitConfirm(true)
            setSubmissionProcessing(false)
            setSubmissionError(false)
            sendEmail(order)
        }
    }

    useEffect(() => {
        var localDiscount = 0.0
        setFreeLoaves(0.0)
        var counter = 0
        for(let j = 0; j < count.length; j++){
            for(let k = 0; k < count[j]; k++){
                counter = counter + 1
                if(counter % 3 === 0){
                    // console.log(`localdiscount: ${localDiscount}`)
                    j === 0 ? localDiscount = localDiscount + plainPrice : localDiscount = localDiscount + cwPrice
                    // console.log(`localdiscount: ${localDiscount}`)
                }
            }
        }
        // setFreeLoaves(localDiscount)
        implementDiscount(discountCode)
    }, [count])

    useEffect(() => {
        implementDiscount(discountCode)
    }, [freeLoaves])

    function implementDiscount(code){
        setDiscountCode(code)
        if (code === 'telegram1') {
            // console.log(`free laoves: ${freeLoaves}`)

            // setDiscount(parseInt(plainQuantity) + parseInt(chocolateWalnutQuantity) + parseInt(special1Quantity) + parseInt(special2Quantity) - parseInt(freeLoaves / 3));
            
            // console.log(plainQuantity + ' ' + chocolateWalnutQuantity + ' ' + special1Quantity + ' ' + special2Quantity)
            // console.log(parseInt(freeLoaves/3))
        }else{
            setDiscount(0.0)
        }
    }

    const sendEmail = (data) => {
        emailjs.send('service_s4jhuc5', 'template_t0a5rir', data, 'ITws7WsBCTsX0bKrH')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED... Trying again', error);
                sendEmail(data)
            });
    }

    const sendErrorEmail = (errMsg) => {
        emailjs.send('service_s4jhuc5', 'template_ah5l39i', errMsg, 'ITws7WsBCTsX0bKrH')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED... Trying again', error);
                sendErrorEmail(errMsg)
            });
    }

    const updateTable = async(e) => {
        const {d, err} = await supabase
            .from('bb_inventory')
            .update({muffin: supply[0].muffin - muffinQuantity,
                apple_pie: supply[0].apple_pie - applePieQuantity,
                plain: supply[0].plain - plainQuantity,
                choc_chip: supply[0].choc_chip - special1Quantity})
            .eq('id', 8675309)

        if(err){
            console.log(err)
        }
    }

    return (
        <div className='bg-black dib br4 pa3 bw2 shadow-5 w-75 tc'>
            <div className='f1 order-form-txt'>Order Form</div>

            <form
                onSubmit={handleSubmit((data) => {
                    // http request

                    const totalCost = plainQuantity * plainPrice + chocolateWalnutQuantity * cwPrice + special1Quantity * special1Price + special2Quantity * special2Price + muffinQuantity * muffinPrice + applePieQuantity * applePiePrice - discount - freeLoaves 
                    console.log('total cost')
                    console.log(totalCost)


                    const order = {
                        id: Math.ceil(Date.now() / 1000 + data.roomNumber),
                        qty_plain: plainQuantity,
                        qty_cw: chocolateWalnutQuantity,
                        qty_special1: special1Quantity,
                        qty_special2: special2Quantity,
                        apple_pie: applePieQuantity,
                        muffin: muffinQuantity,
                        delivery_time: data.time,
                        building_address: data.building,
                        room_num: data.roomNumber,
                        name: data.name,
                        phone_number: data.phone,
                        email: data.email,
                        total: totalCost,
                        okay_with_photos: data.takePhoto
                    }

                    submit(order)
                    updateTable()

                    { setSubmissionProcessing(true) }
                })} >
                {/* Delivery Information */}
                <div className='subsection-form deliveryInfo'>
                    <div className='f2 subtitle-form order-form-txt'>Delivery Information</div>
                    <select {...register('building', { required: '*The field above is required' })} defaultValue={'Select'} id='building'>
                        <option value='Select' disabled> -- Select Building Location -- </option>
                        <option value='Alumni'>Alumni</option>
                        <option value='Harker Front Entrance'>Harker Front Entrance</option>
                        <option value='Hicks'>Hicks</option>
                        <option value='Hopeman'>Hopeman</option>
                        <option value='Ketler'>Ketler</option>
                        <option value='Lincoln'>Lincoln</option>
                        <option value='MAP Lobby'>MAP Lobby</option>
                        <option value='MEP PLC Entrance'>MEP PLC Entrance</option>
                        <option value='Memorial'>Memorial</option>
                        <option value='Library Lobby'>Library Lobby</option>
                    </select>
                    <p className='error'>{errors.building?.message}</p>
                    <select {...register('time', { required: '*The field above is required' })} defaultValue={'Select'} id='building'>
                        <option value='Select' disabled> -- Select Delivery Time -- </option>
                        <option value='6:00pm-6:30pm'>6:00pm-6:30pm</option>
                        <option value='6:30pm-7:00pm'>6:30pm-7:00pm</option>
                        <option value='7:00pm-7:30pm'>7:00pm-7:30pm</option>
                        <option value='7:30pm-8:00pm'>7:30pm-8:00pm</option>
                        <option value='8:00pm-8:30pm'>8:00pm-8:30pm</option>
                        <option value='8:30pm-9:00pm'>8:30pm-9:00pm</option>
                        <option value='9:00pm-9:30pm'>9:00pm-9:30pm</option>
                        <option value='9:30pm-10:00pm'>9:30pm-10:00pm</option>
                    </select>
                    <p className='error'>{errors.time?.message}</p>
                    <input {...register('roomNumber', { required: '*The field above is required' })} type='number' placeholder='Room Number' />
                    <p className='error'>{errors.roomNumber?.message}</p>
                </div>

                {/* Menu */}
                <hr className='order-form-line' />
                <div className='subsection-form'>
                    {<OrderCard title={'Plain'} supply={supply ? supply[0].plain : 0} breadType={'plain'} description={'Plan BB'} price={'$5.50'} setPlainQuanity={(e) => {
                        setPlainQuanity(e.target.value)
                        const tempC = [...count]
                        tempC[0] = parseInt(e.target.value)
                        setCount(tempC)
                    }} />}
                    {<OrderCard title={'Chocolate Chip'} supply={supply ? supply[0].choc_chip : 0} breadType={'plain'} description={'Chocolate Chip BB'} price={'$5.00'} setSpecial1Quantity={(e) => {
                        setSpecial1Quantity(e.target.value)
                        const tempC = [...count]
                        tempC[1] = parseInt(e.target.value)
                        setCount(tempC)
                    }} />}
                    {<OrderCard title={'Muffin'} supply={supply ? supply[0].muffin : 0} breadType={'muffin'} description={'Muffin BB'} price={'$3.00'} setMuffinQuantity={(e) => {
                        setMuffinQuantity(e.target.value)
                        const tempC = [...count]
                        tempC[1] = parseInt(e.target.value)
                        setCount(tempC)
                    }} />}
                    {<OrderCard title={'Apple Pie'} supply={supply ? supply[0].apple_pie : 0} breadType={'apple pie'} description={'Plain BB'} price={'6.50'} setApplePieQuantity={(e) => {
                        setApplePieQuantity(e.target.value)
                        const tempC = [...count]
                        tempC[3] = parseInt(e.target.value)
                        setCount(tempC)
                    }} />}
                </div>

                <hr className='order-form-line' />
                {/* Contact info */}
                <div className='subsection-form contactInfo'>
                    <div className='f2 subtitle-form order-form-txt'>Contact Information</div>
                    <input {...register('email', { required: '*The field above is required' })} type='text' placeholder='Email (ex. jonDoe@gmail.com)' />
                    <p className='error'>{errors.email?.message}</p>
                    <input {...register('phone', { required: '*The field above is required' })} type='text' placeholder='Phone Number (ex. 123-456-7890)' />
                    <p className='error'>{errors.phone?.message}</p>
                    <input {...register('name', { required: '*The field above is required' })} type='text' placeholder='First & Last Name' />
                    <p className='error'>{errors.name?.message}</p>
                    <div className='photo-q-fit'>
                        <input {...register('takePhoto')} className='photo-q-box' type='checkbox' />
                        <div id='photo-q-text'>Can we get a photo with you upon delivery?</div>
                    </div>
                </div>

                <hr className='tc order-form-line' />
                {/* Purchase Information */}
                <div className='subsection-form'>
                    <div className='f2 subtitle-form order-form-txt'>Payment Information</div>
                    <div className='f3 order-form-txt'>Discount Code</div>
                    <input {...register('discount')} type='text' placeholder='Enter Discount Code Here' onChange={(e) => implementDiscount(e.target.value)} />
                    {/* {useDiscount(discountCode)} */}
                    <div className='f3 order-form-txt'>Total = ${Math.round((plainQuantity * plainPrice +
                        chocolateWalnutQuantity * cwPrice + special1Quantity * special1Price
                        + muffinQuantity * muffinPrice + applePieQuantity * applePiePrice
                        + special2Quantity * special2Price - discount - freeLoaves))}</div>
                    {/* {console.log(`disloaves: ${freeLoaves}`)} */}
                </div>

                <input type="submit" />
                {submissionError && <div className='f3 error order-form-txt'>There was an error in handling your order, please refresh & try again.</div>}
                {submissionProcessing && <div className='f3 processing order-form-txt'>Processing you're order...</div>}
                {submitConfirm && <div className='f3 confirmation order-form-txt'>Your order has been submitted! Please check your email for your receipt.</div>}
            </form>

        </div>
    )
}

export default OrderForm