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
            <div className='row' id='section1'>
                <div className='col-lg-6'>
                    <div className='body-text-con'>
                        <div className='subtitle '>COULD YOU IMAGINE ANY OTHER WAY?</div>
                        <div className='heading'>BAKED FRESH</div>
                        <div className='text'>This banana bread, there's nothing like it. We could go into how we make it with only 9 ingredients you can find at your local grovery, but you'll know that immediately when you try it.</div>
                    </div>
                </div>
                <div className='col-lg-6' id='body-img-con1'><img className='site-img br4' width='50' src={require('../images/bananabreadinoven.jpg')} /></div>
            </div>
            <div className='row' id='section2'>
                <div className='order-lg-1 order-md-2 order-sm-2 order-xs-2 col-lg-6 body-img-con2'><img className='site-img br4' src={require('../images/bananabreadOnTable.jpg')} /></div>
                <div className='order-lg-2 order-md-1 order-sm-1 order-xs-2 col-lg-6'>
                    <div className='body-text-con'>
                        <div className='subtitle '>SEE EM' IN THE BACK THERE?</div>
                        <div className='heading'>REAL BANANAS</div>
                        <div className='text'>That's how Grandma did it, that's how we do it. Years of baking experience, we know what the best bananas look like, trust us.</div>
                    </div>
                </div>
            </div>
            <div className='row' id='section3'>
                <div className='order-lg-1 order-md-2 order-sm-2 order-xs-2 col-lg-6'>
                    <div className='heading center-vert'>Grove City College</div>
                </div>
                <div className='order-lg-2 order-md-1 order-sm-1 order-xs-2 col-lg-6'>
                    <div className='center-vert'> {/* body-text-con */}
                        <div className='subtitle '>IT'S BANANA BREAD, DELIVERED</div>
                        <div className='text'>We don't blame you for staying inside. Let us freeze so we can deliver your fresh, warm banana bread. Plus, we can always get new delivery people.</div>
                    </div>
                </div>
            </div>
            <div className='' id='section4'>
                
            </div>
        </div>
    )
}

export default FullPage