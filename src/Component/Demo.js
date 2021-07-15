import React,{useState,useEffect} from 'react'
import firebase from './Firebase'

 function Demo() {
    console.log(firebase);
    const Authenticatoin = firebase.auth();
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error,setError] = useState('');
    const [loading, setLoading] = useState('');
    const handleSubmit=async()=>{
          try{
              console.log(email+" "+password);
              setLoading(true);
              let res = await Authenticatoin.signInWithEmailAndPassword(email,password);
              console.log(res.user);
              setUser(res.user);
              setLoading(false);
          }
          catch{
              console.log(e.message);
              setError('Failed to sign in');
              setTimeout(()=>{
                  setError('')
              },2000)
              setLoading(false);
          }
          setEmail("");
          setPassword("");
    }

    return (
        <>
        {loading?<h1>Please Wait.....Loading</h1>:user ==  null?
        <div>
            <label> 
                Email:
                <input type = "text" value = {email} onChange = {()=>setEmail(e.target.value)}/>
            </label>
            <label> 
                Password:
                <input type = "text" value = {password} onChange = {()=>setPassword(e.target.value)}/>
            </label>
            <button onClick={handleSubmit}>Sign In</button>
            {error?<h1>{error}</h1>:<></>}
        </div>: 
        <>
        <h2>{user.uid} is Signed In</h2>
        <button onClick = {handleSignOut} >Sign Out</button>
        </>
        }        
        </>
       
    )
}
export default Demo
