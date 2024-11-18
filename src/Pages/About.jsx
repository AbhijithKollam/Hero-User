import React from 'react'
import img1 from '../Assets/image1.jpg';
import Header from '../Components/Header';


function About() {
  return (
    <div>
      <Header />
      <div>
        <div className='carousel slide'>
          <div className="carousel-inner" >
            <div className="carousel-item active">
              <img src={img1} className="d-block w-100" alt=" one" />
            </div>
          </div>
          <div className="carousel-caption-s">
            <h1 className='title'>ABOUT</h1>
          </div>
        </div>
      </div>

      <div className='p-5'>
        <p className='p-2'>Every superhero has a beginning, and mine is no different. Mr.X wasn’t always a name that struck fear into the hearts of villains. I was once an ordinary individual, living a quiet life in Kollam. But everything changed one fateful day when I was exposed to a powerful, otherworldly force during a scientific accident. This incident granted me extraordinary abilities, abilities I didn’t ask for but knew I had to learn to control. It was in that moment I realized I could no longer just be an observer of injustice—I had to be part of the solution.</p>
        <p className='p-2'>My powers have evolved over time. I can fly at incredible speeds,manipulate fire, read minds, heal others", but they don’t come without a price. The weight of responsibility that comes with these powers is something I carry every day. It is not just about the strength to defeat my enemies but the courage to keep going when the world seems to fall apart. Mr.X stands as a symbol of hope, courage, and resilience, no matter the odds.</p>
        <p className='p-2'>But it’s not just about the powers—it’s about the values I uphold. I believe in justice, in standing up for what’s right, and in the power of the human spirit to overcome even the darkest forces. There’s a code I live by, one that doesn’t allow me to turn my back on someone in need, no matter the danger. Protect the innocent. Stand against corruption. Fight until the end. This is what I live by.</p>
        <p className='p-2'>When I’m not out saving the world, I’m just Mr.X, a regular Farmer. But even in my ordinary life, I can’t help but feel the call to do more. My mission extends beyond myself—it’s about creating a better future for everyone, where no one has to live in fear.</p>
        <p className='p-2'>Over time, I’ve built relationships with other heroes, and together we form an unstoppable force for good. My trusted sidekick brings their own unique abilities to our team. Together, we face some of the world’s most dangerous foes—like Megatron, a criminal mastermind who seeks to control the world for his own nefarious purposes. With my allies at my side, I know that there’s no challenge too big, no evil too strong for us to defeat.</p>
        <p className='p-2'>Join me in my fight for justice. Together, we can make the world a safer place. The journey may be long, but I promise I will never stop. Because, after all, being a hero isn’t about the powers—it’s about the heart, the courage to fight for what’s right, no matter the cost.</p>

      </div>
    </div>
  )
}

export default About