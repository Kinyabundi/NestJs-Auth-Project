import { useSession, signIn } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const CheckAuth = () => {
 const {data: session} = useSession();
 const router = useRouter();

 useEffect(() => {
        if(session){
            router.push('/add-task');
        } else {
            signIn();
        }
    }, [session, router]);
};

export default CheckAuth;