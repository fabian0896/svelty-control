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