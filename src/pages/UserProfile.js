import { useSelector } from "react-redux";

function UserProfile() {
    const isUserLoggedIn = useSelector(state =>state.auth.isAuthenticated);
    const currentUser = useSelector(state => state.auth.currentUser);
    return (
        <div>
            <p>UserProfile Page</p>
            <p>Welcome <strong>{(isUserLoggedIn && currentUser)  && currentUser.displayName}</strong></p>
        </div>
    )
}

export default UserProfile;