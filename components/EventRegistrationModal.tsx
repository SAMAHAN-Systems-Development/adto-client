"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { EventRegistrationForm, RegistrationFormData } from "./EventRegistrationForm";
import { useCreateRegistration } from "@/client/mutations/registrationMutation";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

interface EventRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventId: string;
  eventName: string;
  ticketCategoryId: string;
  ticketCategoryName?: string;
}

export function EventRegistrationModal({
  isOpen,
  onClose,
  eventId,
  eventName,
  ticketCategoryId,
  ticketCategoryName,
}: EventRegistrationModalProps) {
  const { toast } = useToast();
  const router = useRouter();
  const createRegistrationMutation = useCreateRegistration();

  const handleSubmit = async (formData: RegistrationFormData) => {
    try {
      await createRegistrationMutation.mutateAsync({
        fullName: formData.fullName,
        schoolEmail: formData.schoolEmail,
        clusterId: formData.clusterId,
        yearLevel: formData.yearLevel,
        eventId,
        ticketCategoryId,
      });

      toast({
        title: "Registration Successful!",
        description: "Your registration has been submitted. Check your email for confirmation.",
        variant: "default",
      });

      onClose();

      // Redirect to a success page or back to events list
      router.push("/events");
    } catch (error) {
      toast({
        title: "Registration Failed",
        description:
          error instanceof Error
            ? error.message
            : "An error occurred while submitting your registration. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{eventName}</DialogTitle>
          <DialogDescription>
            {ticketCategoryName && `Ticket: ${ticketCategoryName}`}
          </DialogDescription>
        </DialogHeader>
        <EventRegistrationForm
          onSubmit={handleSubmit}
          isSubmitting={createRegistrationMutation.isPending}
        />
      </DialogContent>
    </Dialog>
  );
}
