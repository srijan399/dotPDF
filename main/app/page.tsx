"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";

interface FormData {
    name: string;
    email: string;
    phoneNumber?: string;
    position: string;
    experience?: string;
}

const formSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.email("Invalid email address").min(1, "Email is required"),
    phoneNumber: z
        .string()
        .min(10, "Phone number must be at least 10 characters")
        .optional(),
    position: z.string().min(1, "Position is required"),
    experience: z.string().optional(),
});

export default function Home() {
    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    <Button>open</Button>
                </DialogTrigger>
                <DialogContent className="text-sm text-gray-500 m-auto h-fit border-6 p-7 border-gray-300 rounded-lg shadow-lg">
                    <DialogTitle className="text-lg font-semibold">
                        Job Application Form
                    </DialogTitle>
                    <RegisterForm />
                </DialogContent>
            </Dialog>
        </div>
    );
}

const RegisterForm = () => {
    const submitForm = async (data: FormData) => {
        console.log("Form submitted:", data);
    };

    const {
        reset,
        register,
        handleSubmit,
        setError,
        setFocus,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            phoneNumber: "",
            position: "",
            experience: "",
        },
    });

    return (
        <form className="flex flex-col items-center justify-center gap-2">
            <div>
                <h1 className="text-2xl font-bold text-center">
                    Job Application Form
                </h1>
                Please fill out the form below to apply for the job.
                <div className="flex flex-col gap-2 mt-4">
                    <div className="flex flex-col gap-1">
                        <Input
                            type="text"
                            placeholder="Name"
                            {...register("name")}
                            className={`input ${
                                errors.name ? "border-red-500" : ""
                            }`}
                        />
                        {errors.name && (
                            <span className="text-red-500 text-sm">
                                {errors.name.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <Input
                            type="email"
                            placeholder="Email"
                            {...register("email")}
                            className={`input ${
                                errors.email ? "border-red-500" : ""
                            }`}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">
                                {errors.email.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <Input
                            type="text"
                            placeholder="Phone Number (optional)"
                            {...register("phoneNumber")}
                            className={`input ${
                                errors.phoneNumber ? "border-red-500" : ""
                            }`}
                        />
                        {errors.phoneNumber && (
                            <span className="text-red-500 text-sm">
                                {errors.phoneNumber.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <Input
                            type="text"
                            placeholder="Position"
                            {...register("position")}
                            className={`input ${
                                errors.position ? "border-red-500" : ""
                            }`}
                        />
                        {errors.position && (
                            <span className="text-red-500 text-sm">
                                {errors.position.message}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-1">
                        <Textarea
                            placeholder="Experience (optional)"
                            {...register("experience")}
                            className={`input h-24 ${
                                errors.experience ? "border-red-500" : ""
                            }`}
                        />
                        {errors.experience && (
                            <span className="text-red-500 text-sm">
                                {errors.experience.message}
                            </span>
                        )}
                    </div>

                    <Button
                        type="submit"
                        className="btn"
                        onClick={handleSubmit(submitForm, (errors) => {
                            console.log("Form validation errors:", errors);
                            const firstErrorField = Object.keys(
                                errors
                            )[0] as keyof FormData;
                            if (firstErrorField) {
                                setFocus(firstErrorField);
                            }
                        })}
                    >
                        Submit
                    </Button>
                </div>
            </div>
        </form>
    );
};
