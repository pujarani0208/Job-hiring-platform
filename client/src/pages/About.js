import React, { Component } from 'react';
import Navbar from './Navbar';

export class About extends Component {
  render() {
    return (
      <>
      <div className='main'>
      <div className="navbarMain">
        <Navbar></Navbar>
        </div>
       <div className="listMain">
          <p>At AVRTTI (आवृत्ति), we believe that everyone should have access to meaningful work that provides fair pay, safe working conditions, and opportunities for growth. We are a tech-driven startup that aims to bridge the gap between skilled workers and employers in the organized sector.
Our innovative app-based platform connects contractors, construction companies, and small businesses with a pool of skilled workers, including laborers, technicians, and support staff. By leveraging the power of technology, we make it easy for employers to find and hire qualified workers quickly and efficiently.
At the same time, we prioritize the needs of workers by ensuring fair pay, safe working conditions, and opportunities for growth and development. We believe that by empowering workers and employers alike, we can create a more equitable and sustainable economy for all.
Our team is made up of experienced professionals with deep expertise in technology, recruitment, and business development. Together, we are committed to creating a platform that delivers value for both employers and workers.
Thank you for considering AVRTTI (आवृत्ति). We look forward to partnering with you to create a more equitable and sustainable future for all.</p>
    </div>
    </div>
    </>
    )
  }
}

export default About;
