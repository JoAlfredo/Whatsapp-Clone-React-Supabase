
import { supabase } from "../supabaseClient";
import { useEffect, useRef, useState } from 'react'

import Message from "./Message";
import SendMessage from "./SendMessage";
import Header from "./Header";

const Messages = () => {
    const [messages, setMessages] = useState([]);
    const scroll = useRef();

    //Get All Messages / All Data
    const callSupabase = async () => {
        const { data } = await supabase.from('messages').select('*')
        setMessages(data);
    }
    useEffect( () => {
        callSupabase()
    }, [])
    
    useEffect(() => {
        //Update chat when you send a message
        const channel = supabase
            .channel("*")
            .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" },
            (payload) => {
                const newMessage = payload.new;
                setMessages(messages => [...messages, newMessage]);
            })
            .subscribe();
            
            return () => supabase.removeChannel(channel);
    }, [])

    return (
        <section className='messages'>
            <Header />
            {/* All items are reviewed */}
            <div className="content">
            {
                messages && 
                messages.map((item, index) => (
                    <Message key={index} 
                        message={item.content} 
                        date={item.created_at} 
                        email={item.email}/>
                ))
            }
            </div>
            <SendMessage scroll={scroll}/>
            <span ref={scroll}></span>
        </section>
    );
}
 
export default Messages;