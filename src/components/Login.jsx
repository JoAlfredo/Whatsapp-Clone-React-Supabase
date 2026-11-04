
import { supabase } from "../supabaseClient";

const Login = () => {
    //Supabase conection
    const handleLogin = async () => {
        const {error} = await supabase.auth.signInWithOAuth({
            provider: 'google'
        });
        if (error) {
            console.log('Error logging in', error);
        }
    }

    return (
        <section className="login">
            <button onClick={handleLogin}>Start </button>
        </section>
    );
}
 
export default Login;