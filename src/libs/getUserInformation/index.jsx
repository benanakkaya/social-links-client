

const getUserInformation = async (username) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user/get-user/${username}`);
    const data = await res.json();
    return data.user;
}

export default getUserInformation;