import { IsEditMode, ProgressData } from '@/views/UserInfoView'
import { useRouter } from 'next/navigation'
import { BsChevronRight } from 'react-icons/bs'
import { FaArrowRight, FaCheck } from 'react-icons/fa'

const CompleteProfile = ({
  progressData,
  setIsEditMode,
}: {
  progressData: ProgressData[]
  setIsEditMode: Function
}) => {
  const router = useRouter()

  const handleClick = (progress: ProgressData) => {
    const name = progress.editModeName

    setIsEditMode((prev: IsEditMode) => ({
      ...prev,
      [name]: true,
    }))
    router.push('/user-info')
  }

  const totalSteps = progressData?.length

  const completedSteps = progressData.filter(
    (progress: ProgressData) => progress.completed,
  ).length

  return (
    <div className='complete-profile-container'>
      <div className='complete-profile-screen'>
        <div className='complete-profile-app-body'>
          <div className='complete-profile-summary-wrapper'>
            <div className='complete-profile-summary'>
              <div className='complete-profile-summary-body'>
                <div className='complete-profile-summary-title'>
                  Complete your profile ({completedSteps}/{totalSteps})
                </div>
                <div className='complete-profile-summary-progress'>
                  <progress
                    className='complete-profile-summary-progress'
                    max={totalSteps}
                    value={completedSteps / totalSteps}></progress>
                </div>
              </div>
            </div>
          </div>
          <div className='complete-profile-progress-container'>
            {progressData.map(progress => {
              return (
                <div
                  key={progress?.id}
                  className={`complete-profile-progress ${progress?.completed ? 'completed' : ''}`}>
                  <div className='complete-profile-progress-left'>
                    <div className='complete-profile-progress-icon'>
                      <FaCheck className='material-icons' />
                    </div>
                  </div>
                  <div className='complete-profile-progress-right'>
                    <div className='complete-profile-progress-title'>
                      {progress?.title}
                    </div>
                    <div
                      className={`complete-profile-progress-status ${progress?.completed ? 'completed' : ''}`}>
                      {progress?.completed ? 'Completed' : 'Incomplete'}
                    </div>
                  </div>
                  {!progress?.completed && (
                    <div
                      className='complete-profile-progress-right-icon'
                      onClick={() => handleClick(progress)}>
                      <div className='complete-profile-progress-arrow-icon'>
                        <FaArrowRight className='material-icons' />
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
        <div className='complete-profile-app-footer'>
          <button
            className='complete-profile-complete-button'
            onClick={() => router.push('/user-info')}>
            Complete Your Profile
            <BsChevronRight className='material-icons' />
          </button>
        </div>
      </div>
    </div>
  )
}

export default CompleteProfile
