import axios from "axios";
export async function createNewUser(user, fullDetails){
    await axios.post(`http://localhost:5000/api/v1/user/create-user`, {
        user,fullDetails
    });
}