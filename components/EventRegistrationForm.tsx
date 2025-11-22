"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, UserCheck } from "lucide-react";
import { useGetOrganizationParents } from "@/client/queries/organizationQueries";

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  schoolEmail: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .refine((email) => email.endsWith("@addu.edu.ph"), {
      message: "Please use your official @addu.edu.ph email address.",
    }),
  clusterId: z.string().min(1, {
    message: "Please select a cluster.",
  }),
  yearLevel: z.string().min(1, {
    message: "Please select your year level.",
  }),
});

export type RegistrationFormData = z.infer<typeof formSchema>;

interface EventRegistrationFormProps {
  onSubmit: (data: RegistrationFormData) => Promise<void>;
  isSubmitting?: boolean;
}

const yearLevels = [
  { value: "1", label: "1st Year" },
  { value: "2", label: "2nd Year" },
  { value: "3", label: "3rd Year" },
  { value: "4", label: "4th Year" },
  { value: "5", label: "5th Year" },
  { value: "graduate", label: "Graduate" },
];

export function EventRegistrationForm({
  onSubmit,
  isSubmitting = false,
}: EventRegistrationFormProps) {
  const { data: clusters, isLoading: isClustersLoading } = useGetOrganizationParents();

  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      schoolEmail: "",
      clusterId: "",
      yearLevel: "",
    },
  });

  const handleSubmit = async (data: RegistrationFormData) => {
    await onSubmit(data);
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <UserCheck className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Event Registration
            </CardTitle>
            <CardDescription className="text-gray-600">
              Please fill in your details to register for this event
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Juan Dela Cruz"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter your complete name as it appears on your student ID
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="schoolEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>School Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="juan.delacruz@addu.edu.ph"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    Use your official @addu.edu.ph email address
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="clusterId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cluster</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting || isClustersLoading}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your cluster" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {isClustersLoading ? (
                        <SelectItem value="loading" disabled>
                          Loading clusters...
                        </SelectItem>
                      ) : (
                        clusters?.map((cluster: { id: string; name: string }) => (
                          <SelectItem key={cluster.id} value={cluster.id}>
                            {cluster.name}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select the cluster you belong to
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="yearLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Year Level</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your year level" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {yearLevels.map((level) => (
                        <SelectItem key={level.value} value={level.value}>
                          {level.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select your current year level
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Proceed to Checkout"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
