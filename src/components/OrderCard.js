import React from 'react'
import { useForm } from 'react-hook-form'
import './OrderCard.css'


function loadImg(breadType, descriptiom) {
    switch (breadType) {
        case 'plain':
            return <img className='br4 img-card' src={require('../images/plainBB.jpg')} alt={descriptiom} />
        case 'chocolate walnut':
            return <img className='br4 img-card' src={require('../images/chocolateWalnutBB.jpg')} alt={descriptiom} />
        case 'special1':
            return <img className='br4 img-card' src={require('../images/chocolateBB.jpg')} alt={descriptiom} />
    }
}

function quantitySelector(breadType, register, setPlainQuanity, setChocolateWalnutQuantity, setSpecial1Quantity) {
    switch (breadType) {
        case 'plain':
            return <select {...register('numLoaves', { required: true })} onChange={(e) => setPlainQuanity(e)}>
                <option value='0'>0</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
            </select>
        case 'chocolate walnut':
            return <select {...register('numLoaves', { required: true })} onChange={(e) => setChocolateWalnutQuantity(e)}>
                <option value='0'>0</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
            </select>
        case 'special1':
            return <select {...register('numLoaves', { required: true })} onChange={(e) => setSpecial1Quantity(e)}>
                <option value='0'>0</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
            </select>
    }

}

const OrderCard = (props) => {
    const { title, breadType, descriptiom, price, setPlainQuanity, setChocolateWalnutQuantity, setSpecial1Quantity} = props
    const { register } = useForm()

    return (
        <div className='dib br3 pa3 ma2 bw2 tc w-75-l w-75-m card order-form-txt'>
            {/* dib br3 pa3 ma2 bw2 shadow-5 tc w-40-l w-60-m card */}

            {/* <h1>{title}</h1> */}
            {loadImg(breadType, descriptiom)}
            <h1>{title} {price}</h1>
            {quantitySelector(breadType, register, setPlainQuanity, setChocolateWalnutQuantity, setSpecial1Quantity)}

        </div>
    )
}

export default OrderCard;