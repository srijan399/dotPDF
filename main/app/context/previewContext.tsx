"use client";
import { useContext, createContext, useState } from "react";

interface Preview {
    name: string;
    email: string;
    phoneNumber: string;
    position?: string;
    experience?: string;
}

interface PreviewContextType {
    preview: Preview | undefined;
    setPreview: React.Dispatch<React.SetStateAction<Preview | undefined>>;
}

const PreviewContext = createContext<PreviewContextType | undefined>(undefined);

export const usePreview = () => {
    const context = useContext(PreviewContext);
    if (!context) {
        throw new Error("usePreview must be used within a PreviewProvider");
    }
    return context;
};

export function PreviewProvider({ children }: { children: React.ReactNode }) {
    const [preview, setPreview] = useState<Preview | undefined>(undefined);

    const value: PreviewContextType = {
        preview,
        setPreview,
    };

    return (
        <PreviewContext.Provider value={value}>
            {children}
        </PreviewContext.Provider>
    );
}
