import React from 'react'
import './FullPage.css'

const FullPage = (props) => {

    return (
        <div className='page'>
            <div id='landing-view'>
                <div className='' id='landing-content'>
                    <div className='subtitle'>BASED IN GROVE CITY, PA</div>
                    <div id='cover-text'>IT'S BANANA BREAD</div>
                    <div className='text'>Inspiring the comfort and memories of homebaking in the lives of college students.</div>
                </div>
            </div>
            <div className='row bg-black'>
                <div className='feature col-lg-6 body-text-con'>
                    <div className='subtitle'>COULD YOU IMAGINE ANY OTHER WAY?</div>
                </div>
                <div className='feaure col-lg-6 body-img-con'><img className='site-img' src={require('../images/bananabreadinoven.jpg')}/></div>
            </div>
        </div>
    )
}

export default FullPage