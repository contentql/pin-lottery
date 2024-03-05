import Image from 'next/image'

import team_obj from '/public/images/elements/team-obj.png'

import teamData from '@/data/teamData'

const Team = () => {
  return (
    <section className='pb-120'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-9'>
            <div className='section-header text-center'>
              <span className='section-sub-title'> Meet Our most Valued</span>
              <h2 className='section-title style--two'>Expert Team Members</h2>
              <p>
                These are the key drivers that make us different: Safe, Social,
                Reliable and Fun. Rifa Lotto is dedicated to trust and safety.
              </p>
            </div>
          </div>
        </div>
        <div className='row mb-none-30 justify-content-center'>
          {/* single team section */}
          {teamData.map(singleTeam => (
            <div key={singleTeam.id} className='col-lg-4 col-sm-6 mb-30'>
              <div className='team-card'>
                <div className='team-card__thumb'>
                  <Image src={singleTeam.img} alt={singleTeam.name} />
                  <div className='obj'>
                    <Image src={team_obj} alt='team obj' />
                  </div>
                </div>
                <div className='team-card__content'>
                  <h3 className='name'>{singleTeam.name}</h3>
                  <span className='designation'>{singleTeam.title}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Team
