import { Profile } from '../../components/Profile/Profile'
import { useGeneralContext } from '../../hooks/useGeneralContext'

export const ProfilePage = () => {
    const { logued } = useGeneralContext()
    return (
        <div>
            <Profile user={logued} />
        </div>
    )
}
