
import CryptoJS from "crypto-js"

export const getNewRoom=(id,password)=>{
    return {
        id,
        password,
        messages:[],
    }
}

const getJsonifiedImage = (file)=>{

    return new Promise((resolve,reject)=>{
        const reader  = new FileReader()
        reader.onload=(e)=>{
            const base64string = e.target.result
            const dataObject = {filename:file.filename,mimetype:file.mimetype,data:base64string}
            resolve(JSON.stringify(dataObject))
        
        }
        reader.onerror = (e)=>{
            reject(e)
        }
        reader.readAsDataURL(file.file)
    })

    
}


export const getNewMessage = async(username,message,color,file,current)=>{
    let content

    if(current === "public"){
        
            content = message
     
        
    }else{

       
            content = CryptoJS.AES.encrypt(message,process.env.NEXT_PUBLIC_PIKACHU).toString()
      

    }
   
    return {
        username,
        content,
        color,
        datetime:new Date().toLocaleString("en-US",{
            month:"short",
            day:"numeric",
            hour:"numeric",
            minute:"numeric",
            hour12:true
          }),
        file: file || undefined
    }
}

