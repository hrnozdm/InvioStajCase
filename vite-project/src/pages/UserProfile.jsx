import { useEffect } from "react";
import Header from "../components/header/Header";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../redux/UserSlice";

const UserProfile = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.user.userData);

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('user'));
        dispatch(getUserData(userData.jwt));
    }, []);

    return (
        <div>
            <Header />
            <div className="container mx-auto p-4">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg">
                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">User Profile</div>
                        <div>
                            <p className="text-gray-700">Username: {userData?.user_metadata?.username}</p>
                            <p className="text-gray-700">Country: {userData?.user_metadata?.country}</p>
                            <p className="text-gray-700">Phone: {userData?.user_metadata?.phone}</p>
                            <p className="text-gray-700">Email: {userData?.user_metadata?.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;
