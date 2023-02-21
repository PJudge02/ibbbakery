import React from 'react'
import './OrderForm.css'
import OrderCard from './OrderCard'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { supabase } from '../supabaseClient'
import emailjs from 'emailjs-com';
// import { Routes, Route, Navigate } from 'react-router-dom'

const OrderForm = (props) => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm()
    const [plainQuantity, setPlainQuanity] = useState(0);
    const [chocolateWalnutQuantity, setChocolateWalnutQuantity] = useState(0)
    const [special1Quantity, setSpecial1Quantity] = useState(0)
    const [special2Quantity, setSpecial2Quantity] = useState(0)
    const [discountCode, setDiscountCode] = useState('empty')
    const plainPrice = 3.00;
    const cwPrice = 4.00;
    const special1Price = 4.00;
    var discount = 0
    const [submitConfirm, setSubmitConfirm] = useState(false)

    const submit = async (order) => {
        console.log(JSON.stringify(order))

        const { error } = await supabase.from('orders').insert(order)

        console.log(error)
    }

    const useDiscount = (code) => {
        if (code == 'telegram1') {
            discount = parseInt(plainQuantity) + parseInt(chocolateWalnutQuantity) + parseInt(special1Quantity);
        }
    }

    const sendEmail = (data) => {
        emailjs.send('service_s4jhuc5', 'template_t0a5rir', data, 'ITws7WsBCTsX0bKrH')
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
            });
        // e.target.reset();
    }

    return (
        <div className='bg-black dib br4 pa3 bw2 shadow-5 w-75 tc'>
            <div className='f1'>Order Form</div>

            <form
                onSubmit={handleSubmit((data) => {
                    // http request


                    console.log(data)
                    console.log(discountCode)
                    const totalCost = plainQuantity * plainPrice + chocolateWalnutQuantity * cwPrice + special1Quantity * special1Price - discount
                    // console.log("RIGHT HERE")
                    // console.log(totalCost)

                    const order = {
                        id: Math.ceil(Date.now() / 1000 + data.roomNumber),
                        qty_plain: plainQuantity,
                        qty_cw: chocolateWalnutQuantity,
                        qty_special1: special1Quantity,
                        delivery_time: data.time,
                        building_address: data.building,
                        room_num: parseInt(data.roomNumber),
                        name: data.name,
                        phone_number: data.phone,
                        email: data.email,
                        total: totalCost
                    }

                    submit(order)

                    // {<Navigate to='/OrderSubmitted'/>}
                    // {<Routes><Route path='/OrderSubmitted' element={<OrderSubmitted/>}/></Routes>}
                    // {<Routes><Route path='/OrderSubmitted' element={<OrderSubmitted/>}/></Routes>}
                    { setSubmitConfirm(true) }
                    { sendEmail(order) }
                })} >
                {/* Delivery Information */}
                <div className='subsection deliveryInfo'>
                    <div className='f2 subtitle'>Delivery Information</div>
                    <select {...register('building', { required: '*The field above is required' })} defaultValue={'Select'} id='building'>
                        <option value='Select' disabled> -- Select Building Location -- </option>
                        <option value='Alumni'>Alumni</option>
                        <option value='Harker'>Harker</option>
                        <option value='Hicks'>Hicks</option>
                        <option value='Hopeman'>Hopeman</option>
                        <option value='Ketler'>Ketler</option>
                        <option value='Lincoln'>Lincoln</option>
                        <option value='MAP'>MAP</option>
                        <option value='MEP'>MEP</option>
                        <option value='Memorial'>Memorial</option>
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
                    <input {...register('roomNumber', { required: '*The field above is required' })} type='text' placeholder='Room Number' />
                    <p className='error'>{errors.roomNumber?.message}</p>
                </div>

                {/* Menu */}
                <hr className='w-75-l w-75-m' />
                <div className='subsection'>
                    {/* <div className='f2 subtitle'>Menu</div> */}
                    {<OrderCard title={'Plain'} breadType={'plain'} description={'Plan BB'} price={'$3.00'} setPlainQuanity={(e) => setPlainQuanity(e.target.value)} />}
                    {<OrderCard title={'Chocolate'} breadType={'special1'} description={'Chocolate BB'} price={'$4.00'} setSpecial1Quantity={(e) => setSpecial1Quantity(e.target.value)} />}
                    {<OrderCard title={'Chocolate Walnut'} breadType={'chocolate walnut'} description={'Chocolate Walnut BB'} price={'$4.00'} setChocolateWalnutQuantity={(e) => setChocolateWalnutQuantity(e.target.value)} />}
                    {/* {<OrderCard title={'Plain Banana Bread'} breadType={'plain'} description={'Chocolate Walnut BB'} price={'$3.99'} setQuantity={(e) => setQuantity(e.target.value)} />} */}
                </div>

                <hr className='w-75-l w-75-m' />
                {/* Contact info */}
                <div className='subsection contactInfo'>
                    <div className='f2 subtitle'>Contact Information</div>
                    <input {...register('email', { required: '*The field above is required' })} type='text' placeholder='Email (ex. jonDoe@gmail.com)' />
                    <p className='error'>{errors.email?.message}</p>
                    <input {...register('phone', { required: '*The field above is required' })} type='text' placeholder='Phone Number (ex. 123-456-7890)' />
                    <p className='error'>{errors.phone?.message}</p>
                    <input {...register('name', { required: '*The field above is required' })} type='text' placeholder='First & Last Name' />
                    <p className='error'>{errors.name?.message}</p>
                </div>

                <hr className='w-75-l w-75-m' />
                {/* Purchase Information */}
                <div className='subsection'>
                    <div className='f2 subtitle'>Payment Information</div>
                    <div className='f3'>Discount Code</div>
                    <input {...register('discount')} type='text' placeholder='Enter Discount Code Here' onChange={(e) => setDiscountCode(e.target.value)} />
                    {useDiscount(discountCode)}
                    {console.log(discount)}
                    <div className='f3'>Total = ${Math.round((plainQuantity * plainPrice + chocolateWalnutQuantity * cwPrice + special1Quantity * special1Price - discount))}</div>
                </div>

                <input type="submit" />
                {console.log("ewaufhqi4wuhfqiwpeurfgqiwpurfqipufhqipufhqhiwuefhqipufhqpiuhfiqweufhqiwufhiquwfhwenfwkuefhcqiwn")}
                {console.log(submitConfirm)}
                {submitConfirm && <div className='f3 confirmation'>Your order has been submitted! Please check your email for your receipt.</div>}

            </form>

        </div>
    )
}

export default OrderForm