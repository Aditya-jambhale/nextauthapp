import { FC } from "react";

interface ProfilePageProps {
    params: {
        id: string;
    };
}

const ProfilePage: FC<ProfilePageProps> = ({ params }) => {
    const { id } = params;

    return <div>Profile ID: {id}</div>;
};

export default ProfilePage;
