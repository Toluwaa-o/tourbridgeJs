'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';
import { useState } from "react";

interface ConfirmDeleteModalProps {
    open: boolean;
    onClose: () => void;
    tourId: Id<"tours">;
}

export function ConfirmDeleteModal({ open, onClose, tourId }: ConfirmDeleteModalProps) {
    const deleteTour = useMutation(api.tours.deleteTour);
    const deleteSteps = useMutation(api.steps.deleteStepsByTour);

    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);

            await deleteSteps({ tourId: tourId as Id<'tours'> });

            await deleteTour({ id: tourId });

            onClose();
        } catch (err) {
            console.error("Delete error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="bg-[#0B0F19] text-white border border-white/10 rounded-2xl shadow-xl p-6">

                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold text-[#22d3ee]">
                        Delete Tour?
                    </DialogTitle>
                    <p className="text-sm text-gray-400 mt-2">
                        This action will permanently remove the tour and all related steps.
                        You cannot undo this.
                    </p>
                </DialogHeader>

                <DialogFooter className="mt-6 flex gap-3">
                    <Button
                        onClick={onClose}
                        className="bg-white/10 text-gray-300 hover:bg-white/20 rounded-lg"
                        disabled={loading}
                    >
                        Cancel
                    </Button>

                    <Button
                        onClick={handleDelete}
                        disabled={loading}
                        className="bg-red-500 hover:bg-red-600 text-white rounded-lg"
                    >
                        {loading ? "Deleting..." : "Confirm Delete"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
