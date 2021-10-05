import React,{useState} from 'react';
const Login = () => {
    const [email,setEmail]  = useState('');

    const [password,setPassword] = useState('');
    
    const LoginUser = async (e) => {
                    e.preventDefault();
                    const res = await fetch('/signin',{
                        method : "POST",
                        headers : {
                            "Content-Type" : "application/json"
                        },
                        body:JSON.stringify({
                            email, 
                            password
                        })
                    })
                    console.log(res);
                    const data = res.json
                    if (res.status===400 || !data) {
                        window.alert("Wrong Credentials");
                    }
                    else if(res.status===200 ){
                        window.alert("Login Successful");
                        callContactPage()
                    }
                    else{
                        window.alert("Connection Failed")
                    }
    }

    const callContactPage = async () => {
        try{
            const responce = await fetch('/contact',{
                method:"GET",
                headers:{
                    Accept:"application/json",
                    "Content-Type":"application/json"
                },
                credentials:"include"
            })
            console.log(responce);
            const data = await responce.json();
            console.log(data);
            // setUserData(data);
            if(!responce.status===200){
                const error = new Error(responce.error);
                throw error;
            }
        }catch(error){
            console.log(error);
            // history.push('/login');
        }
    }
    return (
        <>
	    <div className="container h-100">
        <div className="row h-100 justify-content-center align-items-center">
            <form className="col-md-9">
                <div className="AppForm shadow-lg">
                    <div className="row">
                        <div className="col-md-6 d-flex justify-content-center align-items-center">
                            <div className="AppFormLeft">

                                <h1>Login</h1>
                                <div className="form-group position-relative mb-4">
                                    <input type="email" className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" id="username"
                                        placeholder="email"  value={email} onChange={(e)=>setEmail(e.target.value)} />
                                        <i className="fa fa-user-o"></i>
                                </div>
                                <div className="form-group position-relative mb-4">
                                    <input type="password" className="form-control border-top-0 border-right-0 border-left-0 rounded-0 shadow-none" id="password"
                                        placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
                                        <i className="fa fa-key"></i>

                                </div>
                                <div className="row  mt-4 mb-4">
                                    <div className="col-md-6">
                                        <div className="form-check">
                                            <input className="form-check-input" type="checkbox" value="" id="defaultCheck1" />
                                            <label className="form-check-label" htmlFor="defaultCheck1">
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                    <div className="col-md-6 text-right">
                                        <a href="/">Forgot Password?</a>
                                    </div>
                                </div>

                                <button type="submit" onClick={LoginUser} className="btn btn-success btn-block shadow border-0 py-2 text-uppercase ">
                                    Login
                                </button>

                                <p className="text-center mt-5">
                                    Don't have an account?
                                    <span>
                                        Create your account
                                    </span>

                                </p>

                            </div>

                        </div>
                        <div className="col-md-6">
                            <div className="AppFormRight position-relative d-flex justify-content-center flex-column align-items-center text-center p-5 text-white">
                                <h2 className="position-relative px-4 pb-3 mb-4">Welcome</h2>
                                <p>Lorem ipsuing elit. Molomos totam est voluptatum i omos totam est voluptatum i ure sit consectetur ill</p>
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    </div>


        </>
    )

}

export default Login