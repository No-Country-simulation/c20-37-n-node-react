import { useEffect } from 'react'
import { UserList } from '../../Users/UserList'
import { useGeneralContext } from '../../../hooks/useGeneralContext'

export const Users = () => {
  const { users } = useGeneralContext()
  useEffect(() => {

  }, [])
  return (
    <div className='container mx-auto px-4 bg-gray-100 dark:bg-gray-800'>
      <UserList filterUsed={'user'} users={users} />
    </div>
  )
}
