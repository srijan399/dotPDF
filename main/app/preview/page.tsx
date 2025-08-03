"use client";
import React, { useState } from "react";
import { ArrowLeft, Download, Router } from "lucide-react";
import { usePreview } from "../context/previewContext";
import { useRouter } from "next/navigation";
import download from "@/lib/lib";
import { DetailsFormData } from "../page";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const PreviewPage = () => {
    const { preview } = usePreview();

    const handleDownloadPDF = async (data: DetailsFormData) => {
        console.log("Downloading PDF:", data);
        download(data);
    };

    const router = useRouter();

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            {/* PDF Preview Container */}
            <div className="flex flex-col items-center gap-6">
                <Button
                    onClick={() => router.push("/")}
                    className="flex items-center justify-between space-x-1 text-gray-600 hover:text-gray-800 bg-transparent border-none cursor-pointer p-2 rounded-md hover:bg-gray-200 transition-colors border-gray-300 shadow-sm border-4"
                >
                    <Image
                        src="/chevron-left.svg"
                        alt="Left Arrow"
                        className="h-5 w-5 text-gray-500 mt-1/2"
                        height={200}
                        width={200}
                    />
                    <span className="text-sm font-medium">Back</span>
                </Button>

                <div className="max-w-lg mx-auto">
                    {/* PDF-style document */}
                    <div className="bg-white border-2 border-gray-300 rounded-lg shadow-lg p-8 mb-6">
                        <div className="space-y-6">
                            {/* Name Field */}
                            <div className="flex flex-col sm:flex-row">
                                <div className="w-full sm:w-32 font-bold text-gray-900 mb-1 sm:mb-0">
                                    Name:
                                </div>
                                <div className="flex-1 text-gray-600">
                                    {preview?.name || "Not provided"}
                                </div>
                            </div>

                            {/* Email Field */}
                            <div className="flex flex-col sm:flex-row">
                                <div className="w-full sm:w-32 font-bold text-gray-900 mb-1 sm:mb-0">
                                    Email:
                                </div>
                                <div className="flex-1 text-gray-600">
                                    {preview?.email || "Not provided"}
                                </div>
                            </div>

                            {/* Phone Number Field */}
                            <div className="flex flex-col sm:flex-row">
                                <div className="w-full sm:w-32 font-bold text-gray-900 mb-1 sm:mb-0">
                                    Phone Number:
                                </div>
                                <div className="flex-1 text-gray-600">
                                    {preview?.phoneNumber || "Not provided"}
                                </div>
                            </div>

                            {/* Position Field */}
                            <div className="flex flex-col sm:flex-row">
                                <div className="w-full sm:w-32 font-bold text-gray-900 mb-1 sm:mb-0">
                                    Position:
                                </div>
                                <div className="flex-1 text-gray-600">
                                    {preview?.position || "Not provided"}
                                </div>
                            </div>

                            {/* Description Field */}
                            <div className="flex flex-col sm:flex-row">
                                <div className="w-full sm:w-32 font-bold text-gray-900 mb-1 sm:mb-0 flex-shrink-0">
                                    Description:
                                </div>
                                <div className="flex-1 text-gray-600 leading-relaxed">
                                    {preview?.experience || "Not provided"}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Download Button */}
                    <div className="text-center w-full">
                        <button
                            onClick={() => {
                                if (!preview) {
                                    alert(
                                        "No preview data available to download."
                                    );
                                    return;
                                }
                                handleDownloadPDF(preview);
                            }}
                            className="bg-green-800 hover:bg-green-700 text-white px-8 py-3 rounded-lg  space-x-2 mx-auto transition-colors duration-200 font-medium shadow-md hover:shadow-lg w-full flex justify-center items-center"
                        >
                            <Download size={20} />
                            <span>Download PDF</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewPage;
