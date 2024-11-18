import React, { useEffect } from 'react';
import img3 from '../Assets/carousal3.jpg';
import img4 from '../Assets/carousal4.jpg';
import img5 from '../Assets/carousal5.jpg';
import './style.css';
import Header from '../Components/Header';

function Home() {
    useEffect(() => {
        // Initialize the carousel with the options you want
        const carouselElement = document.getElementById('carouselExampleSlidesOnly');
        const carousel = new window.bootstrap.Carousel(carouselElement, {
            interval: 4000, // Slide interval (ms)
            ride: 'carousel', // Automatically start sliding
            pause: false, // Don't pause on hover
        });

        // Keep the carousel moving even on hover
        carouselElement.addEventListener('mouseenter', () => {
            carousel.cycle(); // Continue cycling when hovered
        });

        carouselElement.addEventListener('mouseleave', () => {
            carousel.cycle(); // Continue cycling when mouse leaves
        });
    }, []);

    return (
        <div >
            <Header />
            <div
                id="carouselExampleSlidesOnly"
                className="carousel slide"
                data-bs-ride="carousel"
                data-bs-pause="false" // Ensure it doesn't pause on hover
            >
                <div className="carousel-inner" >
                    <div className="carousel-item ">
                        <img src={img3} className="d-block w-100" alt=" one" />
                    </div>
                    <div className="carousel-item">
                        <img src={img4} className="d-block w-100" alt=" two" />
                    </div>
                    <div className="carousel-item active" >
                        <img src={img5} className="d-block w-100" alt=" three" />
                    </div>
                </div>
                <button
                    className="carousel-control-prev arrowButton"
                    type="button"
                    data-bs-target="#carouselExampleSlidesOnly"
                    data-bs-slide="prev"
                >
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>

                <button
                    className="carousel-control-next arrowButton"
                    type="button"
                    data-bs-target="#carouselExampleSlidesOnly"
                    data-bs-slide="next"
                >
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
                <div className="carousel-caption-s">
                    <h1 className='title'>HOME</h1>
                </div>
            </div>
            <div className='p-5'>
                <p>Welcome to my world! I am Mr.X, a protector of the innocent and a defender of justice. My mission is simple: to fight for those who cannot fight for themselves, to keep the world safe from those who seek to do harm, and to inspire hope in even the darkest of times. Whether it's battling supervillains or standing up for the everyday person, I am always ready to answer the call for help. Mr.X is not just a name—it's a promise that no matter the odds, I will never stop fighting for what's right. </p>
                <p> Every hero has their own unique abilities, and mine are nothing short of extraordinary. I possess superhuman strength that allows me to take on the most formidable enemies, as well as the ability to manipulate energy, which I use to protect the innocent and subdue threats. Alongside these powers, my keen sense of justice and my unwavering commitment to protect the world keep me going, even when the battle seems endless. </p>
                <p> But, like every superhero, I don't do it alone. I have allies who fight beside me, each one bringing their own unique powers to the fight. Whether it's in the shadows or out in the open, we stand together to combat the forces of evil. No villain is too powerful, no mission too dangerous.</p>
                <p> This site is your gateway to my world of adventure. Here, you'll find updates on my latest missions, stories of heroism, and more. Whether you’re here to learn about my origins, my powers, or the enemies I face, I invite you to stay and explore what it means to be a hero. And remember, the fight for justice is never over—join me on this journey.</p>
            </div>
        </div>
    );
}

export default Home;
