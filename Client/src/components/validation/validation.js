export default function validation({email, password}) {
    let emailerror = false
    let passworderror = false
    if(!/\S+@\S+\.\S+/.test(email) || !email || email.length > 35){
            emailerror= true
    }
    else emailerror = false;

    if(password.length < 5 || password.length > 10 || !/.*[0-9].*/.test(password)){
        passworderror = true
    }
    else passworderror = false;
    return {email: emailerror, password: passworderror}
}
