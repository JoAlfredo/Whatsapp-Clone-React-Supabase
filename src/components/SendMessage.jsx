
import { supabase } from "../supabaseClient";
import { useEffect, useState } from 'react'
import Send from "./icons/Send";

const SendMessage = ({ scroll }) => {
    const [user, setUser] = useState("");
    const [newMessage, setNewMessage] = useState("");

    //Send message and update db
    const sendMessage = async (e) => {
        e.preventDefault();
        if (newMessage !== "") {
            const insert = await supabase.from('messages').insert({ 
                content: newMessage,
                email: user
            })
            //Clear message textbox
            setNewMessage("");

        }
        //Scroll configuration
        scroll.current.scrollIntoView({Behavior: 'smooth'})
    }
    const getSeccion = async () => {
        const {data} = await supabase.auth.getSession();
        setUser(data.session.user.email);
    }
    useEffect( () =>{
        getSeccion()
    }, [])

    return (
        <section className="send-mesage">
            <form onSubmit={sendMessage}>
                <input 
                    type="text" 
                    name="message" 
                    onChange={e=>setNewMessage(e.target.value)}
                    placeholder="Write your message"
                    value={newMessage}
                />
                <button type='submit'><Send/></button>
            </form> 
        </section>
    );
}
 
export default SendMessage;