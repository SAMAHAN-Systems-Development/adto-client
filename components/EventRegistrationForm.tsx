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
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, UserCheck } from "lucide-react";

const CLUSTERS_AND_PROGRAMS: Record<string, string[]> = {
  "Accountancy": [
    "BS Accountancy",
    "BS Management Accounting",
  ],
  "Business & Management": [
    "BS Business Management",
    "BS Entrepreneurship",
    "BS Entrepreneurship Major in Agribusiness",
    "BS Finance",
    "BS Marketing",
    "Bachelor in Public Management",
    "BS Human Resource Development and Management",
  ],
  "Computer Studies Cluster": [
    "BS Computer Science",
    "BS Data Science",
    "BS Information Technology",
    "BS Information Systems",
  ],
  "Humanities & Letters Cluster": [
    "AB Communications",
    "AB English Language",
    "AB Interdisciplinary Studies",
    "Minor in Language and Literature",
    "Minor in Media and Business",
    "Minor in Media and Technology",
    "Minor in Media and Philosophy",
    "Minor in Philosophy and Theology",
    "AB Philosophy",
  ],
  "Natural Sciences & Mathematics": [
    "BS Biology",
    "Major in General Biology",
    "Major in Medical Biology",
    "BS Chemistry",
    "BS Environmental Science",
    "BS Mathematics",
  ],
  "School of Education": [
    "B Early Childhood Education",
    "B Elementary Education",
    "B Secondary Education",
    "Major in English",
    "Major in Mathematics",
    "Major in Science",
    "Major in Social Studies",
  ],
  "School of Engineering and Architecture": [
    "BS Aerospace Engineering",
    "BS Architecture",
    "BS Chemical Engineering",
    "BS Civil Engineering",
    "BS Computer Engineering",
    "BS Electrical Engineering",
    "BS Electronics Engineering",
    "BS Industrial Engineering",
    "BS Mechanical Engineering",
    "BS Robotics Engineering",
  ],
  "School of Nursing": [
    "BS Nursing",
  ],
  "Social Sciences": [
    "AB Anthropology - Academic Research",
    "AB Anthropology - Community Development/Social Enterprise (COMDEV)",
    "AB Anthropology - IP Education",
    "AB Anthropology - Medical Anthropology",
    "AB Development Studies",
    "AB Economics",
    "AB International Studies",
    "Major in American Studies",
    "Major in Asian Studies",
    "Major in Islamic Studies",
    "AB Political Science",
    "AB Psychology",
    "AB Sociology",
  ],
};

const formSchema = z.object({
  fullName: z.string().min(2, {
    message: "Full name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  cluster: z.string().min(1, {
    message: "Please select a cluster.",
  }),
  course: z.string().min(1, {
    message: "Please select a course.",
  }),
  yearLevel: z.string().min(1, {
    message: "Please select your year level.",
  }),
  dataPrivacyConsent: z.boolean().refine((val) => val === true, {
    message: "You must agree to the Data Privacy Policy to proceed.",
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
];

export function EventRegistrationForm({
  onSubmit,
  isSubmitting = false,
}: EventRegistrationFormProps) {
  const form = useForm<RegistrationFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      cluster: "",
      course: "",
      yearLevel: "",
      dataPrivacyConsent: false,
    },
  });

  const selectedCluster = form.watch("cluster");
  const availableCourses = selectedCluster ? CLUSTERS_AND_PROGRAMS[selectedCluster] : [];

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
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="juan.delacruz@example.com"
                      {...field}
                      disabled={isSubmitting}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter your email address
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="cluster"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cluster</FormLabel>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      form.setValue("course", "");
                    }}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your cluster" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.keys(CLUSTERS_AND_PROGRAMS).map((cluster) => (
                        <SelectItem key={cluster} value={cluster}>
                          {cluster}
                        </SelectItem>
                      ))}
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
              name="course"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Course/Program</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting || !selectedCluster}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={selectedCluster ? "Select your course" : "Select cluster first"} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {availableCourses.map((course) => (
                        <SelectItem key={course} value={course}>
                          {course}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select your course or program
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

            <div className="border-t pt-6 mt-6">
              <div className="space-y-3">
                <FormLabel className="text-sm font-semibold text-gray-900">
                  Data Privacy
                </FormLabel>
                <FormDescription className="text-sm text-gray-600">
                  By proceeding, I consent to the collection and use of my personal data under the Data Privacy Act of 2012, solely for ticketing, event management, and official event communication.
                </FormDescription>
                <FormField
                  control={form.control}
                  name="dataPrivacyConsent"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          disabled={isSubmitting}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-sm text-gray-700 font-normal cursor-pointer">
                          I have read and agree to the Data Privacy Policy.
                        </FormLabel>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full h-12 text-lg font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
