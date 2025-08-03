"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import {
    Briefcase,
    Computer,
    Download,
    EyeIcon,
    File,
    Mail,
    Phone,
    User2,
} from "lucide-react";
import { usePreview } from "./context/previewContext";
import { routerServerGlobal } from "next/dist/server/lib/router-utils/router-server-context";
import { useRouter } from "next/navigation";
import download from "@/lib/lib";

export interface DetailsFormData {
    name: string;
    email: string;
    phoneNumber: string;
    position?: string;
    experience?: string;
}

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address").min(1, "Email is required"),
    phoneNumber: z
        .string()
        .min(10, "Phone number must be at least 10 characters"),
    position: z.string().min(1, "Position is required").optional(),
    experience: z.string().optional(),
});

export default function Home() {
    const { preview, setPreview } = usePreview();
    const router = useRouter();
    const {
        register,
        handleSubmit,
        setFocus,
        formState: { errors },
        reset,
    } = useForm<DetailsFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: preview?.name || "",
            email: preview?.email || "",
            phoneNumber: preview?.phoneNumber || "",
            position: preview?.position || "",
            experience: preview?.experience || "",
        },
    });

    useEffect(() => {
        if (preview) {
            reset({
                name: preview.name || "",
                email: preview.email || "",
                phoneNumber: preview.phoneNumber || "",
                position: preview.position || "",
                experience: preview.experience || "",
            });
        }
    }, [preview, reset]);

    const submitForm = async (data: DetailsFormData) => {
        console.log("Form submitted:", data);
        download(data);
    };

    return (
        <div className="flex flex-col items-center justify-center min-w-[90vw] min-h-screen">
            <header className="mb-6">
                <h1 className="text-3xl font-bold text-center mb-2">dotPDF</h1>
                <p className="text-lg text-gray-600 text-center">
                    Create your personal PDF document with ease.
                </p>
            </header>
            <form className="flex flex-col items-center justify-center gap-2 rounded-md">
                <div className="text-sm text-gray-500 m-auto h-fit border-6 p-7 border-gray-300 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-center mb-1">
                        Add Your Details
                    </h1>
                    <h5 className="text-lg text-center mb-4">
                        Please fill out the form below to apply for the job.
                    </h5>
                    <div className="flex flex-col gap-2 mt-4">
                        <div className="flex flex-col gap-1">
                            <div className="flex justify-center items-center gap-2">
                                <User2 className="h-5 w-5 text-gray-500" />
                                <div className="flex-1 flex flex-col">
                                    <Input
                                        type="text"
                                        placeholder="Name"
                                        {...register("name")}
                                        className={`input ${
                                            errors.name ? "border-red-500" : ""
                                        }`}
                                    />
                                    {errors.name && (
                                        <span className="text-red-500 text-sm mt-1">
                                            {errors.name.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex justify-center items-center gap-2">
                                <Mail className="h-5 w-5 text-gray-500" />
                                <div className="flex-1 flex flex-col">
                                    <Input
                                        type="email"
                                        placeholder="Email"
                                        {...register("email")}
                                        className={`input ${
                                            errors.email ? "border-red-500" : ""
                                        }`}
                                    />
                                    {errors.email && (
                                        <span className="text-red-500 text-sm mt-1">
                                            {errors.email.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex justify-center items-center gap-2">
                                <Phone className="h-5 w-5 text-gray-500" />
                                <div className="flex-1 flex flex-col">
                                    <Input
                                        type="text"
                                        placeholder="Phone Number"
                                        {...register("phoneNumber")}
                                        className={`input ${
                                            errors.phoneNumber
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                    />
                                    {errors.phoneNumber && (
                                        <span className="text-red-500 text-sm mt-1">
                                            {errors.phoneNumber.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex justify-center items-center gap-2">
                                <Briefcase className="h-5 w-5 text-gray-500" />
                                <div className="flex-1 flex flex-col">
                                    <Input
                                        type="text"
                                        placeholder="Position"
                                        {...register("position")}
                                        className={`input ${
                                            errors.position
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                    />
                                    {errors.position && (
                                        <span className="text-red-500 text-sm mt-1">
                                            {errors.position.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <div className="flex justify-center items-start gap-2">
                                <File className="h-5 w-5 mt-1 text-gray-500" />
                                <div className="flex-1 flex flex-col">
                                    <Textarea
                                        placeholder="Experience (optional)"
                                        {...register("experience")}
                                        className={`input h-24 ${
                                            errors.experience
                                                ? "border-red-500"
                                                : ""
                                        }`}
                                    />
                                    {errors.experience && (
                                        <span className="text-red-500 text-sm mt-1">
                                            {errors.experience.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                            {/* Left - Preview */}
                            <div className="w-1/2 flex justify-center">
                                <Button
                                    type="button"
                                    className="w-full bg-green-800 hover:bg-green-700 text-white font-semibold py-2 rounded-md flex justify-center items-center"
                                    onClick={handleSubmit((data) => {
                                        setPreview(data);
                                        router.push("/preview");
                                    })}
                                >
                                    <EyeIcon className="mr-2 h-5 w-5" />
                                    View Preview
                                </Button>
                            </div>

                            {/* Right - Download */}
                            <div className="w-1/2 flex justify-center">
                                <Button
                                    type="submit"
                                    className="w-full bg-green-800 hover:bg-green-700 text-white font-semibold py-2 rounded-md flex justify-center items-center"
                                    onClick={handleSubmit(
                                        submitForm,
                                        (errors) => {
                                            console.log(
                                                "Form validation errors:",
                                                errors
                                            );
                                            const firstErrorField = Object.keys(
                                                errors
                                            )[0] as keyof DetailsFormData;
                                            if (firstErrorField) {
                                                setFocus(firstErrorField);
                                            }
                                        }
                                    )}
                                >
                                    <Download className="mr-2 h-5 w-5" />
                                    Download PDF
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
