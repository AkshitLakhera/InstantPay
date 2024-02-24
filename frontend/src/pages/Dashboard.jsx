import { Appbar } from "../components/Appbar"
import { Balance } from "../components/Balance"
import { Users } from "../components/Users"
// Search functionality still not working properly
export const Dashboard = () => {
    return <div>
        <Appbar />
        <div className="m-8">
            <Balance  />
            <Users />
        </div>
    </div>
}