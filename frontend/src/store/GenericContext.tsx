import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { EntityAPI } from '../apis/entity_apis';

interface GenericContextType {
    data: any[];
    loading: boolean;
    setData: (data: any[]) => void;
    setLoading: (loading: boolean) => void;
}

const GenericContext = createContext<GenericContextType>({
    data: [],
    loading: false,
    setData: () => {},
    setLoading: () => {},
});

interface GenericProviderProps {
    dataType: string;
    children: ReactNode;
}

export const GenericProvider: React.FC<GenericProviderProps> = ({ dataType, children }) => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        async function fetchData() {
            setLoading(true);

            const api = new EntityAPI(dataType);
            const Generics: Array<any> = await api.getAll();
            
            setData(Generics);
            setLoading(false);
        }
        fetchData();
    }, []);
    
    return (
        <GenericContext.Provider value={{ data, setData, loading, setLoading }}>
            {children}
        </GenericContext.Provider>
    );
};

export const useGenericContext = () => useContext(GenericContext);

export default GenericContext;
