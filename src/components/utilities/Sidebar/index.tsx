import { authUserSessionServer } from '@/utils/auth-utils'
import Navlinks from './Navlinks'

const Sidebar = async () => {
    const user = await authUserSessionServer()

    if (!user) return null

    return <Navlinks />
}

export default Sidebar
