import * as firebase from 'firebase/app'
import 'firebase/auth'



export async function signInFacebook(){

    const provider = new firebase.auth.FacebookAuthProvider()

    try{
        const result = await firebase.auth().signInWithPopup(provider)
        console.log(result.user)
        return result.user
    }catch(err){
        throw err
    }

}


export  function isAuth(cb){
    firebase.auth().onAuthStateChanged(user => {
      if(user){
        console.log(user)
        cb(user)
      }else{
        console.log("sin Usuario")
        cb(null)
      }
    })
}


export async function logOut(){
    await firebase.auth().signOut()
    return
}