import { UserList } from "../../Users/UserList"

export const Doctors = () => {
  return (
    <div className="container mx-auto px-4 bg-gray-100 dark:bg-gray-800">
      <UserList filterUsed={'doctor'} />
    </div>
  )
}
