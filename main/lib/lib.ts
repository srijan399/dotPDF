import { DetailsFormData } from "@/app/page";
import { jsPDF } from "jspdf";

const download = async (data: DetailsFormData) => {
    try {
        // Create new PDF document
        const doc = new jsPDF();

        // Set font and title
        doc.setFontSize(20);
        doc.setFont("helvetica", "bold");
        doc.text("Personal Details", 105, 30, { align: "center" });

        doc.setLineWidth(0.5);
        doc.line(20, 35, 190, 35);

        doc.setFontSize(12);
        doc.setFont("helvetica", "normal");

        let yPosition = 55;
        const lineHeight = 15;

        const fields = [
            { label: "Name:", value: data.name || "Not provided" },
            { label: "Email:", value: data.email || "Not provided" },
            {
                label: "Phone Number:",
                value: data.phoneNumber || "Not provided",
            },
            { label: "Position:", value: data.position || "Not provided" },
            { label: "Description:", value: data.experience || "Not provided" },
        ];

        fields.forEach((field) => {
            doc.setFont("helvetica", "bold");
            doc.text(field.label, 20, yPosition);

            doc.setFont("helvetica", "normal");

            if (field.label === "Description:" && field.value.length > 50) {
                const splitText = doc.splitTextToSize(field.value, 140);
                doc.text(splitText, 65, yPosition);
                yPosition += splitText.length * 6;
            } else {
                doc.text(field.value, 65, yPosition);
            }

            yPosition += lineHeight;

            doc.setDrawColor(200, 200, 200);
            doc.line(20, yPosition - 5, 190, yPosition - 5);
        });

        const fileName = `${data.name || "details"}_details.pdf`;
        doc.save(fileName);
    } catch (error) {
        console.error("Error generating PDF:", error);
        alert("Failed to generate PDF. Please try again.");
    }
};

export default download;
