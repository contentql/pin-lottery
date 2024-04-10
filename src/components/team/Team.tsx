import Image from 'next/image'

import team_obj from '/public/images/elements/team-obj.png'

import { Media } from '@/payload-types'
import { trpc } from '@/trpc/client'

const Team = () => {
  const { data: teamMembers } = trpc.public.getTeam.useQuery()
  return (
    <section className='pb-120'>
      <div className='container'>
        <div className='row justify-content-center'>
          <div className='col-lg-9'>
            <div className='section-header text-center'>
              <span className='section-sub-title'> Meet Our most Valued</span>
              <h2 className='section-title style--two'>{teamMembers?.title}</h2>
              <p>{teamMembers?.description}</p>
            </div>
          </div>
        </div>
        <div className='row mb-none-30 justify-content-center'>
          {/* single team section */}
          {teamMembers?.team?.map(singleTeam => (
            <div key={singleTeam.id} className='col-lg-4 col-sm-6 mb-30'>
              <div className='team-card'>
                <div className='team-card__thumb'>
                  <Image
                    className='team-image'
                    src={
                      (singleTeam.user_image as Media)?.sizes?.userProfile
                        ?.url || ''
                    }
                    width={
                      (singleTeam.user_image as Media)?.sizes?.userProfile
                        ?.width || 100
                    }
                    height={
                      (singleTeam.user_image as Media)?.sizes?.userProfile
                        ?.height || 20
                    }
                    alt={singleTeam.name}
                  />
                  <div className='obj'>
                    <Image src={team_obj} alt='team obj' />
                  </div>
                </div>
                <div className='team-card__content'>
                  <h3 className='name'>{singleTeam.name}</h3>
                  <span className='designation'>{singleTeam.designation}</span>
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
