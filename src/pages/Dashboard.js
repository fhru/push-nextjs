import React, { useEffect, useState } from 'react';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardContent from '../components/DashboardContent';
import { useRouter } from 'next/router';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('data');
    const router = useRouter()

    useEffect(() => {
        const isAdmin = localStorage.getItem('userRole') === 'admin';
        if (!isAdmin) {
            router.push('/');
        }
    }, [router]);

    return (
        <div className="flex h-screen">
            <DashboardSidebar setActiveTab={setActiveTab} />
            <div className="flex-1 p-4">
                <DashboardContent activeTab={activeTab} />
            </div>
        </div>
    );
};

export default Dashboard;
