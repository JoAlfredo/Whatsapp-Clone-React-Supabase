
import { formatDate } from "../helpers/formatDate";
import { useEffect, useState } from "react";
import { supabase } from "../supabaseClient";

const Message = ({message, date, email}) => {
    const [user, setUser] = useState("")

    const getSeccion = async () => {
        const {data} = await supabase.auth.getSession();   
        setUser(data.session.user.email);
    }
    useEffect( () =>{
        getSeccion()
    }, [])
    
    //Form of individual message

    return (
        <div className={`card ${user===email?"me":""}`}>
            <p>{message}</p>
            {/* Call Format Date */}
            <span>{formatDate(date)}</span>
            <span className="user-email">{email.split('@')[0]}</span>
        </div>
    );
}
 
export default Message;