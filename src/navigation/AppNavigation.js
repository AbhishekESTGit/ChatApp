import React, { useEffect, useState } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { supabase } from '../supabase/supabaseClient';
import AuthNavigation from './AuthNavigation';
import HomeNavigation from './HomeNavigation';

const AppNavigation = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const session = supabase.auth.getSession();
        if (session) {
            setIsAuthenticated(true);
        }

        const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
            setIsAuthenticated(session);
        });

        return () => {
            listener?.unsubscribe();
        };
    }, []);

    return (
        <NavigationContainer>
            {isAuthenticated ? <HomeNavigation /> : <AuthNavigation />}
        </NavigationContainer>
    );
};

export default AppNavigation;