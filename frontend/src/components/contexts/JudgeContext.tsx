import React, { createContext, useContext, useState, ReactNode } from 'react';
import {Judge} from "../../types";

interface JudgeContextType {
    judges: Judge[];
    loading: boolean;
    setJudges: (judges: Judge[]) => void;
    setLoading: (loading: boolean) => void;
}

const JudgeContext = createContext<JudgeContextType>({
    judges: [],
    loading: false,
    setJudges: () => {},
    setLoading: () => {},
});

interface JudgeProviderProps {
    children: ReactNode;
}

export const JudgeProvider: React.FC<JudgeProviderProps> = ({ children }) => {
    const [judges, setJudges] = useState<Judge[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    return (
        <JudgeContext.Provider value={{ judges, setJudges, loading, setLoading }}>
            {children}
        </JudgeContext.Provider>
    );
};

export const useJudgeContext = () => useContext(JudgeContext);

export default JudgeContext;
