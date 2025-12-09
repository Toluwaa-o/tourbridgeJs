import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Step } from "./step";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { StepData } from "@/types/dashboard/tour";


interface CreateTourModalProps {
    open: boolean;
    onClose: () => void;
    onSave: (data: { tour: { title: string; description: string }; steps: StepData[] }) => void;
}

export default function CreateTourModal({ open, onClose, onSave }: CreateTourModalProps) {
    const [tourTitle, setTourTitle] = useState("");
    const [tourDesc, setTourDesc] = useState("");

    const [steps, setSteps] = useState([
        { "title": "", "description": "", "selector": "", "button_text": "", "bg_color": "", "text_color": "", "highlight_color": "" },
        { "title": "", "description": "", "selector": "", "button_text": "", "bg_color": "", "text_color": "", "highlight_color": "" },
        { "title": "", "description": "", "selector": "", "button_text": "", "bg_color": "", "text_color": "", "highlight_color": "" },
        { "title": "", "description": "", "selector": "", "button_text": "", "bg_color": "", "text_color": "", "highlight_color": "" },
        { "title": "", "description": "", "selector": "", "button_text": "", "bg_color": "", "text_color": "", "highlight_color": "" },
    ]);

    const addStep = () => {
        setSteps([
            ...steps,
            { title: "", description: "", selector: "", button_text: "", bg_color: "", text_color: "", highlight_color: "" },
        ]);
    };

    const updateStep = <K extends keyof StepData>(index: number, field: K, value: StepData[K]) => {
        setSteps(prev => {
            const updated = [...prev];
            updated[index] = { ...updated[index], [field]: value };
            return updated;
        });
    };

    const handleSave = () => {
        const payload = {
            tour: {
                title: tourTitle,
                description: tourDesc,
            },
            steps,
        };
        onSave(payload);
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">Create New Tour</DialogTitle>
                </DialogHeader>

                {/* Tour Info */}
                <div className="space-y-4 mt-4">
                    <Input
                        placeholder="Tour Title"
                        value={tourTitle}
                        onChange={(e) => setTourTitle(e.target.value)}
                    />

                    <Textarea
                        placeholder="Tour Description"
                        value={tourDesc}
                        onChange={(e) => setTourDesc(e.target.value)}
                    />
                </div>

                {/* Steps Section */}
                <div className="mt-8 space-y-6">
                    <h2 className="text-xl font-medium">Steps</h2>

                    {steps.map((step, idx) => (
                        <Step
                            key={idx}
                            idx={idx}
                            step={step}
                            updateStep={updateStep}
                        />
                    ))}

                    {/* Add Step Button */}
                    <Button
                        onClick={addStep}
                        className="flex items-center gap-2 w-full justify-center bg-black text-white rounded-xl py-2"
                    >
                        <Plus size={16} /> Add Step
                    </Button>
                </div>

                {/* Actions */}
                <div className="flex justify-end mt-8 gap-3">
                    <Button variant="outline" onClick={onClose} className="rounded-xl">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} className="rounded-xl bg-black text-white">
                        Save Tour
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
