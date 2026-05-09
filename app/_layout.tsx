import {
    Stack,
    Redirect,
    usePathname,
} from 'expo-router';

import { AuthProvider, useAuth }
from '../contexts/AuthContext';

import FloatingAssistiveButton
from '../components/FloatingAssistiveButton';

function LayoutContent() {

    const { isLoggedIn } = useAuth();

    const pathname = usePathname();

    const isLoginScreen =
        pathname === '/Login';

    if (!isLoggedIn && !isLoginScreen) {

        return <Redirect href="/Login" />;
    }

    return (

        <>
            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            />

            {isLoggedIn && !isLoginScreen && (
                <FloatingAssistiveButton />
            )}

        </>

    );
}

export default function Layout() {

    return (

        <AuthProvider>
            <LayoutContent />
        </AuthProvider>

    );
}