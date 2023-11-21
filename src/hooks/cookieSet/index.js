import cookie from "js-cookie"

const cookieSet = (name,value) => {
    cookie.set(name, value);
}

export default cookieSet