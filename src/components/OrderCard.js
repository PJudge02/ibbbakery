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
        case 'special2':
            return <img className='br4 img-card' src={require('../images/saltedCarmelBB.jpg')} alt={descriptiom} />
    }
}

function quantitySelector(breadType, register, setPlainQuanity, setChocolateWalnutQuantity, setSpecial1Quantity, setSpecial2Quantity) {
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
        case 'special2':
            return <select {...register('numLoaves', { required: true })} onChange={(e) => setSpecial2Quantity(e)}>
                <option value='0'>0</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
            </select>
    }

}
//Order card
const OrderCard = (props) => {
    const { title, breadType, description, price, setPlainQuanity, setChocolateWalnutQuantity, setSpecial1Quantity, setSpecial2Quantity } = props
    const { register } = useForm()

    return (
        <>{breadType == 'special2' ? (<div className='dib br3 pa3 ma2 bw2 tc w-75-l w-75-m card order-form-txt special'>

            <h1 id="order-card-special"><em><u>Seasonal Special</u></em></h1>
            {loadImg(breadType, description)}
            <h1>{title} {price}</h1>
            {quantitySelector(breadType, register, setPlainQuanity, setChocolateWalnutQuantity, setSpecial1Quantity, setSpecial2Quantity)}

        </div>) :
            (<div className='dib br3 pa3 ma2 bw2 tc w-75-l w-75-m card order-form-txt'>

                {/* <h1>*Seasonal Special*</h1> */}
                {loadImg(breadType, description)}
                <h1>{title} {price}</h1>
                {quantitySelector(breadType, register, setPlainQuanity, setChocolateWalnutQuantity, setSpecial1Quantity, setSpecial2Quantity)}

            </div>
            )}</>
    )
}

export default OrderCard;