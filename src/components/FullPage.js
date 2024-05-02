import React, { useEffect, useState } from 'react'
import './FullPage.css'
import OrderForm from '../components/OrderForm.js';
import ScrollIntoView from 'react-scroll-into-view';

const FullPage = (props) => {
    const [key, setKey] = useState("null");
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetch('/api/test')
            .then(response => response.json())
            .then(data => {
                setMessage(data.message);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    // useEffect(() => {
    //     // Function to check the website for the signal
    //     async function checkWebsite() {
    //         try {
    //             const response = await fetch("http://ibborders.com/keyboard-signal");
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 const keyboardSignal = data.keyboardSignal;
    //                 if (keyboardSignal === 'lock') {
    //                     return false;
    //                 } else if (keyboardSignal === 'unlock') {
    //                     return true;
    //                 } else {
    //                     return false;  // Default to locking the keyboard
    //                 }
    //             } else {
    //                 return false;
    //             }
    //         } catch (error) {
    //             console.error("Error:", error);
    //             return false;
    //         }
    //     }

    //     checkWebsite();
    // }, []);

    useEffect(() => {
        const handleKeyPress = (event) => {
            // Check if any key is pressed
            //console.log('Key pressed:', event.key);
            setKey(event.key)
        };

        // Attach keydown event listener to the document
        document.addEventListener('keydown', handleKeyPress);

        // Cleanup function to remove event listener when component unmounts
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []); // Empty dependency array ensures the effect runs only once


    useEffect(() => {
        console.log(`key has changed to: ${key}`)
        // if(key === 'p'){
        //     console.log("it is paused")
        // }else{
        //     console.log("unpaused")
        // }
    }, [key])

    function determineKeyboardSignal() {
        return key === 'p' ? 'lock' : 'unlock';
    }

    return (
        <div className='page'>
            <div id='landing-view'>
                <div className='' id='landing-content'>
                    <div>
                        <h1>React App</h1>
                        <p>Message from Express: {message}</p>
                    </div>
                    <div className='subtitle'>BASED IN GROVE CITY, PA</div>
                    <div id='cover-text'>IT'S BANANA BREAD</div>
                    <div className='text'>Inspiring the comfort and memories of homebaking in the lives of college students.</div>
                    <ScrollIntoView selector='#section4'>
                        <div className='br-pill shadow grow-large' id='landing-btn'>
                            <span className='subtitle'>ORDER NOW</span>
                            <i className="fa-solid fa-arrow-down" id='fa-arrow-btn1'></i>
                        </div>
                    </ScrollIntoView>
                </div>
            </div>
            <div className='row' id='section1'>
                <div className='col-lg-6'>
                    <div className='body-text-con'>
                        <div className='subtitle '>COULD YOU IMAGINE ANY OTHER WAY?</div>
                        <div className='heading'>BAKED FRESH</div>
                        <div className='text'>This banana bread, there's nothing like it. We could go into how we make it with only 9 ingredients you can find at your local grovery, but you'll know that immediately when you try it.</div>
                        <ScrollIntoView selector='#section2'>
                            <span className='fa-stack fa-2x grow-large'>
                                <i className="fa-solid fa-circle fa-stack-2x" id='fa-circle-btn2'></i>
                                <i className="fa-inverse fa-solid fa-arrow-down fa-stack-1x" id='fa-arrow-btn2'></i>
                            </span>
                        </ScrollIntoView>
                    </div>
                </div>
                <div className='col-lg-6' id='body-img-con1'><img className='site-img br4' width='50' src={require('../images/bananabreadinoven.jpg')} /></div>
            </div>
            <div className='row' id='section2'>
                <div className='order-lg-2 order-md-1 order-sm-1 order-xs-1 col-lg-6'>
                    <div className='body-text-con'>
                        <div className='subtitle '>SEE EM' IN THE BACK THERE?</div>
                        <div className='heading'>REAL BANANAS</div>
                        <div className='text'>That's how Grandma did it, that's how we do it. Years of baking experience, we know what the best bananas look like, trust us.</div>
                        <ScrollIntoView selector='#section3'>
                            <span className='fa-stack fa-2x grow-large'>
                                <i className="fa-solid fa-circle fa-stack-2x" id='fa-circle-btn3'></i>
                                <i className="fa-inverse fa-solid fa-arrow-down fa-stack-1x" id='fa-arrow-btn3'></i>
                            </span>
                        </ScrollIntoView>
                    </div>
                </div>
                <div className='order-lg-1 order-md-2 order-sm-2 order-xs-2 col-lg-6 body-img-con2'><img className='site-img br4' src={require('../images/bananabreadOnTable.jpg')} /></div>
            </div>
            <div className='row' id='section3'>
                <div className='col-lg-6'>
                    <div className='heading center-vert mb3-md'>GROVE CITY CAMPUS</div>
                </div>
                <div className='col-lg-6'>
                    <div className='center-vert'> {/* body-text-con */}
                        <div className='subtitle'>IT'S BANANA BREAD, DELIVERED</div>
                        <div className='text'>We don't blame you for staying inside. Let us freeze so we can deliver your fresh, warm banana bread. Plus, we can always get new delivery people.</div>
                        <ScrollIntoView selector='#section4'>
                            <div className='grow-large w-50 m-auto'>
                                <span className='subtitle ibb-c'>ORDER NOW</span>
                                <i className="fa-solid fa-arrow-down ibb-c" id='fa-arrow-btn1'></i>
                            </div>
                        </ScrollIntoView>
                    </div>
                </div>
            </div>
            <div className='' id='section4'>
                <hr className='page-line' />
                <div className='heading'>Deliveries on Tuesday</div>
                <div className='subtitle'>Place order any day of the week!</div>
                {/* <OrderForm id='page-form' /> */}
                {<div className='heading'>We have closed shop for the Semester!</div>}
                {/* <div className='subtitle'>Please come back next week! (Checkout our instagram or telegram to stay informed!)</div> */}
                <hr className='page-line margin-7-top' />
                <div className='subtitle'>PAYMENT INFO</div>
                <div><a href='https://account.venmo.com/u/Its-BananaBread'><img className='br4' id='venmo-img' src={require('../images/ibbvenmoQR.png')} /></a></div>
                <div className='text'>(tap or click the image to open venmo)</div>
                <hr className='page-line margin-7-top' />
                <a href='https://www.instagram.com/ibb_bakery/'>
                    <span className='fa-stack fa-2x grow-large'>
                        <i className="fa-solid fa-circle fa-stack-2x" id='fa-circle-btn4'></i>
                        <i className="fa-brands fa-instagram fa-stack-1x fa-buttom-page-icons"></i>
                    </span>
                </a>
                {/* <a href='https://t.me/ibbbakry'>
                    <span className='fa-stack fa-2x grow-large'>
                        <i className="fa-solid fa-circle fa-stack-2x" id='telegram-fa-background'></i>
                        <i className="fa-brands fa-telegram fa-stack-1x fa-2x fa-buttom-page-icons" id='telegram-fa'></i>
                    </span>
                </a> */}
                <a href=''>
                    <span className='fa-stack fa-2x grow-large'>
                        <i className="fa-solid fa-circle fa-stack-2x" id='fa-circle-btn4'></i>
                        <i className="fa-solid fa-envelope fa-stack-1x fa-buttom-page-icons"></i>
                    </span>
                </a>

            </div>
        </div>
    )
}

export default FullPage